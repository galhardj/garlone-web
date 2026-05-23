"use client";

import { IconButton } from "@/src/components/common/Button";
import { Link } from "@/src/components/common/Button";
import ImageNext from "@/src/components/common/ImageNext";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { typeColor } from "@/src/constants/products";
import { useDisableBodyScroll } from "@/src/hooks/useDisableBodyScroll";
import { useKeydownTrigger } from "@/src/hooks/useKeydownTrigger";
import { PokemonDetail } from "@/src/type/pokemon";
import type { ProductDetail } from "@/src/type/product";

const ProductDetail = ({
  product,
  onCloseModal: closeModalHandler,
}: ProductDetail<PokemonDetail>) => {
  const [slideIndex, setSlideIndex] = useState(2);

  useDisableBodyScroll();
  useKeydownTrigger<string>("Escape", closeModalHandler, "");

  const slidehandler = (nav: "next" | "prev") => () => {
    setSlideIndex((prev) => {
      if (nav === "next") {
        return prev === product.gifs.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? product.gifs.length - 1 : prev - 1;
      }
    });
  };

  const DetailList = ({ title, list }: { title: string; list: string[] }) => {
    return (
      <div>
        <h3 className="text-lg font-semibold md:text-xl">{title}</h3>
        <ul className="list-disc pl-4 text-sm md:text-base">
          {list.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <section
      role="dialog"
      aria-modal="true"
      onClick={() => closeModalHandler("")}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-black/50 p-4 md:p-8"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="my-auto flex h-max w-full max-w-3xl flex-col items-center gap-20 rounded-2xl border-6 border-gray-400 bg-gray-50 p-10 md:flex-row"
      >
        <figure className="relative aspect-square w-3/4 flex-1 md:w-auto">
          <ImageNext
            src={product.gifs[slideIndex]}
            alt={product.name}
            className="object-contain"
          />
          <IconButton category="chevronLeft" onClick={slidehandler("prev")}>
            <ChevronLeft />
          </IconButton>
          <IconButton category="chevronRight" onClick={slidehandler("next")}>
            <ChevronRight />
          </IconButton>
        </figure>
        <div
          className={`flex w-full flex-1 flex-col items-center rounded-xl p-6 ${typeColor[product.type[0]]} md:p-10`}
        >
          <div className="flex flex-col items-start gap-5 md:gap-7">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">
                {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
              </h2>
              <hr className="h-1 w-full bg-gray-600" />
            </div>

            <div className="flex gap-5 md:gap-15">
              <DetailList title="Abilities" list={product.abilities} />
              <DetailList title="Moves" list={product.moves} />
            </div>

            <Link
              href={`https://bulbapedia.bulbagarden.net/wiki/${product.name}_(Pokemon)`}
              buttonColor="gray"
            >
              Bulbapedia
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
