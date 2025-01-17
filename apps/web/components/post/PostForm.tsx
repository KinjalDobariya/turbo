import React, { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@repo/shared-components";
import { pickBy } from "lodash";

const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).nullable(),
  body: z
    .string()
    .trim()
    .min(1, { message: "Body is required" })
    .max(255, { message: "Body must be 255 characters or less" })
    .nullable(),
});

export type PostSchema = z.infer<typeof postSchema>;

export type PostFormHandles = {
  submitForm: (onSubmit: (formValues: Partial<PostSchema>) => void) => void;
  resetForm: () => void;
};

type PostFormProps = {
  initialValues?: PostSchema;
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

export const PostForm = forwardRef<PostFormHandles, PostFormProps>(
  ({ initialValues }: PostFormProps, ref: ForwardedRef<PostFormHandles>) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors, dirtyFields },
    } = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      defaultValues: initialValues,
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

      resetForm: () => reset(),
    }));

    return (
      <form>
        <TextField
          control={control}
          label="Title"
          name="title"
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <TextField
          control={control}
          label="Body"
          name="body"
          error={!!errors.body}
          helperText={errors.body?.message}
        />
      </form>
    );
  }
);

PostForm.displayName = "PostForm";
