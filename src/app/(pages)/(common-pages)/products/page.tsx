import FestiveMenu from "@/src/components/mock-model/Products";
import ProductHovered from "@/src/components/mock-model/ProductHovered";
import ProductSectionWrapper from "@/src/components/common/Products/ProductSectionWrapper";
import CarouselSlide from "@/src/components/mock-model/Carousel";
import BannerClaude from "@/src/components/mock-model/Banner";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <FestiveMenu />
      <ProductHovered />
      <CarouselSlide />
      <ProductSectionWrapper />
      <BannerClaude />
    </>
  );
}
