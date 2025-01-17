import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox, TextField } from "@repo/shared-components";
import { pickBy } from "lodash";
import { useGetCategories } from "./hooks/useGetCategories";
import { Box, Stack } from "@mui/material";

const ProductSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).nullable(),
  description: z
    .string()
    .trim()
    .min(20, { message: "Description is required " })
    .max(255, { message: "Description must be 255 characters or less" })
    .nullable(),
  price: z
    .string()
    .trim()
    .min(1, { message: "Price is required" })
    .regex(/^\d+(\.\d{1,2})?$/, { message: "Invalid price format" })
    .nullable(),
  category: z
    .array(
      z.object({
        id: z.string().uuid(),
        name: z.string(),
      })
    )
    .nullable(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;

export type ProductFormHandles = {
  submitForm: (onSubmit: (formValues: Partial<ProductSchema>) => void) => void;
  resetForm: () => void;
};

type ProductFormProps = {
  initialValues?: ProductSchema;
};

export type CategoryProps = {
  id: string;
  name: string;
};
export const filterChangedFormFields = <T extends FieldValues>(
  allFields: T,
  dirtyFields: Partial<
    Record<keyof T, boolean | boolean[] | Record<string, unknown>>
  >
): Partial<T> => {
  const changedFieldValues = Object.keys(pickBy(dirtyFields)).reduce(
    (acc, currentField) => {
      return {
        ...acc,
        [currentField]: allFields[currentField],
      };
    },
    {} as Partial<T>
  );

  return changedFieldValues;
};

export const ProductForm = forwardRef<ProductFormHandles, ProductFormProps>(
  (
    { initialValues }: ProductFormProps,
    ref: ForwardedRef<ProductFormHandles>
  ) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, dirtyFields },
    } = useForm<ProductSchema>({
      resolver: zodResolver(ProductSchema),
      defaultValues: {
        ...initialValues,
        category: initialValues?.category || [],
      },
    });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          const filterFormValues = filterChangedFormFields(
            formValues,
            dirtyFields
          );
          onSubmit(filterFormValues);
        })();
      },
      resetForm: () => reset({ category: [] }),
    }));

    const { data } = useGetCategories();

    if (!data) {
      return null;
    }

    return (
      <form>
        <Stack direction={"row"} gap={2}>
          <TextField
            control={control}
            label="Title"
            name="title"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            control={control}
            label="Price"
            name="price"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </Stack>
        <Stack direction={"row"} gap={2}>
          <TextField
            control={control}
            label="Description"
            name="description"
            error={!!errors.description}
            helperText={errors.description?.message}
          />
        </Stack>

        <Box sx={{ paddingTop: "10px" }}>
          <Checkbox
            name="category"
            control={control}
            options={data.map((category: CategoryProps) => ({
              id: category.id,
              name: category.name,
            }))}
          />
        </Box>
      </form>
    );
  }
);

ProductForm.displayName = "ProductForm";
