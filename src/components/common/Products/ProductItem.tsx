import ImageNext from "@/src/components/common/ImageNext";
import { cn } from "@/src/lib/utils";
import { typeColor } from "@/src/constants/products";
import { Dispatch } from "react";

interface ProductItem {
  name: string;
  image: string;
  type: string[];
  onSelectItem: Dispatch<string>;
}

const ProductItem = ({
  name,
  image,
  type: types,
  onSelectItem: selecthandler,
}: ProductItem) => {
  const ProductCategory = () => (
    <ul className="ml-2 flex gap-2">
      {types.slice(0, 2).map((type, index) => (
        <li
          key={index}
          className={cn(
            "min-w-18 rounded-xl border-2 py-0.5 text-center text-gray-500",
            typeColor[type] ?? "bg-white",
          )}
        >
          {type}
        </li>
      ))}
    </ul>
  );

  return (
    <li className="overflow-hidden rounded-2xl border-2 border-gray-200 bg-gray-50">
      <button
        className="flex w-full flex-col gap-3"
        onClick={() => selecthandler(name)}
      >
        <figure className="relative h-56">
          <ImageNext
            src={image}
            alt={name}
            className="object-contain"
            fill
            sizes="grid5Col"
          />
        </figure>
        <ProductCategory />
        <p className="w-full border-t-2 py-2 text-center text-2xl font-bold">
          {name}
        </p>
      </button>
    </li>
  );
};

export default ProductItem;
