// app/components/Sidebar.js

import React from "react";
import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/img/logo.svg";

export default function Sidebar() {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 300,
          boxSizing: "border-box",
          backgroundColor: "#0d161e",
          color: "#fff",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ padding: "22px" }}>
        <Image src={Logo} alt="Logo" />
        <List>
          <ListItem
            component={Link}
            href="/"
            sx={{
              borderRadius:"4px",
              "&:hover": {
                backgroundColor: "#1e2a34",
              },
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            component={Link}
            href="/post"
            sx={{
              borderRadius:"4px",
              "&:hover": {
                backgroundColor: "#1e2a34",
              },
            }}
          >
            <ListItemText primary="Posts" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
