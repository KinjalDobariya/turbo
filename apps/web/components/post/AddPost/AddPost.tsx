"use client";
import React, { RefObject, useCallback, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useAddPost } from "./hooks/useAddPost";
import { PostForm, PostFormHandles } from "../PostForm";
import { Button, Dialog } from "@repo/shared-components";
import { useGetPost } from "../PostList/hooks/useGetPost";

type AddFormProps = {
  ChildRef: RefObject<PostFormHandles>;
};

export const AddPost = () => {
  const [open, setOpen] = useState(false);
  const ChildRef = useRef<PostFormHandles>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { refetch } = useGetPost("");

  const { mutate } = useAddPost({
    options: {
      onSuccess: () => {
        refetch();
        ChildRef.current?.resetForm();
        handleClose();
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
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          label="Add Post"
          size="small"
          sx={{
            background: "#3ba4e8",
            textTransform: "capitalize",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Create Post
        </Button>
      </Box>

      <Dialog
        open={open}
        handleClose={handleClose}
        title=" Add a New Post"
        actions={
          <Stack direction={"row"} gap={2} justifyContent={"end"}>
            <Button
              type="button"
              variant="contained"
              label="Save"
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
        <AddForm ChildRef={ChildRef} />
      </Dialog>
    </>
  );
};

const AddForm = ({ ChildRef }: AddFormProps) => {
  return (
    <>
      <PostForm ref={ChildRef} />
    </>
  );
};
