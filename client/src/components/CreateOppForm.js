import React, { Component } from "react";
import {
  Form,
  Input,
  Icon,
  Button,
  TextArea,
  Select,
  Message
} from "semantic-ui-react";
import { getCities } from "../api/cities";
import { getSkills } from "../api/skills";
import { createNewOpprtunity } from "../api/newOpportunity";
import { opportunityType } from "../utils/constants";

class CreateOppForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formEntries: {
        name: "",
        description: "",
        contactPerson: "",
        telephone: "",
        email: "",
        city: Number,
        date: "",
        type: "",
        skills: [],
        company_id: 1
      },
      cities: [],
      skills: [],
      success: null
    };
  }
  getAllskills = () => {
    getSkills().then(response => {
      this.setState({
        skills: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.skill_id
        }))
      });
    });
  };
  getAllCities = () => {
    getCities().then(response => {
      this.setState({
        cities: response.map(city => ({
          key: city.id,
          text: city.city,
          value: city.id
        }))
      });
    });
  };
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, skills: selectedSkill }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, city: selectedCity }
    });
  };
  handleSelectOppType = (e, data) => {
    const selectedOpp = data.value;
    this.setState({
      formEntries: { ...this.state.formEntries, type: selectedOpp }
    });
  };
  componentDidMount() {
    this.getAllCities();
    this.getAllskills();
  }
  handlePost = e => {
    e.preventDefault();
    createNewOpprtunity(this.state.formEntries).then(res =>
      this.setState({ success: true })
    );
  };
  handleChange = e => {
    const newEntryies = this.state.formEntries;
    newEntryies[e.target.name] = e.target.value;
    this.setState({
      formEntries: newEntryies
    });
  };
  render() {
    return (
      <div>
        <Form onSubmit={this.handlePost}>
          <Form.Field
            label="Title"
            control={Input}
            iconPosition="left"
            placeholder="Title"
            required
            name="name"
            onChange={this.handleChange}
          >
            <input />
            <Icon name="pencil alternate" />
          </Form.Field>
          <Form.Field
            label="Description"
            control={TextArea}
            placeholder="opportunity Details"
            name="description"
            required
            onChange={this.handleChange}
          />
          <Form.Group>
            <Form.Field
              control={Input}
              label="Contact Person"
              placeholder="Contact Person"
              iconPosition="left"
              name="contactPerson"
              required
              onChange={this.handleChange}
            >
              <Icon name="user" />
              <input />
            </Form.Field>
            <Form.Field
              control={Input}
              label="Telephon"
              placeholder="Telephon"
              iconPosition="left"
              name="telephone"
              required
              onChange={this.handleChange}
            >
              <Icon name="phone" />
              <input />
            </Form.Field>
            <Form.Field
              control={Input}
              label="e-Mail"
              placeholder="e-Mail"
              iconPosition="left"
              name="email"
              required
              onChange={this.handleChange}
            >
              <Icon name="at" />
              <input />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field
              label="Location"
              control={Select}
              name="city"
              placeholder="Location"
              search
              selection
              required
              options={this.state.cities}
              onChange={this.handleSelectCity}
            />
            <Form.Field
              control={Input}
              label="Expiry Date"
              type="date"
              placeholder="Expiry date"
              iconPosition="left"
              required
              name="date"
              onChange={this.handleChange}
            >
              <Icon name="calendar alternate" />
              <input />
            </Form.Field>
            <Form.Dropdown
              label="Opportunity Type"
              options={opportunityType}
              search
              selection
              required
              placeholder="Type of Opportunity"
              onChange={this.handleSelectOppType}
            />
          </Form.Group>
          <Form.Dropdown
            label="Skills"
            onChange={this.handleSelectSkill}
            options={this.state.skills}
            name="skills"
            multiple
            selection
            required
            placeholder="Select Skills"
          />
          <Button primary>Post</Button>
          {this.state.success === true ? (
            <Message positive>
              <Message.Header>Opportunity submeted</Message.Header>
              <p>opportunity waiting for approval</p>
            </Message>
          ) : null}
        </Form>
      </div>
    );
  }
}

export default CreateOppForm;
