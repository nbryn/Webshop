import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { authenticateUser } from "../../actions/UserActions";

// This component checks if user is logged in before showing the component in the UI
export default function(Comp, authRequired, admin = null) {
  class IsAuth extends Component {
    state = {
      loading: true
    };

    componentDidMount() {
      // Run authentication function when component is loaded
      this.props.dispatch(authenticateUser()).then(response => {
        let user = this.props.user.userData;

        // Checks if user is logged in
        if (!user.data.authenticated) {
          if (authRequired) {
            this.props.history.push("/");
            return;
          }
        }
        this.setState({
          loading: false
        });
      });
    }

    render() {
      // Loading Icon
      if (this.state.loading) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2451F3" }} thickness={6} />
          </div>
        );
      }
      return (
        <div>
          <Comp {...this.props} user={this.props.user} />
        </div>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      user: state.user
    };
  };

  return connect(mapStateToProps)(IsAuth);
}
