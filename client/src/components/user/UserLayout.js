import React from "react";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";

const UserLayout = props => {
  return (
    <div className="container">
      <SideBar />
      <div className="user_right">{props.children}</div>
    </div>
  );
};

export default UserLayout;
