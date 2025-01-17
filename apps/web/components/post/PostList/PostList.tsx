"use client"
import React, { useState } from "react";
import Link from "next/link";
import { useGetPost } from "./hooks/useGetPost";
import { EditPost } from "../EditPost/EditPost";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useSearch } from "../../context/SearchContext";
import { AgGrid, Card } from "@repo/shared-components";
import { Box, Stack, Typography } from "@mui/material";
import { DeletePost } from "../DeletePost/DeletePost";
import { ColDef } from "ag-grid-community";

type dataProps = {
  id: number;
  title: string;
  body: string;
};

type filteredPostsProps = {
  id: string;
  title: string;
  body: string;
};

export const GetPost = () => {
  const { search } = useSearch();
  const [open, setOpen] = useState<{
    action: string | null;
    postId: number | null;
  }>({
    action: null,
    postId: null,
  });

  const handleOpen = (action: string, id: number) => {
    setOpen({ action, postId: id });
  };

  const handleClose = () => {
    setOpen({ action: null, postId: null });
  };

  const { data } = useGetPost(search);

  const filteredPosts = data?.filter((item: filteredPostsProps) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase()) ||
      item.id.includes(search)
    );
  });

  const rowData =
    filteredPosts?.map((post: filteredPostsProps) => ({
      id: post.id,
      title: post.title,
      body: post.body,
    })) || [];

  const columnDefs: ColDef[] =
    filteredPosts && filteredPosts.length > 0
      ? Object.keys(filteredPosts[0]).map((key) => ({
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
          field: key,
          flex: 1,
        }))
      : [];

  columnDefs.push({
    headerName: "Actions",
    field: "actions",
    cellRenderer: (params: any) => {
      const { id } = params.data;
      return (
        <Stack direction={"row"} gap={2}>
          <Box onClick={() => handleOpen("edit", id)}>
            <BorderColorIcon fontSize="small" sx={{ color: "blue" }} />
          </Box>
          <Box onClick={() => handleOpen("delete", id)}>
            <DeleteIcon fontSize="small" sx={{ color: "red" }} />
          </Box>
        </Stack>
      );
    },
    flex: 1,
  });

  return (
    <>
      {filteredPosts?.map((item: dataProps, index: number) => {
        const { id, title, body } = item;
        return (
          <div key={index}>
            <Card>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Link href={`/post/${id}`} passHref>
                  <Box
                    sx={{
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      gutterBottom
                      sx={{ fontSize: 14, color: "black" }}
                    >
                      No {id}
                    </Typography>

                    <Typography variant="h6" component="div">
                      {title}
                    </Typography>

                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {body}
                    </Typography>
                  </Box>
                </Link>

                <Stack direction={"row"} gap={2}>
                  <Box onClick={() => handleOpen("edit", id)}>
                    <BorderColorIcon fontSize="small" />
                  </Box>

                  <Box onClick={() => handleOpen("delete", id)}>
                    <DeleteIcon fontSize="small" />
                  </Box>
                </Stack>
              </Stack>
            </Card>
          </div>
        );
      })}

      {open.action === "edit" && open.postId !== null && (
        <EditPost open={true} handleClose={handleClose} postId={open.postId} />
      )}

      {open.action === "delete" && open.postId !== null && (
        <DeletePost
          open={true}
          handleClose={handleClose}
          postId={open.postId}
        />
      )}

      <AgGrid columnDefs={columnDefs} rowData={rowData} />
    </>
  );
};
