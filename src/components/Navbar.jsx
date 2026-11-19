import React from 'react';
import { useLocation } from 'react-router-dom';
import Logo from '../assets/logo.png';

const DEFAULT_NAV_LINKS = [
  { name: 'Главная', href: '/' },
  { name: 'Курсы', href: '/courses' },
  { name: 'О нас', href: '/about' },
  { name: 'Для детей', href: '/kids' },
  { name: 'Для взрослых', href: '/adults' },
];

export default function Navbar({
  logoSrc = Logo,
  brandName = 'IT NOKADY',
  brandHref = '/',
  navLinks = DEFAULT_NAV_LINKS,
  contactText = 'Контакты',
  contactHref = '/contacts',
  ctaText = 'Записаться на курс',
  ctaHref = '/enroll',
  onCtaClick,
}) {
  const { pathname } = useLocation();

  const isCurrentPage = (href) => {
    if (href === '/') return pathname === '/' || pathname === '/home';
    return href === pathname;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/25 bg-white px-6 py-4 text-black transition-all lg:px-12 lg:py-[25px]">
      <div className="mx-auto flex min-h-[49px] w-full max-w-[1098px] items-center justify-start gap-[23px]">
        
        {/* Brand Logo & Name */}
        <a href={brandHref} className="mr-[17px] flex w-[220px] shrink-0 items-center gap-2.5">
          {logoSrc && (
            <img
              src={logoSrc}
              alt={`${brandName} Logo`}
              className="h-10 w-10 shrink-0 object-contain"
            />
          )}
          <span className="whitespace-nowrap text-[28px] font-bold leading-none tracking-tight">{brandName}</span>
        </a>

        {/* Center Navigation Links */}
        <nav className="hidden shrink-0 items-center min-[1180px]:flex">
          <ul className="flex items-center gap-[23px]">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  aria-current={isCurrentPage(link.href) ? 'page' : undefined}
                  className={`block whitespace-nowrap rounded-[10px] border px-[9px] py-[9px] text-[16px] font-normal leading-[19px] transition-colors hover:text-[#D30B22] ${isCurrentPage(link.href) ? 'border-[#D11725]' : 'border-transparent'}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Controls & CTA */}
        <div className="flex shrink-0 items-center gap-5">
          {contactText && (
            <a
              href={contactHref}
              aria-current={isCurrentPage(contactHref) ? 'page' : undefined}
              className={`hidden whitespace-nowrap rounded-[10px] border px-[9px] py-[9px] text-[16px] font-normal leading-[19px] transition-colors hover:text-[#D30B22] sm:inline-block ${isCurrentPage(contactHref) ? 'border-[#D11725]' : 'border-transparent'}`}
            >
              {contactText}
            </a>
          )}

          <a
            href={ctaHref}
            onClick={onCtaClick}
            className="inline-flex h-[49px] w-[172px] items-center justify-center rounded-[5px] border border-transparent bg-[#D30B22] px-2.5 py-[15px] text-[16px] font-normal leading-[19px] text-white transition-colors hover:bg-[#bd091e]"
          >
            {ctaText}
          </a>
        </div>

      </div>
    </header>
  );
}
