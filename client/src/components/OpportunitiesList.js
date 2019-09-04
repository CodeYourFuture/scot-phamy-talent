import React, { Component } from "react";
import {
  Grid,
  Header,
  Input,
  Dropdown,
  Form,
  Icon,
  Card,
  Image,
  Divider
} from "semantic-ui-react";
import { getOpportunitiesForList, getSkillsList } from "../api/opportunities";
import { getSkills } from "../api/skills";
import { getCities } from "../api/cities";

class OpportunitiesList extends Component {
  state = {
    selectedCity: [],
    searchKeyWord: "",
    selectedJobType: "",
    opportunitiesList: [],
    selectedOpportunity: "",
    cities: [],
    skills: [],
    selectedSkills: []
  };
  // Get data
  getAllSkills = () => {
    getSkills().then(response => {
      this.setState({
        skills: response.map(skill => ({
          key: skill.skill_id,
          text: skill.name,
          value: skill.name,
          content: skill.name
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
          value: city.city,
          content: city.city
        }))
      });
    });
  };
  // get the opportunities array
  getOpportunities = () => {
    getOpportunitiesForList().then(data =>
      data.forEach(opportunity => {
        getSkillsList(opportunity.opportunity_id).then(data => {
          const skills = data && data.map(result => result && result.skill);
          this.setState({
            opportunitiesList: [
              ...this.state.opportunitiesList,
              { ...opportunity, skills }
            ]
          });
        });
      })
    );
  };

  componentDidMount() {
    this.getOpportunities();
    this.getAllCities();
    this.getAllSkills();
  }
  // handlers
  handleItemClick = name => this.setState({ selectedJobType: name });

  handleSelectSkill = (e, data) => {
    const selectedSkill = data.value;
    this.setState({
      selectedSkills: selectedSkill
    });
  };
  handleSelectOpportunity = e => {
    const selectedOpportunityId = e.target.name;
    this.setState({
      selectedOpportunity: selectedOpportunityId
    });
  };
  handleSelectCity = (e, data) => {
    const City = data.value;
    this.setState({
      selectedCity: City
    });
  };
  handleChangeSearchKeyWord = e => {
    const searchKeyWord = e.target.value;
    this.setState({
      ...this.state,
      searchKeyWord: searchKeyWord
    });
  };
  filterOpportunities = () => {
    const {
      selectedCity,
      searchKeyWord,
      selectedJobType,
      opportunitiesList,
      selectedSkills
    } = this.state;
    if (!selectedCity && !selectedJobType && searchKeyWord) {
      return opportunitiesList.filter(opportunity => {
        return (
          (opportunity.description &&
            opportunity.description
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase())) ||
          (opportunity.opportunity_title &&
            opportunity.opportunity_title
              .toLowerCase()
              .includes(searchKeyWord.toLowerCase()))
        );
      });
    }
    if (selectedCity && !selectedJobType) {
      return opportunitiesList.filter(opportunity => {
        return selectedCity.includes(opportunity.location);
      });
    }
    if (!selectedCity && selectedJobType) {
      return opportunitiesList.filter(opportunity => {
        return opportunity.type === selectedJobType;
      });
    }
    if (selectedCity && selectedJobType) {
      return opportunitiesList.filter(opportunity => {
        return (
          opportunity.type === selectedJobType &&
          selectedCity.includes(opportunity.location)
        );
      });
    }
    if (!selectedCity && !selectedJobType && selectedSkills.length) {
      return opportunitiesList.filter(opportunity => {
        return selectedSkills.some(skill => {
          return opportunity.skills.includes(skill);
        });
      });
    }
    if (selectedCity && selectedJobType && selectedSkills.length) {
      return opportunitiesList.filter(opportunity => {
        return (
          opportunity.type === selectedJobType &&
          opportunity.selectedCity === selectedCity &&
          selectedSkills.some(skill => {
            return opportunity.skills.includes(skill);
          }).length
        );
      });
    }

    return opportunitiesList;
  };
  render() {
    console.log(this.state.selectedCity);
    const { searchKeyWord, cities, skills } = this.state;
    return (
      <div>
        <Form>
          <Form.Field
            control={Input}
            placeholder="What are you looking for ?"
            value={searchKeyWord}
            name="search"
            iconPosition="right"
            onChange={this.handleChangeSearchKeyWord}
          >
            <Icon name="search" color="blue" />
            <input />
          </Form.Field>

          <Header as="h4">
            <Icon name="map marker alternate" size="large" color="blue" />
            <Header.Content>
              Location{" "}
              <Dropdown
                inline
                header="Location"
                onChange={this.handleSelectCity}
                options={cities}
                multiple
                defaultValue="Glasgow"
              />
            </Header.Content>
          </Header>
          <Header as="h4">
            <Icon name="check" size="large" color="blue" />
            <Header.Content>
              Skills{" "}
              <Dropdown
                inline
                header="SKills"
                onChange={this.handleSelectSkill}
                options={skills}
                onClose={this.filteringOpportunitiesBySkills}
                multiple
                defaultValue="JavaScript"
              />
            </Header.Content>
          </Header>
        </Form>
        <Header textAlign="left">Job Type</Header>

        <Grid columns={3} centered>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Full time")}
              style={
                this.state.selectedJobType === "Full time"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="briefcase" size="large" color="blue" />
              <Header as="h4"> Full time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Volunteer")}
              style={
                this.state.selectedJobType === "Volunteer"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="hand paper" size="large" color="blue" />
              <Header as="h4"> Volunteer</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Internship")}
              style={
                this.state.selectedJobType === "Internship"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="handshake outline" size="large" color="blue" />
              <Header as="h4"> Internship</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Part Time")}
              style={
                this.state.selectedJobType === "Part Time"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Part Time</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Apprenticeship")}
              style={
                this.state.selectedJobType === "Apprenticeship"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="certificate" size="large" color="blue" />
              <Header as="h5"> Apprenticeship</Header>
            </Grid.Column>
            <Grid.Column
              textAlign="center"
              onClick={() => this.handleItemClick("Work Experience")}
              style={
                this.state.selectedJobType === "Work Experience"
                  ? { backgroundColor: "lightGrey" }
                  : null
              }
            >
              <Icon name="chart pie" size="large" color="blue" />
              <Header as="h4"> Work Experience</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider>
          <br></br>
        </Divider>
        <br />
        <Grid>
          {this.filterOpportunities().map((opportunity, index) => (
            <Card
              centered
              key={index}
              raised
              color="blue"
              onClick={this.handleSelectOpportunity}
              name={opportunity.opportunity_id}
            >
              <Card.Content>
                <Image
                  floated="right"
                  size="mini"
                  name={opportunity.opportunity_id}
                >
                  <Icon
                    name="ellipsis vertical"
                    color="blue"
                    onClick={this.handleSelectOpportunity}
                  ></Icon>
                </Image>
                <Card.Header>{opportunity.opportunity_title}</Card.Header>
                <Card.Content textAlign="left">
                  contact Person: {opportunity.contact_person}
                </Card.Content>
                <Card.Meta textAlign="left">
                  Expire at:{opportunity.date}{" "}
                </Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>{opportunity.description}</Card.Description>
              </Card.Content>
            </Card>
          ))}
        </Grid>
      </div>
    );
  }
}

export default OpportunitiesList;
