import React from "react";
import { Box, Typography, Modal } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useAddPost } from "./hooks/useAddPost";
import { PostForm, PostSchema } from "../PostForm";
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { mutate } = useAddPost({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        handleClose();
      },
    },
  });

  const handleSubmit = (data: PostSchema) => {
    mutate(data);
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
          <PostForm
            initialValues={{ title: "", body: "" }}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
};
