import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Link from "next/link";
import { Button } from "./common/Button";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{backgroundColor:"#000",color:"#fff"}}>
        <Toolbar>
          <Typography variant="h6" sx={{}}>
            TanStack
          </Typography>
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
              <Link href={"/"}>Home</Link>
              <Link href={""}>Blog</Link>
              <Link href={""}>Contact</Link>
            </Stack>
          </Box>
          <Button color="inherit" variant="inherit" label="Login" />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
