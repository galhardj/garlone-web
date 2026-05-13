import ImageNext from "@/src/components/common/ImageNext";
import { Link } from "@/src/components/common/Button";
import { MoveRight } from "lucide-react";
import { HeroBannerProps } from "@/src/type/props";

const HeroBanner = ({
  image,
  title,
  subtitle,
  description,
  link,
}: HeroBannerProps) => {
  return (
    <div className="relative max-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <ImageNext
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative mx-auto flex min-h-[600px] max-w-6xl items-center px-6 lg:min-h-[700px] lg:px-12">
        <div className="w-full max-w-lg">
          <div className="relative">
            <div className="absolute -inset-8 rounded-3xl bg-amber-50/85 shadow-2xl shadow-amber-900/10 backdrop-blur-md lg:-inset-12" />

            <div className="relative">
              <h1 className="mb-6 text-4xl leading-[1.05] font-bold tracking-tight text-amber-950 sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="mb-5 text-lg font-semibold tracking-[0.02em] text-amber-600 lg:text-xl">
                {subtitle}
              </p>
              <p className="mb-10 max-w-lg text-base leading-relaxed font-light text-amber-900/80 lg:text-lg">
                {description}
              </p>
              <Link
                href={link.url}
                className="relative inline-flex items-center gap-2 rounded-full bg-amber-400 px-8 py-4 text-base font-semibold text-amber-950 shadow-lg shadow-amber-400/30 transition-all duration-300 hover:scale-[1.03] hover:bg-amber-500 hover:shadow-amber-500/40 active:scale-[0.98]"
              >
                {link.text}
                <MoveRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
