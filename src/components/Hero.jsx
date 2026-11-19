import React from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "../components/AnimatedSection/AnimatedSection";
import arrowIcon from "../assets/arrow.png";

export default function Hero({
  badge = "Международная IT-академия",
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
  buttonText = "Записаться на курс",
  buttonLink = "/enroll",
  icon = arrowIcon,
  rightContent = null,
  titleClassName = "max-w-[397px]",
}) {
  return (
    <section id="hero" className="w-full px-6 pt-16 pb-20 sm:px-8 lg:px-12 lg:pt-[129px] lg:pb-[105px]">
      <AnimatedSection
        className="mx-auto grid w-full max-w-[1098px] grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,1fr)_537px] lg:gap-0"
        stagger={0.15}
      >
        <div className="flex w-full flex-col lg:min-h-[501px]">
          {badge && (
            <span className="mb-5 block text-[18px] font-medium uppercase leading-normal text-black">
              {badge}
            </span>
          )}

          <h1 className={`${titleClassName} mb-[30px] text-[46px] font-bold leading-[1.17] text-[#D10C1E]`}>
            {title}
          </h1>

          {description && (
            <p className="mb-0 max-w-[397px] text-[18px] font-medium leading-[1.28] text-black">
              {description}
            </p>
          )}

          <Link
            to={buttonLink}
            className="mt-12 inline-flex h-[91px] w-[257px] items-center justify-center gap-[15px] rounded-[10px] bg-[#D30B22] px-[13px] text-[20px] font-medium text-white shadow-[0_15px_7.5px_rgba(0,0,0,0.25)] transition-all duration-300 hover:bg-[#bd091e] hover:shadow-xl lg:mt-auto"
          >
            <span>{buttonText}</span>
            {icon && (
              <img
                src={icon}
                alt="arrow"
                className="h-[30px] w-[30px] shrink-0 object-contain"
              />
            )}
          </Link>
        </div>

        {/* Right side container */}
        {rightContent ? (
          rightContent
        ) : (
          <div className="h-[461px] w-full max-w-[537px] bg-[#D9D9D9] lg:justify-self-end"></div>
        )}
      </AnimatedSection>
    </section>
  );
}
