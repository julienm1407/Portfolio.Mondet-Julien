import type { APIRoute } from "astro";
import fs from "fs";
import path from "path";
import { getCategoryBasePath } from "@/lib/projects";

export const prerender = false;

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".csv": "text/csv",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export const GET: APIRoute = ({ params }) => {
  const raw = params.segments;
  const segments = typeof raw === "string" ? raw.split("/").filter(Boolean) : [];
  if (segments.length < 3) {
    return new Response("Bad Request", { status: 400 });
  }
  if (segments.some((s) => !s || s === "." || s === "..")) {
    return new Response("Bad Request", { status: 400 });
  }

  const categoryId = segments[0];
  const projectSlug = segments[1];
  const fileRel = segments.slice(2).join("/");

  const base = getCategoryBasePath(categoryId);
  if (!base) {
    return new Response("Not Found", { status: 404 });
  }

  const projectRoot = path.resolve(path.join(base, projectSlug));
  const baseResolved = path.resolve(base);
  if (!projectRoot.startsWith(baseResolved + path.sep) && projectRoot !== baseResolved) {
    return new Response("Forbidden", { status: 403 });
  }

  const abs = path.resolve(path.join(projectRoot, fileRel));
  if (!abs.startsWith(projectRoot + path.sep) && abs !== projectRoot) {
    return new Response("Forbidden", { status: 403 });
  }

  let stat: fs.Stats;
  try {
    stat = fs.statSync(abs);
  } catch {
    return new Response("Not Found", { status: 404 });
  }
  if (!stat.isFile()) {
    return new Response("Not Found", { status: 404 });
  }

  const ext = path.extname(abs).toLowerCase();
  const contentType = MIME[ext] ?? "application/octet-stream";
  const body = fs.readFileSync(abs);

  return new Response(body, {
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=86400",
    },
  });
};
