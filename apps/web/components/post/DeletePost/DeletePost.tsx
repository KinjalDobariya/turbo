"use client";

import * as React from "react";
import { Stack } from "@mui/material";
import { Button, Dialog } from "@repo/shared-components";
import { useGetPost } from "../PostList/hooks/useGetPost";
import { useDeletePost } from "../PostList/hooks/useDeletePost";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export const DeletePost = ({
  open,
  handleClose,
  postId,
}: {
  open: boolean;
  handleClose: () => void;
  postId: number | null;
}) => {
  const { refetch } = useGetPost("");
  const { mutate } = useDeletePost({
    options: {
      onSuccess: () => {
        refetch();
        handleClose();
      },
    },
  });

  const handleConfirm = (postId: number | null) => {
    mutate(postId);
  };
  return (
    <>
      <Dialog
        open={open}
        handleClose={handleClose}
        showClose={false}
        actions={
          <Stack
            direction={"row"}
            gap={2}
            sx={{ justifyContent: "end" }}
            paddingBottom={1}
          >
            <Button
              type="button"
              variant="contained"
              label="Confirm"
              sx={{
                width: "70px",
                textTransform: "capitalize",
                background: "red",
              }}
              onClick={() => handleConfirm(postId)}
            />

            <Button
              variant="outlined"
              label="Cancel"
              sx={{
                width: "70px",
                textTransform: "capitalize",
                borderColor: "#a3a5a7",
                color: "#a3a5a7",
              }}
              onClick={handleClose}
            />
          </Stack>
        }
      >
        <Stack direction={"row"} gap={1}>
          <div>
            <ErrorOutlineIcon />
          </div>
          <h3>Are you sure you want to delete this post?</h3>
        </Stack>
      </Dialog>
    </>
  );
};
