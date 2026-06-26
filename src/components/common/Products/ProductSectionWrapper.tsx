import { Suspense } from "react";
import ProductSection from "./ProductSection";
import { getPokemonData } from "@/src/lib/api/pokemon";
import ContainerBlock from "@/src/components/common/ContainerBlock";

async function ProductSectionWithData() {
  //need to not be in the page.tsx since getPokemonData is SSR / force-dynamic the whole page
  const { pokemonDetailList, allCategories } = await getPokemonData();

  return (
    <ProductSection
      productList={pokemonDetailList}
      allCategories={allCategories}
    />
  );
}

// TODO: to create my own loading screen
function ProductSectionLoading() {
  return (
    <ContainerBlock type="standard-block">
      <div className="flex flex-col items-center gap-6">
        <div className="text-md flex w-full justify-center overflow-hidden rounded-xl border-2 bg-green-500/50 p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="h-10 w-full animate-pulse rounded bg-gray-300" />
            <div className="h-10 w-48 animate-pulse rounded bg-gray-300" />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl border-2 border-gray-200 bg-gray-100"
            />
          ))}
        </div>
      </div>
    </ContainerBlock>
  );
}

export default function ProductSectionWrapper() {
  return (
    <Suspense fallback={<ProductSectionLoading />}>
      <ProductSectionWithData />
    </Suspense>
  );
}
