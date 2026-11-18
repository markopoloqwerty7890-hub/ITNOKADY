import SectionTitle from "../../components/SectionTitle/SectionTitle";
import FeatureCard from "../../components/Card/FeatureCard";
import AnimatedSection from "../../components/AnimatedSection/AnimatedSection";
import RobotAnchor from "../../components/Robot/RobotAnchor";
import { IconCertificate, IconGlobe, IconSupport, IconTeacher, } from "../../assets/icons/MiscIcons";

const FEATURES = [
    { icon: IconGlobe, label: "Практика на реальных проектах" },
    { icon: IconTeacher, label: "Опытные преподаватели-практики" },
    { icon: IconCertificate, label: "Международный сертификат" },
    { icon: IconSupport, label: "Поддержка на каждом этапе обучения" },
];
export default function WhyUs() {
    return (<section id="why-us" className="container-page py-20">
      <SectionTitle eyebrow="Почему мы?" title="Почему выбирают нас" className="mb-12"/>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex min-h-[260px] items-center justify-center">
          <RobotAnchor
            id="why-us"
            mode="local"
            pose="neutral"
            className="h-52 w-52 sm:h-60 sm:w-60"
          />
        </div>

        <div>
          <AnimatedSection className="flex flex-col gap-4" stagger={0.1}>
            {FEATURES.map((feature) => (<FeatureCard key={feature.label} icon={feature.icon} label={feature.label}/>))}
          </AnimatedSection>
        </div>
      </div>
    </section>);
}
