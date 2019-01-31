import React, { Component } from "react";
import PropTypes from "prop-types";
import UserLayout from "./UserLayout";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    return (
      <UserLayout>
        <div>
          <div className="card">
            <h3>User</h3>
            <div>
              <span>Name</span>
              <br />
              <span>Email</span>
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

Dashboard.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Dashboard);
