import React, { Component } from "react";

import {
  Segment,
  Header,
  Grid,
  TextArea,
  Input,
  Form,
  Button,
  Label
} from "semantic-ui-react";

import { execute, types, methods } from "../lib/requestUtils";
let { PUT, DELETE, POST, GET } = methods;

const moment = require("moment");

export default class DropCard extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.toggleOnEditMode = this.toggleOnEditMode.bind(this);
    this.toggleOffEditMode = this.toggleOffEditMode.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleInspectClick = this.handleInspectClick.bind(this);
  }

  componentDidMount() {
    console.log(this.data);
    this.setState({
      _id: this.props.data._id,
      __t: this.props.data.__t,
      createdAt: this.props.data.createdAt,
      updatedAt: this.props.data.updatedAt,
      title: this.props.data.title,
      message: this.props.data.message,
      editMode: false,
      deleted: false
    });
  }

  toggleOnEditMode() {
    console.log("edit mode on");
    this.setState({
      editMode: true
    });
  }

  toggleOffEditMode() {
    console.log("edit mode off");
    this.setState({
      editMode: false
    });
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleMessageChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSave() {
    execute(`http://localhost:3456/drop/${this.data._id}`, PUT, {
      title: this.state.title,
      message: this.state.message
    });
    // put(`http://localhost:3456/drop/${this.state._id}`, types.NOTE, {
    //   title: this.state.title,
    //   message: this.state.message
    // });
    this.toggleOffEditMode();
  }

  async handleDeleteNote() {
    // await del(`http://localhost:3456/drop/${this.state._id}`);
    this.setState({
      deleted: true
    });
    console.log(`http://localhost:3456/drop/${this.data._id}`);
    execute(`http://localhost:3456/drop/${this.data._id}`, DELETE);
  }

  handleInspectClick() {
    console.log(this.state._id);
  }

  render() {
    const styles = {
      titleInput: {
        fontSize: "1.2em",
        fontWeight: "bold",
        marginBottom: "10px"
      },
      title: {
        margin: "0 0 5px 0",
        display: this.state.title === "" ? "none" : "block"
      },
      message: {
        fontSize: "1.4em",
        color: "#999"
      },
      segment: {
        display: this.state.deleted ? "none" : "block"
      },
      dateLabel: {
        color: "gray",
        fontSize: "0.8em",
        margin: "0 0 5px 0",
        textTransform: "uppercase"
      }
    };
    return (
      <Segment onClick={this.handleInspectClick} style={styles.segment} raised>
        <Grid>
          <Grid.Row>
            {this.state.editMode ? (
              <Grid.Column>
                <Form>
                  <Input
                    style={styles.titleInput}
                    placeholder="Title..."
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                  />
                  <TextArea
                    placeholder="Note"
                    value={this.state.message}
                    onChange={this.handleMessageChange}
                    fluid="true"
                  />
                </Form>
                <Button.Group floated="right" style={{ marginTop: "10px" }}>
                  <Button onClick={this.toggleOffEditMode}>Cancel</Button>
                  <Button.Or />
                  <Button positive onClick={this.handleSave}>
                    Save
                  </Button>
                </Button.Group>
              </Grid.Column>
            ) : (
              <>
                <Grid.Column>
                  <span>
                    <p style={styles.dateLabel}>
                      {moment(this.state.createdAt)
                        .subtract(10, "seconds")
                        .fromNow()}
                    </p>
                    <Header style={styles.title} as="h3">
                      {this.state.title}
                    </Header>
                  </span>
                  <p style={styles.message}>{this.state.message}</p>
                  <Button
                    floated="right"
                    onClick={this.toggleOnEditMode}
                    icon="pencil"
                  />
                  <Button
                    negative
                    floated="right"
                    onClick={this.handleDeleteNote}
                    icon="trash"
                  />
                </Grid.Column>
              </>
            )}
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
