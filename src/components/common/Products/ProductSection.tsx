"use client";

import { Dispatch, useMemo, useState } from "react";
import Button from "@/src/components/common/Button";
import ContainerBlock from "@/src/components/common/ContainerBlock";
import { CloseIcon } from "@/src/icons/CloseIcon";
import { PokemonDetail } from "@/src/type/pokemon";
import type { ProductSection } from "@/src/type/product";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";
import SearchBox from "./SearchBox";
import SortItems from "./SortItems";

//TODO: see if MediaQuery should be implemented; https://www.linkedin.com/pulse/why-you-should-stop-using-media-queries-nextjs-felipe-rocha-82e8f
//TODO: https://stackoverflow.com/questions/76732951/how-do-i-use-media-queries-in-the-next-js-app-router
const ProductSection = ({
  productList,
  allCategories,
}: ProductSection<PokemonDetail>) => {
  const lengthDiff = 10;
  const [itemLen, setItemLen] = useState(lengthDiff);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCat, setCategory] = useState("");
  const [activeProduct, setProduct] = useState("");

  const detailedProduct = productList.find(
    (product) => product.name === activeProduct,
  );

  // useMemo; avoid .filter recalculation when "setItemLen" is triggered
  const filteredList = useMemo(
    () =>
      productList.filter((product) => {
        const meetFilter = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const meetSort =
          selectedCat === "" || product.type.includes(selectedCat);
        return meetFilter && meetSort;
      }),
    [searchQuery, selectedCat],
  );

  const changeHandler =
    <T extends HTMLInputElement | HTMLSelectElement>(
      setFilter: Dispatch<string>,
    ) =>
    (e: React.ChangeEvent<T>) => {
      setFilter(e.target.value);
      setItemLen(lengthDiff);
    };

  const ButtonExpand = () => (
    <div className="flex gap-3">
      <Button
        color="yellow"
        onClick={() => setItemLen((prev) => prev + lengthDiff)}
        data-testid="show-more-products"
      >
        Show more
      </Button>
      <Button
        color="yellowDark"
        onClick={() => setItemLen(productList.length)}
        data-testid="show-all-products"
      >
        Show all
      </Button>
      {itemLen > lengthDiff && <ButtonCollapse />}
    </div>
  );

  const ButtonCollapse = () => (
    <Button
      color="blue"
      onClick={() => setItemLen(lengthDiff)}
      data-testid="minimize-product-list"
    >
      Minimize
    </Button>
  );

  const ButtonSection = () => (
    <>
      {itemLen < filteredList.length ? (
        <ButtonExpand />
      ) : filteredList.length > lengthDiff ? (
        <ButtonCollapse />
      ) : (
        <></>
      )}
    </>
  );

  const ResetButton = () => {
    return (
      <Button
        onClick={() => {
          setSearchQuery("");
          setCategory("");
          setItemLen(lengthDiff);
        }}
        category="resetButton"
        aria-label="Clear product section filters"
      >
        <CloseIcon className="h-6 w-6 text-red-500" />
      </Button>
    );
  };

  return (
    <ContainerBlock type="standard-block">
      <div className="flex flex-col items-center gap-6">
        <div className="text-md flex w-full justify-center overflow-hidden rounded-xl border-2 bg-green-500/50 p-6">
          <div className="flex flex-col gap-8 md:flex-row">
            <SearchBox
              filterQuery={searchQuery}
              onSearch={changeHandler<HTMLInputElement>(setSearchQuery)}
            />
            <div className="flex items-center gap-8">
              <SortItems
                selectedCat={selectedCat}
                onSorting={changeHandler<HTMLSelectElement>(setCategory)}
                allCategories={allCategories}
              />
              {(searchQuery || selectedCat) && <ResetButton />}
            </div>
          </div>
        </div>
        <ProductList
          filteredList={filteredList}
          itemLen={itemLen}
          onSelectItem={setProduct}
        />
        <ButtonSection />
        {detailedProduct && (
          <ProductDetail product={detailedProduct} onCloseModal={setProduct} />
        )}
      </div>
    </ContainerBlock>
  );
};

export default ProductSection;
