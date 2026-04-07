import { site } from "@/content/site";
import { getHomeHref } from "@/lib/homeHref";
import { phoneDisplayToTelHref } from "@/lib/phoneTelHref";

type SiteFooterProps = {
  /** Sur la page dédiée, évite un lien qui recharge la même URL. */
  omitContactPageLink?: boolean;
  /** Accueil (défaut : base Vite/Astro, ex. `/` ou `/sous-dossier/`). */
  homeHref?: string;
};

export function SiteFooter({
  omitContactPageLink = false,
  homeHref: homeHrefProp,
}: SiteFooterProps) {
  const homeHref = getHomeHref(homeHrefProp);
  const contactPath = `${homeHref.replace(/\/?$/, "/")}contact`.replace(/([^:]\/)\/+/g, "$1");
  const phoneDisplay = site.contact.phone?.trim() ?? "";
  const phoneTelHref = phoneDisplayToTelHref(phoneDisplay);
  return (
    <footer className="border-t border-line bg-footer text-white" id="site-footer">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 text-start sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/60">Contact</p>
          <p className="mt-2 text-balance text-lg font-extrabold uppercase tracking-wide">{site.name}</p>
          <p className="mt-1 max-w-prose text-pretty text-sm font-medium leading-relaxed text-white/80">{site.title}</p>
        </div>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-end">
          {phoneTelHref ? (
            <a
              href={phoneTelHref}
              className="text-sm font-semibold text-white/95 underline-offset-4 hover:text-accent hover:underline"
            >
              {phoneDisplay}
            </a>
          ) : null}
          {site.contact.email?.trim() ? (
            <a
              href={
                site.contact.mailSubject?.trim()
                  ? `mailto:${site.contact.email.trim()}?subject=${encodeURIComponent(site.contact.mailSubject.trim())}`
                  : `mailto:${site.contact.email.trim()}`
              }
              className="break-all text-sm font-semibold text-accent underline-offset-4 hover:underline sm:break-normal"
            >
              {site.contact.email.trim()}
            </a>
          ) : null}
          {site.contact.linkedin?.trim() ? (
            <a
              href={site.contact.linkedin.trim()}
              className="break-words text-sm font-bold uppercase tracking-wide text-white/90 hover:text-accent"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          ) : null}
          {!omitContactPageLink ? (
            <a
              href={contactPath}
              className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-wide text-white/90 hover:text-accent touch-manipulation"
            >
              Page contact & avis
            </a>
          ) : null}
          <a
            href={homeHref}
            className="inline-flex min-h-[44px] items-center text-sm font-bold uppercase tracking-wide text-white/90 underline decoration-white/40 underline-offset-4 hover:text-accent hover:decoration-accent touch-manipulation"
          >
            Retour accueil
          </a>
        </div>
      </div>
    </footer>
  );
}
