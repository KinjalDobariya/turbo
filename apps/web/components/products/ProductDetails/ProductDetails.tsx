"use client";

import * as React from "react";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { Button, Stack } from "@mui/material";
import { useGetProductBasicDetails } from "./hooks/useGetProductBasicDetails";
import { CardBox } from "@repo/shared-components";
import Link from "next/link";

export const ProductDetails = () => {
  const params = useParams();
  const id = params.id ? String(params.id) : null;
  const { data, isLoading, isError } = useGetProductBasicDetails(id);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !data) {
    return <Typography>Error fetching post.</Typography>;
  }

  return (
    <Stack
      direction={"column"}
      gap={2}
      sx={{
        padding: "50px 0",
      }}
      className="container"
    >
      <CardBox
        actions={
          <>
            <Stack direction={"row"}>
              <Link href={`/products/all-products`} passHref>
                <Button size="small">Back</Button>
              </Link>
              <Link href={`/products/add-products`} passHref>
                <Button size="small">Edit</Button>
              </Link>
            </Stack>
          </>
        }
      >
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.description}
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "text.secondary", marginTop: "10px" }}
        >
          {`$ ${data.price}`}
        </Typography>
      </CardBox>
    </Stack>
  );
};
