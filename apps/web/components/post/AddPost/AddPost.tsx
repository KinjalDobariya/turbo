"use client";
import React, { useRef } from "react";
import { Box, Typography, Modal } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPost } from "./hooks/useAddPost";
import { PostForm, PostFormHandles, PostSchema } from "../PostForm";
import { Button } from "../../common/Button";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const AddPost = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const ChildRef = useRef<PostFormHandles>(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useAddPost({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        ChildRef.current?.resetForm();
        handleClose();
      },
    },
  });

  const handleSubmit = () => {
    ChildRef.current?.submitForm((formValues: PostSchema) => {
      mutate(formValues);
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button
          label="Add Post"
          size="small"
          sx={{
            background: "#000",
            textTransform: "capitalize",
            color: "white",
          }}
          onClick={handleOpen}
        >
          Create Post
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "black" }}
          >
            Add a New Post
          </Typography>

          <PostForm ref={ChildRef} initialValues={{ title: "", body: "" }} />

          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "end",
              gap: 2,
            }}
          >
            <Button
              type="button"
              variant="contained"
              label="Save"
              sx={{
                width: "70px",
                textTransform: "capitalize",
                background: "black",
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
          </Box>
        </Box>
      </Modal>
    </>
  );
};
