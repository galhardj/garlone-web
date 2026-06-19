import { FeatureProps } from "@/src/components/common/Feature";

export const FEATURE_FEEDBACK: FeatureProps = {
  position: "left",
  image: {
    src: "/images/stars-feedback.webp",
    alt: "Feedback Stars",
  },
  title: "We want your feedback!",
  description:
    "Do we make you smile, or is there somewhere we can improve? Take our quick survey, and you could win a £50 Pret gift card.",
  button: {
    label: "Have a say",
    href: "https://support.google.com/",
  },
};

export const FEATURE_RECRUITMENT: FeatureProps = {
  position: "right",
  image: {
    src: "/images/colleagues-work.webp",
    alt: "Season Sip Banner",
  },
  title: "Welcome back, Pumpkin Spice Latte",
  description:
    "It's the sip you've been waiting for all year. Our Pumpkin Spice Latte brings autumn to life in every cup. ",
  button: {
    label: "Submit here",
    href: "http://linkedin.com/",
    buttonColor: "transparent",
  },
};

export const FEATURE_CHARITY: FeatureProps = {
  position: "left",
  image: {
    src: "/images/foundation.webp",
    alt: "Foundation",
  },
  title: "Our Charitable Foundation",
  description: `Our dedicated charitable organization actively helps vulnerable individuals break the difficult cycle of homelessness and poverty. We achieve this by providing daily surplus food donations, skills training, and stable long-term employment opportunities within our business.
  
  Donating unsold food since day one.`,
};

export const HERO = {
  image: {
    src: "/images/kiwi.avif",
    alt: "Assorted premium dry fruits and nuts",
  },
  title: "Savor the Royal Taste",
  subtitle: "Premium Dry Fruits, Handpicked for You",
  description:
    "At King Uncle, we believe in offering only the highest quality dry fruits that are packed with nutrition and flavor. From crunchy almonds to juicy raisins, indulge in nature's finest, delivered fresh to your doorstep. \n\n Freshly made, as always. Tuck in!",
  link: {
    url: "/products",
    text: "Shop Now",
  },
};
