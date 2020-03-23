import React, { Component } from "react";
import { Input, Form } from "semantic-ui-react";

import "./DropsView.css";
import DropCard from "./DropCard";

import { execute, methods } from "../lib/requestUtils";
const { POST } = methods;

export default class DropsView extends Component {
  state = {
    data: [],
    newDropValue: ""
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.keyPressed = this.keyPressed.bind(this);
    this.saveNewDrop = this.saveNewDrop.bind(this);
  }

  componentDidMount() {
    execute("http://localhost:3456/drops")
      .then(res => JSON.parse(res.response))
      .then(data => this.setState({ data: data }));
  }

  handleChange(e) {
    this.setState({
      newDropValue: e.target.value
    });
  }

  keyPressed(e) {
    if (e.key === "Enter") {
      this.saveNewDrop();
      e.target.value = "";
    }
  }

  saveNewDrop() {
    execute(`http://localhost:3456/drop`, POST, {
      message: this.state.newDropValue
    }).then(resp => {
      this.setState({
        data: [...this.state.data, JSON.parse(resp.response)]
      });
    });
  }

  render() {
    return (
      <>
        {this.state.data.map((drop, index) => (
          <DropCard key={index} data={drop} />
        ))}
        <Form>
          <Input
            onChange={this.handleChange}
            onKeyPress={this.keyPressed}
            size="massive"
            fluid
            placeholder="New drop..."
          />
        </Form>
      </>
    );
  }
}
