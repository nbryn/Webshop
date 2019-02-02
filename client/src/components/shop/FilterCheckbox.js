import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class FilterCheckbox extends Component {
  state = {
    show: false,
    checked: []
  };

  componentDidMount() {
    if (this.props.initialState) {
      this.setState({
        show: this.props.initialState
      });
    }
  }

  handleClick() {
    this.setState({
      show: !this.state.show
    });
  }

  renderList = () =>
    this.props.list ? this.props.list.map(val => <ListItem />) : null;

  handleArrow = () =>
    this.state.show ? (
      <FontAwesomeIcon className="icon" />
    ) : (
      <FontAwesomeIcon className="icon" />
    );

  render() {
    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: "1px solid #dbdbdb" }}>
          <ListItem
            onClick={this.handleClick}
            style={{ padding: "10px 23px 10px 0" }}
          >
            <ListItemText
              primary={this.props.title}
              className="collapse_title"
            />
            {this.handleArrow()}
          </ListItem>
          <Collapse in={this.state.show} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {this.renderList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

export default FilterCheckbox;
