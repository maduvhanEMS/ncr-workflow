import React from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";

function Menu() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <TopMenu handleOpen={handleOpen} open={open} />
      <SideMenu open={open} setOpen={setOpen} />
    </div>
  );
}

export default Menu;
