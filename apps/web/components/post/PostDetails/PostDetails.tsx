"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useGetPostBasicDetails } from "./hooks/useGetPostBasicDetails";

export const PostDetails = () => {
  const params = useParams();
  const id = params.id ? Number(params.id) : null;

  const { data, isLoading, isError } = useGetPostBasicDetails(id);
  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError || !data) {
    return <Typography>Error fetching post.</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        padding: "50px 0",
      }}
      className="container"
    >
      <Box
        sx={{
          minWidth: 275,
          color: "black",
          border: "1px solid gray",
        }}
      >
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 14 }}>
            {data.id}
          </Typography>

          <Typography variant="h6" component="div">
            {data.title}
          </Typography>

          <Typography variant="body2">{data.body}</Typography>
        </CardContent>
      </Box>
    </Box>
  );
};
