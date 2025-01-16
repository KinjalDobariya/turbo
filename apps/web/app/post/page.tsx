import { Stack } from "@mui/material";
import React from "react";
import { AddPost } from "../../components/post/AddPost/AddPost";
import { GetPost } from "../../components/post/PostList/PostList";

const page = () => {
  return (
    <div>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          padding: "50px 0",
        }}
      >
        <AddPost />
        <GetPost />
      </Stack>
    </div>
  );
};

export default page;
