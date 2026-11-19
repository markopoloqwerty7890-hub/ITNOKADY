import React from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import RobotAnchor from "../../components/Robot/RobotAnchor";
import AnimatedSection from "../../components/AnimatedSection/AnimatedSection";
import Button from "../../components/Button/Button";
import { FOOTER_COURSE_LINKS } from "../../constants/navigation";
import { useContactForm } from "../../hooks/useContactForm";

export default function ContactForm() {
  const { values, updateField, handleSubmit, status } = useContactForm();

  return (
    <section
      id="contact"
      className="w-full bg-white px-6 py-16 font-['Roboto'] sm:px-8 lg:px-12 lg:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1067px] grid-cols-1 items-center gap-10 min-[1180px]:translate-x-[15px] min-[1180px]:grid-cols-[250px_537px] min-[1180px]:gap-[280px]">
          
          {/* Column 1: Animated Robot Anchor */}
          <AnimatedSection className="flex h-[235px] w-full justify-center min-[1180px]:justify-start" y={16}>
            <RobotAnchor
              id="contact"
              pose="neutral"
              className="h-[235px] w-[250px] object-contain"
            />
          </AnimatedSection>

        <div className="w-full">
            <AnimatedSection className="mb-[30px] text-center" y={16}>
              <SectionTitle
                eyebrow="ЗАПИСАТЬСЯ НА КУРС"
                title="Оставить заявку"
                align="center"
                eyebrowClassName="text-[18px] font-medium tracking-normal text-[#D30B22]"
                titleClassName="text-[36px] font-medium leading-normal text-black sm:text-[36px]"
              />
            </AnimatedSection>

          <AnimatedSection className="w-full" y={24}>
            <form className="grid grid-cols-1 gap-[30px]" onSubmit={handleSubmit} noValidate>
              <div>
                <input 
                  type="text" 
                  placeholder="Ваше имя" 
                  value={values.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className="h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] text-black placeholder-[rgba(0,0,0,0.6)] transition focus:border-[#D30B22] focus:outline-none"
                  required
                />
              </div>

              <div>
                <input 
                  type="tel" 
                  placeholder="Телефон" 
                  value={values.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] text-black placeholder-[rgba(0,0,0,0.6)] transition focus:border-[#D30B22] focus:outline-none"
                  required
                />
              </div>

              <div>
                <select 
                  value={values.course}
                  onChange={(e) => updateField("course", e.target.value)}
                  className={`h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] transition focus:border-[#D30B22] focus:outline-none ${
                    values.course ? "text-black" : "text-gray-400"
                  }`}
                >
                  <option value="">Выберите курс</option>
                  {FOOTER_COURSE_LINKS.map((course) => (
                    <option key={course} value={course} className="text-black">
                      {course}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#D30B22] text-[20px] font-medium text-white hover:bg-[#bd091e]"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? "Отправляем..." : "Отправить заявку"}
              </Button>

              {/* Dynamic Feedback Messages */}
              {status === "success" && (
                <p className="mt-[22px] text-center text-[18px] font-medium text-green-600">
                  Заявка отправлена! Мы скоро свяжемся с вами.
                </p>
              )}
              {status === "error" && (
                <p className="mt-[22px] text-center text-[18px] font-medium text-[#D30B22]">
                  Не удалось отправить заявку. Попробуйте еще раз.
                </p>
              )}
              {status === "idle" && (
                <p className="mt-[22px] text-center text-[18px] font-medium text-black">
                  Мы свяжемся с вами в ближайшее время!
                </p>
              )}
            </form>
          </AnimatedSection>
        </div>

      </div>
    </section>
  );
}
