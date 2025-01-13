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
        <Image src={Logo} alt="" />
        <List>
          <ListItem component={Link} href="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} href="/post">
            <ListItemText primary="Posts" />
          </ListItem>
          {/* Add more links as needed */}
        </List>
      </div>
    </Drawer>
  );
}
