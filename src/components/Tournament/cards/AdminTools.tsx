import React, { Component } from 'react';
import {
  ExpansionPanel,
  ExpansionPanelActions,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Typography,
  TextField
} from 'material-ui';
import KeyboardArrowLeftIcon from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from 'material-ui-icons/KeyboardArrowRight';
import { DatePicker } from 'material-ui-pickers';
import { graphql, ChildProps } from 'react-apollo';
import gql from 'graphql-tag';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import * as moment from 'moment';

import { Event, User } from '../../../core/types';

const styles = {
  input: {
    width: '100%'
  },
  dateInput: {
    maxWidth: 200,
    marginTop: 8,
    marginRight: 8
  }
}

interface Props {
  event: Event;
  user: User;
  update?: (eventId: string, data: any) => void;
}

interface State {
  name: string;
  description: string;
  address: string;
  start: Date;
  end: Date;
}

interface Response {
  updateEvent?: Event;
}

class AdminTools extends Component<ChildProps<Props, Response>, State> {

  constructor(props) {
    super(props);
    let address;
    if (props.event.location) {
      address = props.event.location.address;
    }
    this.state = {
      name: props.event.name,
      description: props.event.description,
      address,
      start: props.event.start,
      end: props.event.end
    };
  }

  handleChange(event, name) {
    this.setState({
      [name]: event.target.value,
    });
  }

  handleDateChange(date, name) {
    this.setState({
      [name]: date
    });
  }

  save() {
    this.props.update(this.props.event.id, {
      name: this.state.name,
      description: this.state.description,
      location: {
        address: this.state.address
      },
      start: this.state.start,
      end: this.state.end
    });
  }
  
  render() {
    const { event, user } = this.props;
    let isAdmin = false;
    if (event.admins && user) {
      for (let i = 0; i < event.admins.length; i++) {
        if (event.admins[i].id === user.id) isAdmin = true;
      }
    }
    let adminTools;
    if (isAdmin) {
      return (
        <ExpansionPanel style={{ marginLeft: 16, marginRight: 16, marginBottom: 16 }}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="title">Admin Tools</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div style={{ display: 'block' }}>
              <TextField
                id="name"
                label="Event Name"
                margin="normal"
                value={this.state.name}
                onChange={(e) => this.handleChange(e, 'name')}
                style={styles.input}
              />
              <TextField
                id="name"
                label="Event Description"
                multiline
                rowsMax="5"
                margin="normal"
                value={this.state.description}
                onChange={(e) => this.handleChange(e, 'description')}
                style={styles.input}
              />
              <TextField
                id="name"
                label="Event Address"
                margin="normal"
                value={this.state.address}
                onChange={(e) => this.handleChange(e, 'address')}
                style={styles.input}
              />
              <DatePicker
                keyboard
                clearable
                label="Start Date"
                maxDateMessage="Date must be less than today"
                value={this.state.start}
                style={styles.dateInput}
                leftArrowIcon={<KeyboardArrowLeftIcon/>}
                rightArrowIcon={<KeyboardArrowRightIcon/>}
                onChange={(d) => this.handleDateChange(d, 'start')}
                animateYearScrolling={false}
              />
              <DatePicker
                keyboard
                clearable
                label="End Date"
                maxDateMessage="Date must be less than today"
                value={this.state.end}
                style={styles.dateInput}
                leftArrowIcon={<KeyboardArrowLeftIcon/>}
                rightArrowIcon={<KeyboardArrowRightIcon/>}
                onChange={(d) => this.handleDateChange(d, 'end')}
                animateYearScrolling={false}
              />
              <Button>Edit Teams</Button>
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button size="small">Cancel</Button>
            <Button size="small" color="primary" onClick={() => this.save()}>
              Save
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      );
    } else {
      return null;
    }
  }
}

export default graphql<Response, Props>(gql`
  mutation UpdateEvent($eventId: String!, $data: UpdateEventInput!) {
    updateEvent(id: $eventId, input: $data) {
      id
      name
      description
      location {
        address
      }
      admins {
        id
      }
    }
  }
`, {
  props: ({ mutate }) => ({
    update: (eventId, data) => mutate({ variables: { eventId, data } }),
  })
})(AdminTools);