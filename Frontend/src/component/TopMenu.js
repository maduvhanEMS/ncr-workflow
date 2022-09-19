import React from "react";
import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";

function TopMenu({ handleOpen, open }) {
  return (
    <Header open={open}>
      <IconButton onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
    </Header>
  );
}

export default TopMenu;

const Header = styled.div`
  height: 50px;
  background-color: white;
  display: flex;
`;
