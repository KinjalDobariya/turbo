import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Box,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/img/logo.svg";
import menuConfig from "./config/menu";
import { ExpandMore, ExpandLess } from "@mui/icons-material";


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
        <Menu />
      </div>
    </Drawer>
  );
}

export const Menu = () => {
  const [submenuVisibility, setSubmenuVisibility] = useState<
    Record<string, boolean>
  >({});

  const toggleSubmenu = (label: string) => {
    setSubmenuVisibility((prevState) => ({
      ...prevState,
      [label]: !prevState[label],
    }));
  };

  return (
    <List>
      {menuConfig.map((menuItem) => (
        <ListItem key={menuItem.label} disablePadding>
          {menuItem.submenu ? (
            <>
              <Box sx={{ width: "100%" }}>
                <ListItemButton onClick={() => toggleSubmenu(menuItem.label)}>
                  <ListItemText primary={menuItem.label} />
                  {submenuVisibility[menuItem.label] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItemButton>
                {submenuVisibility[menuItem.label] && (
                  <List sx={{ paddingLeft: 2 }}>
                    {menuItem.submenu.map((subItem) => (
                      <ListItem key={subItem.label} disablePadding>
                        <Link href={subItem.path}>
                          <ListItemButton>
                            <ListItemText primary={subItem.label} />
                          </ListItemButton>
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>
            </>
          ) : (
            <Link href={menuItem.path!}>
              <ListItemButton>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  );
};
