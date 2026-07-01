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
import { getThisFeature } from "@/src/lib/contentful";
import { HERO } from "@/src/constants/feature";

// TODO: (30/06/26) Consider adjusting foldering / repo structure
export default async function Page() {
  // TODO: (06/27/26) homepage to part of static page
  const featureContent = await getThisFeature();

  return (
    <>
      <Hero
        image={HERO.image}
        title={HERO.title}
        description={HERO.description}
        link={HERO.link}
      />
      <Feature
        isImageLeftSide={FEATURE_FEEDBACK.isImageLeftSide}
        image={FEATURE_FEEDBACK.image}
        title={FEATURE_FEEDBACK.title}
        description={FEATURE_FEEDBACK.description}
        button={FEATURE_FEEDBACK.button}
      />
      <Feature
        isImageLeftSide={featureContent.fields.isImageLeftSide}
        image={FEATURE_RECRUITMENT.image}
        title={featureContent.fields.title}
        description={featureContent.fields.description}
        button={FEATURE_RECRUITMENT.button}
      />
      <Feature
        isImageLeftSide={FEATURE_CHARITY.isImageLeftSide}
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
