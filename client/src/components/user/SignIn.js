import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/UserActions";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block",
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    // Prevents default submit action
    event.preventDefault();

    const loginRequest = {
      email: this.state.email,
      password: this.state.password
    };

    // Dispatch login action
    this.props.login(loginRequest, this.props.history);
  }

  // Update state on change
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form
            onSubmit={this.onSubmit}
            className={classes.form}
            autoComplete="off"
          >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                value={this.state.fullName}
                onChange={this.onChange}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Link to="/signup" color="primary">
                Sign Up
              </Link>
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

// Data supplied to connect -> Access trough this.props.user
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const styledComponent = withStyles(styles)(SignIn);

// Connect component to store -> Filter changes -> Provide relevant changes to component
// Provides dispatch as default if no second argument
export default connect(
  mapStateToProps,
  { login }
)(styledComponent);
