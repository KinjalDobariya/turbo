"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useGetPostBasicDetails } from "./hooks/useGetPostBasicDetails";
import { Button } from "@/components/common/Button";

export const PostDetails = () => {
  const { id } = useParams();

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
      <Card
        sx={{
          minWidth: 275,
          background: "#f3f3f3",
          color: "white",
          borderLeft: "1px solid #1976d2",
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
      </Card>
    </Box>
  );
};
