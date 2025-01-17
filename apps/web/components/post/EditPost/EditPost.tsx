"use client";

import { useEditPost } from "./hooks/useEditPost";
import { PostForm, PostFormHandles } from "../PostForm";
import { useGetPostById } from "./hooks/useGetPostById";
import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { useGetPost } from "../PostList/hooks/useGetPost";
import { useRef } from "react";

export const EditPost = ({
  open,
  handleClose,
  postId,
}: {
  open: boolean;
  handleClose: () => void;
  postId: number | null;
}) => {
  const ChildRef = useRef<PostFormHandles>(null);

  const { refetch } = useGetPost("");

  const { mutate } = useEditPost({
    id: postId,
    options: {
      onSuccess: () => {
        refetch();
        handleClose();
      },
    },
  });

  const { data } = useGetPostById(postId);

  const handleSubmit = () => {
    ChildRef.current?.submitForm((formValues) => {
      mutate(formValues);
    });
  };

  if (!data) {
    return <h1>Loading...</h1>;
  }

  return (
    <Dialog
      open={open}
      handleClose={handleClose}
      title="Edit Post"
      actions={
        <Stack direction={"row"} gap={2} sx={{ justifyContent: "end" }}>
          <Button
            type="button"
            variant="contained"
            label="Edit"
            sx={{
              width: "70px",
              textTransform: "capitalize",
              background: "#3ba4e8",
            }}
            onClick={handleSubmit}
          />

          <Button
            variant="outlined"
            color="error"
            label="Cancel"
            sx={{ width: "70px", textTransform: "capitalize" }}
            onClick={handleClose}
          />
        </Stack>
      }
    >
      <PostForm
        ref={ChildRef}
        initialValues={{
          title: data?.title ?? "",
          body: data?.body ?? "",
        }}
      />
    </Dialog>
  );
};
