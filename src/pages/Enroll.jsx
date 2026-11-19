import { useState } from 'react';
import robotImg from '../assets/Robot.png';

const DEFAULT_COURSES = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'python', label: 'Python' },
  { value: 'ux', label: 'UI/UX Design' },
];

export default function Enroll({
  eyebrow = 'ЗАПИСАТЬСЯ НА КУРС',
  title = 'Оставить заявку',
  subtext = 'Мы свяжемся с вами в ближайшее время!',
  courses = DEFAULT_COURSES,
  buttonText = 'Отправить заявку',
  robotImage = robotImg,
  showRobot = true,
  onSubmit,
}) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const hasRobot = showRobot && robotImage;
  const desktopLayoutClass = hasRobot
    ? 'min-[1180px]:translate-x-[15px] min-[1180px]:grid-cols-[250px_537px] min-[1180px]:gap-[280px]'
    : 'min-[1180px]:grid-cols-[minmax(0,537px)] min-[1180px]:justify-center';

  return (
    <div className="w-full bg-white font-['Roboto'] py-10 sm:py-16">
      <div className={`mx-auto grid w-full max-w-[1067px] grid-cols-1 items-center gap-10 px-6 sm:px-8 min-[1180px]:px-0 ${desktopLayoutClass}`}>
        {hasRobot && (
          <div className="flex w-full justify-center min-[1180px]:justify-start">
            <img
              src={robotImage}
              alt="Mascot"
              className="h-[235px] w-[250px] object-contain"
            />
          </div>
        )}

        <div className="w-full">
          <div className="mb-[30px] text-center">
            {eyebrow && (
              <span className="mb-2 block text-[18px] font-medium uppercase leading-normal text-[#D30B22]">
                {eyebrow}
              </span>
            )}
            {title && (
              <h1 className="text-[36px] font-medium leading-normal text-black">
                {title}
              </h1>
            )}
          </div>

          {/* Form */}
          <div className="w-full">
            <form className="space-y-[30px]" onSubmit={handleSubmit}>
              <div>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ваше имя" 
                  value={formData.name}
                  onChange={handleChange}
                  className="h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] text-black placeholder-[rgba(0,0,0,0.6)] transition focus:border-[#D30B22] focus:outline-none"
                  required
                />
              </div>

              <div>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Телефон" 
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] text-black placeholder-[rgba(0,0,0,0.6)] transition focus:border-[#D30B22] focus:outline-none"
                  required
                />
              </div>

              <div>
                <select 
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className={`h-[65px] w-full rounded-[5px] border border-[rgba(117,117,117,0.4)] bg-white px-[10px] text-[20px] transition focus:border-[#D30B22] focus:outline-none ${
                    formData.course ? 'text-black' : 'text-gray-400'
                  }`}
                  required
                >
                  <option value="" disabled>Выберите курс</option>
                  {courses.map((c) => (
                    <option 
                      key={typeof c === 'string' ? c : c.value} 
                      value={typeof c === 'string' ? c : c.value}
                      className="text-black"
                    >
                      {typeof c === 'string' ? c : c.label}
                    </option>
                  ))}
                </select>
              </div>

              <button 
                type="submit" 
                className="h-[65px] w-full rounded-[5px] bg-[#D30B22] text-[20px] font-medium text-white transition hover:bg-[#bd091e] active:scale-[0.99]"
              >
                {buttonText}
              </button>
            </form>

            {subtext && (
              <p className="mt-[45px] text-center text-[18px] font-medium text-black">
                {subtext}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
