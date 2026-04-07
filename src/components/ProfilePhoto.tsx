"use client";

import { useState } from "react";
import { site } from "@/content/site";

export function ProfilePhoto() {
  const [failed, setFailed] = useState(false);
  const src = site.profilePhoto?.trim();

  if (!src || failed) {
    return (
      <div
        className="flex aspect-[3/4] w-full max-w-[220px] flex-col items-center justify-center gap-2 rounded-card border-2 border-dashed border-line bg-muted/60 px-3 py-6 text-center sm:max-w-[240px]"
        aria-hidden={!!src}
      >
        <p className="text-[10px] font-semibold uppercase tracking-wide text-ink/45">Photo</p>
        <p className="text-pretty text-[10px] leading-snug text-ink/50">
          Placez le fichier dans <code className="rounded bg-surface px-1 py-0.5 text-ink/70">src/assets/profile.jpg</code> (import dans{" "}
          <code className="rounded bg-surface px-1 py-0.5 text-ink/70">site.ts</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-card border-2 border-line bg-muted shadow-card sm:max-w-[240px]">
      <img
        src={src}
        alt={`Portrait — ${site.name}`}
        className="absolute inset-0 h-full w-full origin-[50%_18%] scale-[1.2] -translate-y-[10%] object-cover object-top"
        width={480}
        height={640}
        fetchPriority="high"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
