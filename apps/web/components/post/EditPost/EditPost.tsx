"use client";

import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useEditPost } from "./hooks/useEditPost";
import { PostForm, PostFormHandles, PostSchema } from "../PostForm";
import { useGetPostById } from "./hooks/useGetPostById";
import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { Get } from "../../../queryKeyFactory/queryKeyFactory";

export const EditPost = ({
  open,
  handleClose,
  postId,
}: {
  open: boolean;
  handleClose: () => void;
  postId: number | null;
}) => {
  const queryClient = useQueryClient();

  const ChildRef = React.useRef<PostFormHandles>(null);

  const { mutate } = useEditPost({
    id: postId,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [Get] });
        handleClose();
      },
    },
  });

  const { data, isLoading } = useGetPostById(postId);

  const handleSubmit = () => {
    ChildRef.current?.submitForm((formValues: PostSchema) => {
      mutate(formValues);
    });
  };

  if (isLoading) {
    return <h1>hello</h1>;
  }

  return (
    <>
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
    </>
  );
};
