import AdminContactsGrid from "@/src/components/mock-model/tailwindcss/GridList/GridClaude";
import ToggleSwitch from "@/src/components/mock-model/tailwindcss/ToggleSwitch";
import Hero from "@/src/components/common/Hero";
import { HERO } from "@/src/constants/feature";

export default function Page() {
  return (
    <>
      <Hero
        image={HERO.image}
        title={HERO.title}
        description={HERO.description}
        link={HERO.link}
      />
      <AdminContactsGrid />
      <ToggleSwitch />
    </>
  );
}
