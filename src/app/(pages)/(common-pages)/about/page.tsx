import BannerLegacy from "@/src/components/mock-model/BannerLegacy";
import Feature from "@/src/components/common/Feature";
import Accordion from "@/src/components/common/Accordion";
import Form from "@/src/components/common/Forms/Contact";
import { FEATURE_RECRUITMENT } from "@/src/constants/feature";
import { ACCORDION_ITEMS } from "@/src/constants/accordion";
import { FORM } from "@/src/constants/form";

export default function Page() {
  return (
    <>
      <BannerLegacy />
      <Feature
        position={FEATURE_RECRUITMENT.position}
        image={FEATURE_RECRUITMENT.image}
        title={FEATURE_RECRUITMENT.title}
        description={FEATURE_RECRUITMENT.description}
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
