import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useMemo, useState } from "react";
import AppContext from "../context/AppContext";
import React from "react";
import { TitleSection } from "../style_components/TitleSection";
import { ContentSectionNarrow } from "../style_components/ContentSectionNarrow";
import { FormRefresh } from "grommet-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/style_components/Accordion";

export function Products() {
  const { products, categories, loading, categoriesFetched } = useContext(
    AppContext
  ) ?? {
    products: [],
    categories: [],
    loading: true,
    categoriesFetched: false,
  };

  const { categorySlug } = useParams();
  const navigate = useNavigate();

  const selectedCategoryObject = useMemo(() => {
    if (!categorySlug) {
      return null;
    }
    return categories.find(
      (category) =>
        category.name.toLowerCase().replace(/\s+/g, "-") === categorySlug
    );
  }, [categories, categorySlug]);

  const selectedCategoryId = selectedCategoryObject?.id || null;

  const [accordionOpen, setAccordionOpen] = useState<
    "item-1" | null | undefined
  >(undefined); // Initial state based on selectedCategoryId

  const handleCategoryChange = (categoryId: number | null) => {
    if (categoryId === null) {
      const animationDuration = 0; // Adjust as needed

      setTimeout(() => {
        setAccordionOpen(null);
      }, animationDuration);
    } else {
      setAccordionOpen(null); // reset accordion on category change FUNKAR
    }
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId);
      if (category) {
        const categorySlug = category.name.toLowerCase().replace(/\s+/g, "-");
        navigate(`/product-category/${categorySlug}`);
      }
    } else {
      navigate("/products");
    }
  };

  // Filter products based on category ID from route
  const filteredProducts = useMemo(() => {
    if (selectedCategoryId) {
      return products.filter((product) =>
        product.categories.some(
          (category) => category.id === selectedCategoryId
        )
      );
    } else {
      return products;
    }
  }, [products, selectedCategoryId]);

  const defaultCategoryObject = useMemo(() => {
    if (!categoriesFetched) {
      return null;
    }
    const category = categories.find((category) => category.id === 15);
    // console.log("Default category description:", category?.description); // Log only once
    return category;
  }, [categoriesFetched, categories]); // Recalculate only if 'categories' changes

  return (
    <>
      <TitleSection>Köp våra matpumpor!</TitleSection>
      <ContentSectionNarrow>
        <div>
          <div className="flex max-md:flex-col mt-10 mb-4 max-md:items-center justify-between gap-y-1">
            {/* Filter Buttons */}
            <label className="text-center max-md:min-w-64 lg:min-w-64 checkbox-label py-3 pt-4 px-4 rounded-xl font-sans font-semibold text-xl bg-yellow-custom text-green-custom border-double border-7 border-orange-custom hover:border-solid hover:border-7 hover:border-yellow-custom cursor-pointer">
              <input
                className="opacity-0"
                type="radio"
                name="categories"
                value="22" // Replace with actual category ID
                checked={selectedCategoryId === 22}
                onChange={() => handleCategoryChange(22)}
              />
              <span className="ml-[-0.6rem]">Curcubita Pepo</span>
            </label>

            <label className="text-center max-md:min-w-64 lg:min-w-64 checkbox-label py-3 pt-4 px-4 rounded-xl font-sans font-semibold text-xl bg-yellow-custom text-green-custom border-double border-7 border-orange-custom hover:border-solid hover:border-7 hover:border-yellow-custom cursor-pointer">
              <input
                className="opacity-0"
                type="radio"
                name="categories"
                value="23" // Replace with actual category ID
                checked={selectedCategoryId === 23}
                onChange={() => handleCategoryChange(23)}
              />
              <span className="ml-[-0.6rem]">Curcubita Maxima</span>
            </label>
            <label className="text-center max-md:min-w-64 lg:min-w-64 checkbox-label py-3 pt-4 px-4 rounded-xl font-sans font-semibold text-xl bg-yellow-custom text-green-custom border-double border-7 border-orange-custom hover:border-solid hover:border-7 hover:border-yellow-custom cursor-pointer">
              <input
                className="opacity-0"
                type="radio"
                name="categories"
                value="24" // Replace with actual category ID
                checked={selectedCategoryId === 24}
                onChange={() => handleCategoryChange(24)}
              />
              <span className="ml-[-0.6rem]">Curcubita Moschata</span>
            </label>
          </div>
        </div>
        <div className="flex justify-center text-center">
          <label className="checkbox-label-all cursor-pointer">
            <input
              className="opacity-0"
              type="radio"
              name="categories"
              value="" // Represents "All Categories"
              checked={!selectedCategoryId}
              onChange={() => handleCategoryChange(null)}
            />
            <FormRefresh
              color="plain"
              size="2rem"
              className="ml-[-0.6rem] [&>path]:stroke-yellow-custom-link"
            ></FormRefresh>
            <p>Visa alla</p>
          </label>
        </div>

        <Accordion
          type="single"
          collapsible
          value={accordionOpen as "item-1" | undefined}
          onValueChange={(value) =>
            setAccordionOpen(value as "item-1" | null | undefined)
          }
        >
          {/* <Accordion defaultOpen={!selectedCategoryId}> */}

          <AccordionItem
            value="item-1"
            className="bg-yellow-custom text-green-custom p-4 rounded-xl border-double border-7 border-orange-custom"
          >
            {selectedCategoryObject ? (
              <div>
                <AccordionTrigger>
                  {selectedCategoryObject.name}
                </AccordionTrigger>

                {selectedCategoryObject.description
                  .split("\r\n\r\n")
                  .map((line, index) => (
                    <AccordionContent>
                      <React.Fragment key={index}>
                        <p>{line}</p>
                      </React.Fragment>
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
      </ContentSectionNarrow>

      {loading ? (
        <div className="loaderText">
          <h2>Just a moment. Fetching products...</h2>{" "}
        </div>
      ) : (
        <ul>
          {products ? (
            filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>
                  {product.images?.length > 0 && (
                    <img
                      width="300"
                      src={product.images[0].src}
                      alt="Product banner"
                    />
                  )}
                  <h2>{product.name}</h2>
                  Categories:{" "}
                  <ul>
                    {product.categories.map((category) => (
                      <li key={category.id}>
                        {category.name} {category.id}
                      </li>
                    ))}
                  </ul>
                  <p>Sale price: {product.sale_price}</p>
                  <strong>
                    {product.stock_status === "instock"
                      ? "In stock"
                      : "Out of stock"}
                  </strong>
                </Link>
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      )}
    </>
  );
}

export default Products;
