import React from "react";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "../common/TextField";
import { Button } from "../common/Button";

const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  body: z
    .string()
    .trim()
    .min(1, { message: "Body is required" })
    .max(255, { message: "Body must be 255 characters or less" }),
});

export type PostSchema = z.infer<typeof postSchema>;

interface PostFormProps {
  initialValues: PostSchema;
  onSubmit: (data: PostSchema) => void;
  onCancel: () => void;
}

export const PostForm: React.FC<PostFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "end",
          gap: 2,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          label="Save"
          sx={{ width: "70px", textTransform: "capitalize",background:"black" }}
        />
        <Button
          variant="outlined"
          color="error"
          onClick={onCancel}
          label="Cancel"
          sx={{ width: "70px", textTransform: "capitalize" }}
        />
      </Box>
    </form>
  );
};
