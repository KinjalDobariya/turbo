"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useSearch } from "./context/SearchContext";
import { Button, SearchField } from "@repo/shared-components";

const Header = () => {
  const { search, setSearch } = useSearch();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          boxShadow:
            "0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "end" }}>
          <SearchField
            data={search}
            handleSearchChange={handleSearchChange}  
          />
          <Button color="inherit" variant="inherit" label="Login" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
