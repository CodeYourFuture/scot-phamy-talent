import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { getLoggedInUserData } from "../utils/storage";

export default ({
  visible,
  activeItem,
  handleSidebarHide,
  handleItemClick
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      onHide={handleSidebarHide}
      visible={visible}
      width="thin"
      style={{
        top: "40px"
      }}
    >
      <Menu.Item
        name="Home"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Home"}
        to="/"
      >
        <Icon name="home"></Icon>
        Home
      </Menu.Item>

      <Menu.Item
        name="Opportunities"
        active={activeItem === "Opportunities"}
        onClick={handleItemClick}
        as={Link}
        to="/opportunities"
      >
        <Icon name="clipboard list"></Icon>
        Opportunity List
      </Menu.Item>
      <Menu.Item
        name="ApplicantsList"
        active={activeItem === "ApplicantsList"}
        onClick={handleItemClick}
        as={Link}
        to="/applicants-list"
      >
        <Icon name="clipboard list"></Icon>
        Applicants List
      </Menu.Item>

      <Menu.Item
        name="Opportunity"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Opportunity"}
        to="/create-opportunity"
      >
        <Icon name="idea"></Icon>
        Create Opportunity
      </Menu.Item>

      <Menu.Item
        name="My Profile"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "My Profile"}
        to={{
          pathname: "/applicant-profile",
          state: {
            userId: getLoggedInUserData() && getLoggedInUserData().user.user_id
          }
        }}
      >
        <Icon name="address card outline"></Icon>
        My Profile
      </Menu.Item>

      <Menu.Item
        name="My profile"
        active={activeItem === "My profile"}
        onClick={handleItemClick}
        as={Link}
        to={{
          pathname: "/company-profile/id",
          state: {
            userId: getLoggedInUserData() && getLoggedInUserData().user.user_id
          }
        }}
      >
        <Icon name="cubes" />
        My Profile
      </Menu.Item>
    </Sidebar>
  );
};
