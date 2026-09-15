import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";

export default function Breadcrumbs({ items }) {
  const { lang = "ar" } = useOutletContext();
  const { pathname } = useLocation();
  const onDark = /^\/(contact|faq|blog|booking)/.test(pathname);
  return (
    <nav aria-label={lang === "ar" ? "مسار التنقل" : "Breadcrumb"}>
      <ol
        className={`breadcrumbs flex flex-wrap items-center gap-x-2 gap-y-1 ${onDark ? "breadcrumbs-dark" : ""}`}
      >
        <li>
          <Link className="inline-flex min-h-11 items-center transition-colors duration-200" to="/">
            {lang === "ar" ? "الرئيسية" : "Home"}
          </Link>
        </li>
        {items.map((item, index) => (
          <li
            className="flex items-center gap-2"
            key={item.to ?? `breadcrumb-${index}`}
          >
            <span aria-hidden="true" className="breadcrumb-separator">
              /
            </span>
            {item.to ? (
              <Link className="inline-flex min-h-11 items-center transition-colors duration-200" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="breadcrumb-current">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
