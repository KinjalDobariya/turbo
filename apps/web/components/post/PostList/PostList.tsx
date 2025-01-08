"use client";

import React from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Link from "next/link";
import { useGetPost } from "./hooks/useGetPost";
import { Pagination } from "../../Pagination";
import { useDeletePost } from "./hooks/useDeletePost";
import { useQueryClient } from "@tanstack/react-query";
import { EditPost } from "../EditPost/EditPost";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
interface dataProps {
  id: number;
  title: string;
  body: string;
}
export const GetPost = () => {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const { data } = useGetPost(pageNumber);

  const { mutate } = useDeletePost({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
    },
  });

  return (
    <>
      {data?.map((item: dataProps) => {
        const { id, title, body } = item;

        return (
          <Card
            key={id}
            sx={{
              minWidth: 275,
              background: "#f3f3f3",
              color: "#A9ADB8",
              boxShadow: "inherit",
              borderLeft: "3px solid #000",
              "&:hover": {
                color: "#000",
                borderColor: "#000",
                transition: ".3s",
                marginLeft: "20px",
                cursor: "pointer",
              },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "self-start",
            }}
          >
            <Link href={`/post/${id}`} passHref>
              <CardContent
                sx={{
                  cursor: "pointer",
                }}
              >
                <Typography gutterBottom sx={{ fontSize: 14, color: "black" }}>
                  No {id}
                </Typography>

                <Typography variant="h6" component="div">
                  {title}
                </Typography>

                <Typography variant="body2" sx={{ marginTop: 1 }}>
                  {body}
                </Typography>
              </CardContent>
            </Link>
            <CardActions
              sx={{ display: "flex", justifyContent: "end", padding: "16px" }}
            >
              <Box onClick={() => handleOpen(id)}>
                <BorderColorIcon fontSize="small" />
              </Box>
              <Box onClick={() => mutate(id)}>
                <DeleteIcon fontSize="small" />
              </Box>
            </CardActions>
          </Card>
        );
      })}
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} />
      <EditPost open={open} handleClose={handleClose} postId={selectedId} />
    </>
  );
};
