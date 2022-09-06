import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function SideMenu() {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          boxShadow: " 0 0px 5px rgba(0, 0, 0, 0.4)",
          justifyContent: "flex-end",
        }}
      >
        <IconButton
          sx={{
            color: "blue",
            display: "inline-block",
          }}
        >
          <MenuIcon />
        </IconButton>
      </div>
      <Span />
      <MenuList></MenuList>
    </Container>
  );
}

export default SideMenu;

const Container = styled.div`
  width: 250px;
  background-color: rgba(255, 255, 255, 1);
  height: 100vh;
  position: absolute;
  z-index: 5;
  box-sizing: border-box;

  //   &::before {
  //     content: "";
  //     width: 100vw;
  //     background-color: rgba(0, 0, 0, 0.1);
  //     height: 100vh;
  //     bottom: 0;
  //     left: 0;
  //     position: absolute;
  //   }
`;

const Span = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  margin: 0 2px;
`;

const MenuList = styled.ul``;

const MenuItem = styled.li``;
