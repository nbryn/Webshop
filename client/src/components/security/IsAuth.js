import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { authentication } from "../../actions/UserActions";

// Check users access level
export default function(Comp, showPage, admin = null) {
  class IsAuth extends Component {
    state = {
      showPage: true
    };

    // When component is loaded
    componentDidMount() {
      this.props.dispatch(authentication()).then(response => {
        let user = this.props.user.userData;

        // Check if user is logged in
        if (!user.data.authenticated) {
          if (showPage) {
            this.props.history.push("/");
          }
        } else {
          this.setState({
            showPage: false
          });
        }
      });
    }

    render() {
      //Loading Icon
      if (this.state.showPage) {
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
