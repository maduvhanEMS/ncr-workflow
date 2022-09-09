import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";

import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SchemaIcon from "@mui/icons-material/Schema";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";

const menuData = [
  {
    name: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
  },
  {
    name: "Workflow",
    path: "/workflow",
    icon: <SchemaIcon />,
  },
  {
    name: "Register",
    path: "/register",
    icon: <AppRegistrationIcon />,
  },
];

function SideMenu({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Container open={open}>
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
            onClick={handleClose}
          >
            <MenuIcon />
          </IconButton>
        </div>
        <Span />
        <MenuList>
          {menuData.map((item, index) => (
            <MenuItem key={index}>
              <LinkButton to={item.path}>
                <span>{item.icon}</span>
                {item.name}
              </LinkButton>
            </MenuItem>
          ))}
        </MenuList>
      </Container>
      {open && <OverLay onClick={handleClose}></OverLay>}
    </div>
  );
}

export default SideMenu;

const Container = styled.div`
  width: 250px;
  display: ${(props) => (props.open ? "block" : "none")};
  background-color: rgba(255, 255, 255, 1);
  height: 100vh;
  position: absolute;
  z-index: 5;
  box-sizing: border-box;
  transition: all 0.2s ease-in;
  margin-top: -50px;
`;

const OverLay = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  height: 100vh;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 2;
  transition: all 0.2s ease-in;
`;

const Span = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: block;
  margin: 0 2px;
  z-index: 5;
`;

const MenuList = styled.ul`
  list-style: none;
  width: 100%;
`;

const MenuItem = styled.li`
  margin: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 18px;
`;

const LinkButton = styled(Link)`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  span {
    margin-right: 20px;
    align-items: center;
    display: inline-block;
    transform: translate(0px, 6px);
  }
`;
