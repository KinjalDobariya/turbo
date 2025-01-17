"use client";
import { useSearch } from "../../context/SearchContext";
import { Button, Stack, Typography } from "@mui/material";
import { useGetProduct } from "./hooks/useGetPost";
import Link from "next/link";
import { CardBox } from "@repo/shared-components";

type dataProps = {
  id: number;
  title: string;
  description: string;
  price: string;
};

type filteredPostsProps = {
  id: string;
  title: string;
  body: string;
};

export const AllProducts = () => {
  const { search } = useSearch();
  const { data } = useGetProduct(search);
  console.log("data", data);

  const filteredPosts = data?.filter((item: filteredPostsProps) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase()) ||
      item.id.includes(search)
    );
  });

  return (
    <>
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        {filteredPosts?.map((item: dataProps) => {
          const { id, title, description, price } = item;
          return (
            <div key={id}>
              <CardBox
                actions={
                  <>
                    <Button size="small">Share</Button>
                    <Link href={`/products/${id}`} passHref>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </>
                }
              >
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {description.slice(0, 40)}
                </Typography>
                <Typography variant="h6" sx={{ color: "text.secondary" }}>
                  {price}
                </Typography>
              </CardBox>
            </div>
          );
        })}
      </Stack>
    </>
  );
};
