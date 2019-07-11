import React, { Component } from "react";
import UserLayout from "./UserLayout";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  render() {
    let user = this.props.user.userData;
    return (
      <UserLayout>
        <div>
          <div className="card">
            <h4>Account Information</h4>
            <div>
              <span>
                {" "}
                <strong> Name: </strong>
                {user.data.fullName}{" "}
              </span>
              <br />
              <span>
                <strong> Email: </strong> {user.data.email}
              </span>
            </div>
          </div>
          <br />
          <br />
          <div className="card">
            <h4>Order History</h4>
            <br />
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Dashboard;
