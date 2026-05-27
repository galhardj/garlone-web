export interface ContainerBlockProps {
  children: React.ReactNode;
  type: "standard-block" | "screen-centered";
}

export interface HeroBannerProps {
  image: {
    src: string;
    alt: string;
  };
  title: string;
  subtitle: string;
  description: string;
  link: {
    url: string;
    text: string;
  };
}
