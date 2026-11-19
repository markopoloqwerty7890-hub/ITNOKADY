import React from 'react';
import { Link } from 'react-router-dom';
import arrowIcon from '../assets/arrow.png';
import robotImg from '../assets/Robot.png';
import locationIcon from '../assets/location_on (1).png';

const DEFAULT_CONTACT_CARDS = [
  {
    title: 'Адрес',
    text: (
      <>
        г.Ашхабад ул. Ататюрк,<br />
        Беркарар БЦ 1 этаж
      </>
    ),
  },
  {
    title: 'Телефон',
    text: (
      <>
        +993 (63) 47-11-92<br />
        +993 (63) 42-67-51
      </>
    ),
  },
  {
    title: 'Instagram',
    text: 'it_education_academy',
  },
  {
    title: 'Tiktok',
    text: 'it nokady',
  },
];

export default function Contacts({
  badge = 'Международная IT-академия',
  title = (
    <>
      СВЯЖИТЕСЬ<br />С НАМИ
    </>
  ),
  description = (
    <>
      Мы всегда рады ответить на ваши<br />
      вопросы и помочь с выбором курса.
    </>
  ),
  ctaText = 'Записаться на курс',
  ctaHref = '/enroll',
  arrow = arrowIcon,
  rightHeroContent = null,
  contactCards = DEFAULT_CONTACT_CARDS,
  cardIcon = locationIcon,
  robotImage = robotImg,
  showRobot = true,
}) {
  return (
    <div className="w-full bg-white font-['Roboto']">
      
      {/* Hero Section */}
      <section className="w-full px-6 pt-16 pb-20 sm:px-8 lg:px-12 lg:pt-[129px] lg:pb-[105px]">
        <div className="mx-auto grid w-full max-w-[1098px] grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_537px] lg:gap-0">
        <div className="flex w-full flex-col lg:min-h-[501px]">
          {badge && (
            <span className="mb-5 block text-[18px] font-medium uppercase leading-normal text-black">
              {badge}
            </span>
          )}
          
          <h1 className="mb-[30px] max-w-[397px] text-[46px] font-bold leading-[1.17] text-[#D10C1E]">
            {title}
          </h1>
          
          {description && (
            <p className="mb-0 max-w-[397px] text-[18px] font-medium leading-[1.28] text-black">
              {description}
            </p>
          )}

          <Link
            to={ctaHref}
            className="mt-12 inline-flex h-[91px] w-[257px] items-center justify-center gap-[15px] rounded-[10px] bg-[#D30B22] px-[13px] text-[20px] font-medium text-white shadow-[0_15px_7.5px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#bd091e] hover:shadow-xl lg:mt-auto"
          >
            <span>{ctaText}</span>
            {arrow && (
              <img src={arrow} alt="arrow" className="h-[30px] w-[30px] shrink-0 object-contain" />
            )}
          </Link>
        </div>

        {/* Right side container */}
        {rightHeroContent ? (
          rightHeroContent
        ) : (
          <div className="h-[461px] w-full max-w-[537px] bg-[#D9D9D9] lg:justify-self-end"></div>
        )}
        </div>
      </section>

      {/* Cards & Mascot Section */}
      <section className="w-full bg-white px-6 pb-24 pt-12 sm:px-8 lg:px-[46px] lg:pt-[39px]">
        <h2 className="mb-[83px] text-center text-[36px] font-medium leading-normal text-black">Контакты</h2>
        
        <div className="mx-auto mb-16 grid w-full max-w-[1098px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card, idx) => (
            <div
              key={card.id || idx}
              className="min-h-[171px] rounded-2xl border border-[#F2E3DC] bg-[#FAF2EE] p-6 shadow-md"
            >
              <div className="mb-6 flex items-center gap-2.5 text-[20px] font-medium text-[#D30B22]">
                {cardIcon && (
                  <img src={cardIcon} alt="Pin" className="h-6 w-6 object-contain" />
                )}
                <span>{card.title}</span>
              </div>
              <p className="text-[18px] leading-[1.2] text-black">
                {card.text}
              </p>
            </div>
          ))}
        </div>

        {/* Robot Mascot */}
        {showRobot && robotImage && (
          <div className="flex justify-center">
            <img 
              src={robotImage} 
              alt="Robot Mascot" 
              style={{ width: '270px', height: 'auto' }}
              className="object-contain" 
            />
          </div>
        )}

      </section>

    </div>
  );
}
