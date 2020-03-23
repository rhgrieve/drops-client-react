import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

export default class MainMenu extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu size="massive">
        <Menu.Item
          name="drops"
          active={activeItem === "home"}
          onClick={this.handleItemClick}
        >
          <Icon name="tint" />
          Drops
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item
            name="settings"
            active={activeItem === "settings"}
            onClick={this.handleItemClick}
          >
            <Icon name="setting" />
            Settings
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
