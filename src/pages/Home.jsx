import Hero from "../components/Hero";
import CoursesOrbit from "../sections/CoursesOrbit/CoursesOrbit";
import WhyUs from "../sections/WhyUs/WhyUs";
import Stats from "../sections/Stats/Stats";
import Testimonials from "../sections/Testimonials/Testimonials";
import ContactForm from "../sections/ContactForm/ContactForm";
import { RobotAnchorProvider } from "../components/Robot/RobotAnchorProvider";

export default function Home() {
    return (
    <RobotAnchorProvider>
      <Hero
        badge="Международная IT-академия"
        title={<>ТВОЙ ПУТЬ В IT<br />НАЧИНАЕТСЯ<br />ЗДЕСЬ</>}
        description="Практическое обучение по международным стандартам от экспертов из ведущих IT-компаний мира"
      />
      <CoursesOrbit />
      <WhyUs />
      <Stats />
      <Testimonials />
      <ContactForm />
    </RobotAnchorProvider>
    );
}
