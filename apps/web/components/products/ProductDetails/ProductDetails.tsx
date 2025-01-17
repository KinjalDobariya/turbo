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
  const id = params.id ? Number(params.id) : null;

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
            <Link href={`/products/all-products`} passHref>
              <Button size="small">Back</Button>
            </Link>
          </>
        }
      >
        <Typography gutterBottom variant="h5" component="div">
          {data.title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {data.title}
        </Typography>
        <Typography variant="h6" sx={{ color: "text.secondary" }}>
          {data.price}
        </Typography>
      </CardBox>
    </Stack>
  );
};
