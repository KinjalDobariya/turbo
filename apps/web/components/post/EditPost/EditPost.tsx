"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useQueryClient } from "@tanstack/react-query";
import { useEditPost } from "./hooks/useEditPost";
import { PostForm, PostFormHandles, PostSchema } from "../PostForm";
import { useGetPostById } from "./hooks/useGetPostById";
import { Button } from "../../common/Button";
import { Stack } from "@mui/material";

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
  const ChildRef = React.useRef<PostFormHandles>(null);
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

  const handleSubmit = () => {
    ChildRef.current?.submitForm((formValues: PostSchema) => {
      mutate(formValues);
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack direction={"column"} gap={2} sx={modalStyle}>
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
          <>
            <PostForm
              ref={ChildRef}
              initialValues={{
                title: data?.title || "",
                body: data?.body || "",
              }}
            />
            
            <Stack direction={"row"} gap={2} sx={{ justifyContent: "end" }}>
              <Button
                type="button"
                variant="contained"
                label="Edit"
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
            </Stack>
          </>
        )}
      </Stack>
    </Modal>
  );
};
