import { useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../componetts/Navbar";
import Bottom from "../componetts/Bottom";
import ScrollToHash from "../components/common/ScrollToHash";
import PageTransition from "../components/motion/PageTransition";
import ScrollProgress from "../components/motion/ScrollProgress";
import SmoothScroll from "../components/motion/SmoothScroll";
import { content } from "../data/content";
import { getLocalizedValue, normalizeLanguage } from "../utils/i18n";
import { getArticle } from "../data/articles";
import { getProcedure } from "../data/procedures";
import { switchLanguagePath } from "../utils/languageRouting";
import { usePageView } from "../hooks/useAnalytics";
import { ANALYTICS_EVENTS, getCurrentPath, trackEvent } from "../utils/analytics";

function hasEnglishVersion(pathname) {
  const articleMatch = pathname.match(/^\/(?:ar|en)\/blog\/([^/]+)\/?$/);
  if (articleMatch) {
    return getArticle(articleMatch[1], "en")?.status === "published";
  }

  const procedureMatch = pathname.match(
    /^\/(?:ar|en)\/procedures\/([^/]+)\/?$/,
  );
  if (procedureMatch) return Boolean(getProcedure(procedureMatch[1], "en"));

  return true;
}

export default function MainLayout() {
  const { lang: routeLanguage } = useParams();
  const lang = normalizeLanguage(routeLanguage);
  const location = useLocation();
  const navigate = useNavigate();
  const t = getLocalizedValue(content, lang);
  const languageSwitchAvailable =
    lang === "en" || hasEnglishVersion(location.pathname);
  usePageView(lang);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
    window.localStorage.setItem("kadina-language", lang);
  }, [lang, t.dir]);

  const handleLanguageToggle = () => {
    const nextLanguage = lang === "ar" ? "en" : "ar";
    if (nextLanguage === "en" && !languageSwitchAvailable) return;
    trackEvent(ANALYTICS_EVENTS.LANGUAGE_CHANGE, {
      from: lang,
      path: getCurrentPath(location),
      to: nextLanguage,
    });
    navigate(switchLanguagePath(location, nextLanguage));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        dir={t.dir}
        className="min-h-screen overflow-x-hidden bg-[var(--color-surface)] text-[var(--color-text)]"
      >
        <SmoothScroll />
        <ScrollProgress />
        <ScrollToHash />
        <a
          className="ds-button fixed start-4 top-3 z-[10000] -translate-y-24 bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)] transition-transform focus:translate-y-0"
          href="#main-content"
        >
          {lang === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}
        </a>
        <Navbar
          t={t}
          lang={lang}
          languageSwitchAvailable={languageSwitchAvailable}
          onLanguageToggle={handleLanguageToggle}
        />
        <main id="main-content" tabIndex="-1">
          <PageTransition>
            <Outlet context={{ lang, t }} />
          </PageTransition>
        </main>
        <Bottom lang={lang} t={t} />
      </div>
    </MotionConfig>
  );
}
