import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { authentication } from "../../actions/userActions";

// Check users access level
export default function(Component, show, admin = null) {
  class IsAuth extends Component {
    state = {
      show: true
    };

    // When component is loaded
    componentDidMount() {
      this.props.dispatch(authentication()).then(response => {
        let user = this.props.user.userData;

        console.log(user);
      });

      this.setState({
        show: false
      });
    }

    render() {
      //Loader Icon
      if (this.state.show) {
        return (
          <div className="main_loader">
            <CircularProgress style={{ color: "#2451F3" }} thickness={6} />
          </div>
        );
      }
      return (
        <div>
          <Component {...this.props} user={this.props.user} />
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
