"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { useEditPost } from "./hooks/useEditPost";
import { PostForm, PostSchema } from "../PostForm";
import { useGetPostById } from "./hooks/useGetPostById";

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

  const { mutate } = useEditPost({
    id: postId,
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        handleClose();
      },
    },
  });

  const { data, isLoading } = useGetPostById(postId);

  const handleSubmit = (formData: PostSchema) => {
    if (postId) {
      mutate(formData);
    } else {
      console.error("Post ID is missing.");
    }
  };

  return (
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
          Edit Post
        </Typography>

        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          <PostForm
            initialValues={{
              title: data?.title || "",
              body: data?.body || "",
            }}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        )}
      </Box>
    </Modal>
  );
};
