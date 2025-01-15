"use client";
import React, { useCallback, useRef, useState } from "react";
import { Box, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPost } from "./hooks/useAddPost";
import { PostForm, PostFormHandles, PostSchema } from "../PostForm";
import { Button, Dialog } from "@repo/shared-components";
import { Get } from "../../../queryKeyFactory/queryKeyFactory";

export const AddPost = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const ChildRef = useRef<PostFormHandles>(null);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const { mutate } = useAddPost({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [Get] });
        ChildRef.current?.resetForm();
        handleClose();
      },
    },
  });

  const handleSubmit = useCallback(() => {
    ChildRef.current?.submitForm((formValues: PostSchema) => {
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
        body={() => {
          return (
            <>
              <PostForm
                ref={ChildRef}
                initialValues={{ title: "", body: "" }}
              />

              <Stack direction={"row"} gap={2} paddingTop={2} justifyContent={"end"}>
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
            </>
          );
        }}
      />
    </>
  );
};
