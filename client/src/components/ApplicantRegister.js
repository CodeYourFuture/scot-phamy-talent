import React, { Component } from "react";
import {
  Header,
  TextArea,
  Form,
  Icon,
  Input,
  Grid,
  Checkbox,
  Modal,
  Message,
  Button
} from "semantic-ui-react";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";
import { createNewApplicantUserAndProfile } from "../api/applicantProfile";
import Password from "./Password";

import validatePassword from "../utils/passwordValidation";

const ValidatedFormField = props => {
  return (
    <Form.Field {...props}>
      {props.children}
      {props.valid === false && <p>{props.validationMessage}</p>}
    </Form.Field>
  );
};
class ApplicantRegister extends Component {
  state = {
    applicantEntries: {
      role: "applicant",
      name: "",
      email: "",
      about: "",
      password: "",
      city: null,
      skills: [],
      cvLink: "",
      value: null
    },
    successServerStatus: false,
    openSubmitStatusMsg: false,
    skillsData: [],
    citiesData: [],
    checkboxErr: false,
    formErrors: {}
  };

  //Getting Data
  getAllCities = () => {
    getCities().then(response => {
      this.setState({
        citiesData: response.map(city => ({
          key: city.id,
          text: city.city,
          value: city.id
        }))
      });
    });
  };
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skillsData: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.skill_id
        }))
      });
    });
  };
  componentDidMount() {
    this.getAllSkills();
    this.getAllCities();
  }
  //Handlers
  handleClose = () => this.setState({ openSubmitStatusMsg: false });
  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      applicantEntries: {
        ...this.state.applicantEntries,
        skills: selectedSkill
      }
    });
  };
  handleSelectCity = (e, data) => {
    const selectedCity = data.value;
    this.setState({
      applicantEntries: { ...this.state.applicantEntries, city: selectedCity }
    });
  };
  handleChange = event => {
    const { target } = event;
    const { name: property, value } = target;
    this.setState(function(prevState) {
      const newEntries = prevState.applicantEntries;
      newEntries[property] = value;
      return { applicantEntries: newEntries };
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const result = validatePassword(this.state.applicantEntries);
    const { valid } = result;
    // const valid = result.valid

    if (valid) {
      createNewApplicantUserAndProfile(this.state.applicantEntries).then(
        res => {
          this.setState({ successServerStatus: res.success });
          if (this.state.successServerStatus) {
            this.setState({ openSubmitStatusMsg: true });
            this.clearForm();
          }
        }
      );
    } else {
      this.setState({ formErrors: result });
    }
  };

  handleChangeCheckBox = (e, { value }) =>
    this.setState({
      applicantEntries: {
        ...this.state.applicantEntries,
        value
      },
      checkboxErr: false
    });
  // Clear Form Entries after successServerStatus
  clearForm = e => {
    this.setState({
      applicantEntries: {
        role: "applicant",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        about: "",
        city: null,
        skills: [],
        cvLink: "",
        value: null,
        checked: null
      }
    });
  };
  getPassword = password => {
    console.log("====>>>>>", password);
    return this.setState({
      applicantEntries: { ...this.state.applicantEntries, password }
    });
  };

  render() {
    console.log(this.state.applicantEntries);
    const {
      name,
      email,
      about,
      city,
      skills,
      cvLink,
      value
    } = this.state.applicantEntries;
    console.log(this.state.applicantEntries.password);

    return (
      <div>
        <Form onSubmit={this.handleSubmit} validate>
          <Grid centered stackable columns={2}>
            <Grid.Row>
              <Grid.Column>
                <Header as="h1" textAlign="center">
                  {" "}
                  Applicant Registration
                </Header>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row centered>
              <Grid.Column>
                <ValidatedFormField
                  valid={this.state.formErrors.nameValid}
                  validationMessage="NAME IS NOT VALID"
                  control={Input}
                  label="Name"
                  placeholder="Name"
                  value={name}
                  iconPosition="left"
                  name="name"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="user" color="blue" />
                  <input />
                </ValidatedFormField>
                <Form.Field
                  control={Input}
                  label="Email"
                  value={email}
                  type="email"
                  placeholder="Email"
                  iconPosition="left"
                  name="email"
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="at" color="blue" />
                  <input />
                </Form.Field>
                <Password getPassword={this.getPassword} />
                <Form.Field
                  label="About me"
                  control={TextArea}
                  placeholder="About me"
                  name="about"
                  value={about}
                  required
                  onChange={this.handleChange}
                />
                <Form.Dropdown
                  label="Location"
                  name="city"
                  placeholder="Select city"
                  search
                  selection
                  required
                  value={city}
                  options={this.state.citiesData}
                  onChange={this.handleSelectCity}
                />
                <Form.Dropdown
                  label="Skills"
                  onChange={this.handleSelectSkill}
                  options={this.state.skillsData}
                  name="skills"
                  value={skills}
                  multiple
                  selection
                  required
                  placeholder="Select Skills"
                />

                <Form.Field
                  control={Input}
                  label="Link To External CV"
                  placeholder="Link To External CV"
                  iconPosition="left"
                  name="cvLink"
                  value={cvLink}
                  required
                  onChange={this.handleChange}
                >
                  <Icon name="linkify" color="blue" />
                  <input />
                </Form.Field>
                <Header as="h4">Do you have the right to work? </Header>
                <Form.Group inline required>
                  {" "}
                  <Form.Field>
                    <Checkbox
                      label="Yes"
                      name="radioGroup"
                      value="Yes"
                      checked={value === "Yes"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      label="No"
                      name="radioGroup"
                      value="No"
                      checked={value === "No"}
                      onChange={this.handleChangeCheckBox}
                    />
                  </Form.Field>
                  {this.state.checkboxErr ? (
                    <Message> you have to choose</Message>
                  ) : null}
                </Form.Group>
                <Form.Button fluid lapel="Submit" primary>
                  Sign Up
                </Form.Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          {this.state.successServerStatus === true && (
            <Modal
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleClose}
              closeIcon
              basic
              size="small"
            >
              <Modal.Header> Request Submitted successfully</Modal.Header>
              <Modal.Content>
                <p>Waiting For approval</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  positive
                  icon="checkmark"
                  labelPosition="right"
                  content="OK"
                  onClick={this.handleClose}
                />
              </Modal.Actions>
            </Modal>
          )}
          {this.state.successServerStatus === false && (
            <Modal
              basic
              open={this.state.openSubmitStatusMsg}
              onClose={this.handleClose}
              closeIcon
            >
              <Modal.Header> Something went Wrong</Modal.Header>
              <Modal.Content>
                <p>check Your Data</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  negative
                  icon="checkmark"
                  labelPosition="right"
                  content="OK"
                  onClick={this.handleClose}
                />
              </Modal.Actions>
            </Modal>
          )}
        </Form>
      </div>
    );
  }
}

export default ApplicantRegister;
