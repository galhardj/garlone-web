import Feature from "@/src/components/common/Feature";
import Accordion from "@/src/components/common/Accordion";
import Form from "@/src/components/common/Forms/Contact";
import Hero from "@/src/components/common/Hero";
import {
  FEATURE_RECRUITMENT,
  FEATURE_CHARITY,
  FEATURE_FEEDBACK,
} from "@/src/constants/feature";
import { ACCORDION_ITEMS } from "@/src/constants/accordion";
import { FORM } from "@/src/constants/form";
import { fetchContentful } from "@/src/lib/api/contentful";
import { HERO } from "@/src/constants/feature";

export default async function Page() {
  // TODO: to create domain/contentful.ts to process api response, refer; src/components/common/Products/ProductSectionWrapper.tsx
  const contentfulBanner = await fetchContentful();

  return (
    <>
      <Hero
        image={HERO.image}
        title={HERO.title}
        description={HERO.description}
        link={HERO.link}
      />
      <Feature
        isImageLeft={FEATURE_FEEDBACK.isImageLeft}
        image={FEATURE_FEEDBACK.image}
        title={FEATURE_FEEDBACK.title}
        description={FEATURE_FEEDBACK.description}
        button={FEATURE_FEEDBACK.button}
      />
      <Feature
        isImageLeft={contentfulBanner.fields.isImageLeft}
        image={FEATURE_RECRUITMENT.image}
        title={contentfulBanner.fields.title}
        description={contentfulBanner.fields.description}
        button={FEATURE_RECRUITMENT.button}
      />
      <Feature
        isImageLeft={FEATURE_CHARITY.isImageLeft}
        image={FEATURE_CHARITY.image}
        title={FEATURE_CHARITY.title}
        description={FEATURE_CHARITY.description}
      />
      <Accordion
        title={ACCORDION_ITEMS.title}
        accordions={ACCORDION_ITEMS.accordions}
      />
      <Form
        title={FORM.title}
        description={FORM.description}
        containers={FORM.containers}
        buttonText={FORM.buttonText}
      />
    </>
  );
}
