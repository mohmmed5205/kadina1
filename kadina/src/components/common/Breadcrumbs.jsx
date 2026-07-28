import { Link } from "react-router-dom";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="مسار التنقل">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-bold text-[#4c2c00]/65">
        <li>
          <Link className="transition hover:text-[#cf7d11]" to="/">
            الرئيسية
          </Link>
        </li>
        {items.map((item) => (
          <li className="flex items-center gap-2" key={item.label}>
            <span aria-hidden="true" className="text-[#f8aa2d]">
              /
            </span>
            {item.to ? (
              <Link className="transition hover:text-[#cf7d11]" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-[#4c2c00]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
