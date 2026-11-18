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
      <Hero />
      <CoursesOrbit />
      <WhyUs />
      <Stats />
      <Testimonials />
      <ContactForm />
    </RobotAnchorProvider>
    );
}
