import { forwardRef } from "react";
import { Link, useParams } from "react-router-dom";
import { DEFAULT_LANGUAGE, isSupportedLanguage, localizePath } from "../../utils/languageRouting";

const LocalizedLink = forwardRef(function LocalizedLink({ to, ...props }, ref) {
  const { lang } = useParams();
  const language = isSupportedLanguage(lang) ? lang : DEFAULT_LANGUAGE;
  const localizedTo =
    typeof to === "string"
      ? localizePath(to, language)
      : to?.pathname
        ? { ...to, pathname: localizePath(to.pathname, language) }
        : to;

  return <Link {...props} ref={ref} to={localizedTo} />;
});

export default LocalizedLink;
