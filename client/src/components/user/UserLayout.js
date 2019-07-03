import React from "react";
import SideBar from "./SideBar";

const UserLayout = props => {
  return (
    <div className="container">
      <SideBar />
      <div className="children">{props.children}</div>
    </div>
  );
};

export default UserLayout;
