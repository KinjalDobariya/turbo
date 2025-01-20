"use client";
import { useSearch } from "../../context/SearchContext";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useGetProduct } from "./hooks/useGetPost";
import Link from "next/link";
import { Autocomplete, CardBox } from "@repo/shared-components";
import { useGetCategories } from "../hooks/useGetCategories";
import { useState } from "react";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  category: { id: string; name: string }[];
};

type Category = {
  id: string;
  name: string;
};

export const AllProducts = () => {
  const { search } = useSearch();
  const { data: products } = useGetProduct(search);
  console.log("data", products);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  console.log("selectedCategories", selectedCategories);

  const { data: categories } = useGetCategories();

  if (!categories || !products) {
    return null;
  }

  const filteredPosts = products.filter((item: Product) => {
    const matchesCategory =
      selectedCategories.length > 0
        ? selectedCategories.every((cat) =>
            item.category.find((productCat) => productCat.id === cat.id)
          ) && item
        : item;

    return matchesCategory;
  });

  console.log("filteredPosts", filteredPosts);
  const handleCategoryChange = (event: any, newValue: Category[]) => {
    setSelectedCategories(newValue);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
        <Autocomplete
          data={categories}
          value={selectedCategories}
          onChange={handleCategoryChange}
        />
      </Box>
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        {filteredPosts?.map((item: Product) => {
          const { id, title, description, price } = item;
          return (
            <div key={id}>
              <CardBox
                sx={{ width: 275, height: "100%" }}
                actions={
                  <>
                    <Button size="small">Share</Button>
                    <Link href={`/products/${id}`} passHref>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </>
                }
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  component="div"
                  sx={{ wordBreak: "break-all" }}
                >
                  {title?.slice(0, 20)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", wordBreak: "break-all" }}
                >
                  {`${description?.slice(0, 40)}...`}
                </Typography>
                <Typography sx={{ color: "text.secondary", marginTop: "10px" }}>
                  {`$ ${price}`}
                </Typography>
              </CardBox>
            </div>
          );
        })}
      </Stack>
    </>
  );
};
