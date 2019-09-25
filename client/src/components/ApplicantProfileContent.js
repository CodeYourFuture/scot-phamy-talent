import React from "react";
import { Button, Header, Segment, Image, Grid, Icon } from "semantic-ui-react";

export default ({ skills, applicantData }) => {
  return (
    <div>
      <Segment inverted color="blue">
        <Segment inverted color="blue"></Segment>
        <Grid centered>
          <Segment circular centered>
            <Image
              src="https://www.bsn.eu/wp-content/uploads/2016/12/user-icon-image-placeholder-300-grey.jpg"
              size="mini"
              circular
              centered
            />
          </Segment>
        </Grid>
        <Segment inverted color="blue" padded="very">
          <Grid centered>
            <Header as="h1">
              Applicant Name: {applicantData && applicantData.applicant_name}
            </Header>
          </Grid>
          <Grid centered>
            <Header as="h3">{applicantData && applicantData.city}</Header>
          </Grid>
        </Segment>
      </Segment>
      <Grid left stackable columns={2}>
        <Grid.Column>
          <Header as="h3">
            <Icon name="briefcase" size="mini" color="white" />
            About: {applicantData && applicantData.about}
          </Header>
          <br></br>
          <Grid left>
            <Header as="h3">
              <Icon name="map marker alternate" size="mini" color="white" />
              City: {applicantData && applicantData.city}
            </Header>
          </Grid>
          <br></br>
          <br></br>
          <Grid left>
            <Header as="h3">
              Skills:
              {skills &&
                skills.map((skill, index) => <li key={index}>{skill}</li>)}
            </Header>
          </Grid>
          <br></br>
          <br></br>
          <Grid left>
            <Header as="h3">
              <Icon name="mail" size="mini" color="red" />
              Email: {applicantData && applicantData.email}
            </Header>
          </Grid>
          <br></br>
          <br></br>
          <Grid left>
            <Header as="h3">
              <Icon name="linkify" size="mini" color="blue" />
              CV Link: {applicantData && applicantData.cvlink}
            </Header>
          </Grid>
          <br></br>
          <br></br>
          <Grid left>
            <Header as="h3">
              <Icon name="legal" size="mini" color="red" />
              Right to work:{" "}
              {applicantData && applicantData.right_to_work ? "yes" : "No"}
            </Header>
          </Grid>
        </Grid.Column>
      </Grid>

      <Grid centered>
        <Segment basic>
          <a href={`mailto: ${applicantData && applicantData.email}`}>
            <Button primary>Contact</Button>
          </a>
        </Segment>
      </Grid>
    </div>
  );
};
