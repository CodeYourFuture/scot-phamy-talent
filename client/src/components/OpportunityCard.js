import React from "react";
import { Icon, Card, Button, Divider } from "semantic-ui-react";
import moment from "moment";
export default ({
  opportunity,
  options,
  handleDeleteOpportunity,
  handleEditOpportunity
}) => (
  <Card centered raised color="blue">
    <Card.Content>
      <Card.Header>{opportunity.opportunity_title}</Card.Header>
      <Card.Content textAlign="left">
        contact Person: {opportunity.contact_person}
      </Card.Content>
      <Card.Meta textAlign="right">
        <Icon name="calendar times" color="red"></Icon>
        {moment(opportunity.date).format("DD MMM YYYY")}{" "}
      </Card.Meta>
    </Card.Content>
    <Card.Content>
      <Card.Description
        style={{
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          overflow: "hidden"
        }}
      >
        {opportunity.description}
      </Card.Description>
      {options && (
        <Card.Content extra>
          <Divider></Divider>
          <div className="ui two buttons">
            <Button basic color="green" onClick={handleEditOpportunity}>
              Edit
            </Button>
            <Button basic color="red" onClick={handleDeleteOpportunity}>
              Delete
            </Button>
          </div>
        </Card.Content>
      )}
    </Card.Content>
  </Card>
);
