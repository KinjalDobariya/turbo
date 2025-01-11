import React, { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {TextField} from "@repo/shared-components"

const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  body: z
    .string()
    .trim()
    .min(1, { message: "Body is required" })
    .max(255, { message: "Body must be 255 characters or less" }),
});

export type PostSchema = z.infer<typeof postSchema>;

export type PostFormHandles = {
  submitForm: (onSubmit: (values: PostSchema) => void) => void;
  resetForm: () => void;
};

type PostFormProps = {
  initialValues: PostSchema;
};

export const PostForm = forwardRef<PostFormHandles, PostFormProps>(
  (props, ref) => {
    const {
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm<PostSchema>({
      resolver: zodResolver(postSchema),
      defaultValues: props.initialValues,
    });

    useImperativeHandle(ref, () => ({
      submitForm(onSubmit) {
        handleSubmit((formValues) => {
          onSubmit(formValues);
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
