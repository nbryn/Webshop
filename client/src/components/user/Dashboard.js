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
            <h3>Account Information</h3>
            <div>
              <span>{user.data.fullName} </span>
              <br />
              <span>{user.data.email}</span>
            </div>
            <button type="button" className="btn btn-info">
              <Link to="/user/user_profile" color="primary">
                Edit Info
              </Link>
            </button>
          </div>

          <div className="card">
            <h2>Orders</h2>
            <br />
            <h5>History</h5>
          </div>
        </div>
      </UserLayout>
    );
  }
}

export default Dashboard;
