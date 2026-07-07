import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";
import { cn } from "@/src/lib/utils";

type RichTextProps = {
  text: string | Document;
  className: string;
};

const RichText = ({ text, className }: RichTextProps) => {
  const isTextString = typeof text === "string";
  const TextTag = isTextString ? "p" : "div";
  const tagClassName = isTextString ? "" : "[&_p:not(:last-child)]:mb-3";
  const normalizedText = isTextString ? text : documentToReactComponents(text);

  return (
    <TextTag className={cn(tagClassName, className)}>{normalizedText}</TextTag>
  );
};

export default RichText;
