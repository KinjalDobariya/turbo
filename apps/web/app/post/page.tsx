import { Box } from "@mui/material";
import React from "react";
import { AddPost } from "../../components/post/AddPost/AddPost";
import { GetPost } from "../../components/post/PostList/PostList";

const page = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "50px 0",
        }}
        className="container"
      >
        <AddPost />
        <GetPost />
      </Box>
    </div>
  );
}

export default  page