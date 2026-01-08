'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-end items-center h-20 font-light  uppercase tracking-widest">
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = segment.replace(/-/g, " ");

            const isLast = index === segments.length - 1;

            return (
              <span key={href} className="flex items-center">
                <span className="mx-3">|</span>

                {isLast ? (
                  <span className="text-black ">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-black transition"
                  >
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
