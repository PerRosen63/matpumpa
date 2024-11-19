import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./Accordion"; // Import from your component file
import * as React from "react";

interface ProductCategoryAccordionProps {
  selectedCategoryObject?: object;
  defaultCategoryObject?: object;
}

const ProductCategoryAccordion = ({
  selectedCategoryObject,
  defaultCategoryObject,
}: ProductCategoryAccordionProps) => {
  const [openValue, setOpenValue] = React.useState<string | null>(null); // Initial state

  return (
    <Accordion
      type="single"
      collapsible
      value={openValue}
      onValueChange={setOpenValue}
    >
      <AccordionItem value="item">
        {selectedCategoryObject ? (
          <div>
            <AccordionTrigger>{selectedCategoryObject.name}</AccordionTrigger>

            {selectedCategoryObject.description
              .split("\r\n\r\n")
              .map((line, index) => (
                <AccordionContent key={index}>
                  <p>{line}</p>
                </AccordionContent>
              ))}
          </div>
        ) : (
          <div>
            <AccordionTrigger>Lite roliga fakta</AccordionTrigger>
            <AccordionContent>
              <p>{defaultCategoryObject?.description}</p>
            </AccordionContent>
          </div>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ProductCategoryAccordion;
