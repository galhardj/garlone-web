import AdminContactsGrid from "@/src/components/mock-model/tailwindcss/GridList/GridClaude";
import ToggleSwitch from "@/src/components/mock-model/tailwindcss/ToggleSwitch";
import Hero from "@/src/components/common/Hero";
import { HERO } from "@/src/constants/feature";

// TODO: check 'server undefined' in /ui-in-the-work' server console
export default function Page() {
  return (
    <>
      <Hero
        image={HERO.image}
        title={HERO.title}
        subtitle={HERO.subtitle}
        description={HERO.description}
        link={HERO.link}
      />
      <AdminContactsGrid />
      <ToggleSwitch />
    </>
  );
}
