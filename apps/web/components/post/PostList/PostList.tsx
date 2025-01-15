"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGetPost } from "./hooks/useGetPost";
// import { Pagination } from "../../Pagination";
import { useDeletePost } from "./hooks/useDeletePost";
import { UseMutateFunction, useQueryClient } from "@tanstack/react-query";
import { EditPost } from "../EditPost/EditPost";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useSearch } from "../../context/SearchContext";
import { Get } from "../../../queryKeyFactory/queryKeyFactory";
import { Card } from "@repo/shared-components";   
import { Box, Stack, Typography } from "@mui/material";
import { AxiosResponse } from "axios";

type dataProps = {
  id: number;
  title: string;
  body: string;
};

type PostDataProps = {
  item: dataProps;
  handleOpen: (id: number) => void;
  mutate: UseMutateFunction<AxiosResponse<any, any>, Error, number, unknown>;
};

const PostData = ({ item, handleOpen, mutate }: PostDataProps) => {
  console.log("item", item);
  const { id, title, body } = item;
  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Link href={`/post/${id}`} passHref>
          <Box
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
          </Box>
        </Link>

        <Stack direction={"row"} gap={2}>
          <Box onClick={() => handleOpen(id)}>
            <BorderColorIcon fontSize="small" />
          </Box>

          <Box onClick={() => mutate(id)}>
            <DeleteIcon fontSize="small" />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export const GetPost = () => {
  const { search } = useSearch();
  const queryClient = useQueryClient();
  // const [pageNumber, setPageNumber] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleOpen = (id: number) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedId(null);
  };

  const { data } = useGetPost(search);

  const filteredPosts = data?.filter((item: dataProps) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.body.toLowerCase().includes(search.toLowerCase()) ||
      item.id.includes(search)
    );
  });

  // const postsPerPage = 4;
  // const totalPages = Math.ceil((filteredPosts?.length || 0) / postsPerPage);
  // const paginatedPosts = filteredPosts?.slice(
  //   pageNumber * postsPerPage,
  //   (pageNumber + 1) * postsPerPage
  // );

  const { mutate } = useDeletePost({
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [Get] });
      },
    },
  });

  return (
    <>
      {filteredPosts?.map((item: dataProps, index: number) => {
        return (
          <>
            <div key={index}>
              <Card
                cardBody={
                  <PostData
                    item={item}
                    handleOpen={handleOpen}
                    mutate={mutate}
                  />
                }
              />
            </div>
          </>
        );
      })}
      {/* <Pagination
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        totalPages={totalPages}
      /> */}
      <EditPost open={open} handleClose={handleClose} postId={selectedId} />
    </>
  );
};
