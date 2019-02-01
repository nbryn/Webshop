import React from "react";
import SideBar from "./SideBar";
import { connect } from "react-redux";

const UserLayout = props => {
  return (
    <div className="container">
      <SideBar />
      <div className="children">{props.children}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserLayout);
