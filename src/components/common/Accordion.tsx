"use client";

import { useState } from "react";

interface AccordionProps {
  title?: string;
  accordions: AccordionItem[];
}

interface AccordionItem {
  id: number;
  summary: string;
  description: string;
}

interface AccordionItemProps extends AccordionItem {
  openItem: boolean;
  onItemClick: (id: number) => void;
}

const AccordionItem = ({
  id,
  summary,
  description,
  openItem,
  onItemClick,
}: AccordionItemProps) => {
  // TODO: change to onToggle
  return (
    <details className="py-4" onClick={() => onItemClick(id)} open={openItem}>
      <summary>{summary}</summary>
      <p>{description}</p>
    </details>
  );
};

const Accordion = ({ title, accordions }: AccordionProps) => {
  const [openItem, setOpenItem] = useState<null | number>(null);

  const openAccordionItemHandler = (id: number) => {
    setOpenItem((prev) => (prev === id ? prev : id));
  };

  return (
    <section>
      <h2>{title}</h2>
      {accordions.map((accordion) => (
        <AccordionItem
          key={accordion.id}
          id={accordion.id}
          summary={accordion.summary}
          description={accordion.description}
          openItem={openItem === accordion.id}
          onItemClick={openAccordionItemHandler}
        />
      ))}
    </section>
  );
};

export default Accordion;
