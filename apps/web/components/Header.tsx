"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { InputBase, Paper, Stack } from "@mui/material";
import Link from "next/link";
import { Button } from "./common/Button";
import { useSearch } from "./context/SearchContext";

const Header = () => {
  const { search, setSearch } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#000", color: "#fff" }}>
        <Toolbar>
          <Typography variant="h6">TanStack</Typography>
          <Box
            component="div"
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stack direction="row" gap={5}>
              <Link href="/">Home</Link>
              <Link href="/blog">Blog</Link>
              <Link href="/contact">Contact</Link>
            </Stack>
          </Box>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
              width: 260,
              height: "35px",
              background: "transparent",
              border: "1px solid white",
              color: "white",
              borderRadius:"0"
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1, color: "white" }}
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={handleSearchChange}
            />
          </Paper>
          <Button color="inherit" variant="inherit" label="Login" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
