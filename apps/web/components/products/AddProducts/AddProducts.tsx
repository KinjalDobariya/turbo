"use client";
import React, { useCallback, useRef } from "react";
import { Stack } from "@mui/material";
import { Button } from "@repo/shared-components";
import { useAddProducts } from "./hooks/useAddProducts";
import { ProductForm, ProductFormHandles } from "../ProductForm";
import { useGetProduct } from "../AllProducts/hooks/useGetPost";

export const AddProducts = () => {
  const ChildRef = useRef<ProductFormHandles>(null);
  const { refetch } = useGetProduct("");

  const { mutate } = useAddProducts({
    options: {
      onSuccess: () => {
        refetch();
        ChildRef.current?.resetForm();
      },
    },
  });

  const handleSubmit = useCallback(() => {
    ChildRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  }, [mutate]);
  return (
    <>
      <ProductForm ref={ChildRef} />
      <Stack direction={"row"} gap={2} justifyContent={"end"}>
        <Button
          type="button"
          variant="contained"
          label="Add Product"
          sx={{
            textTransform: "capitalize",
            background: "#3ba4e8",
            marginTop:"20px"
          }}
          onClick={handleSubmit}
        />
      </Stack>
    </>
  );
};
