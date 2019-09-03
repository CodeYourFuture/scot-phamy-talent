import React from "react";
import { Link } from "react-router-dom";
import { Sidebar, Menu, Icon } from "semantic-ui-react";

export default ({
  visible,
  handleSidebarHide,
  activeItem,
  handleItemClick,
  logout
}) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      onHide={handleSidebarHide}
      vertical
      visible={visible}
      width="thin"
      style={{
        top: "50px"
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
      </Menu.Item>
      <Menu.Item
        name="About"
        onClick={handleItemClick}
        active={activeItem === "About"}
        as={Link}
        to="/about"
      >
        <Icon name="adn"></Icon>
      </Menu.Item>
      <Menu.Item
        name="Status"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Status"}
        to="/status"
      >
        <Icon name="star outline"></Icon>
      </Menu.Item>
      <Menu.Item
        name="Create Opportunity"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Create Opportunity"}
        to="/create-opportunity"
      >
        <Icon name="star outline"></Icon>
      </Menu.Item>
      <Menu.Item
        name="company-profile"
        active={activeItem === "company-profile"}
        onClick={handleItemClick}
        as={Link}
        to="/company-profile"
      />
      <Menu.Item
        name="Applicant Profile"
        onClick={handleItemClick}
        as={Link}
        active={activeItem === "Applicant Profile"}
        to="/applicant-profile"
      />
      {localStorage.getItem("token") ? (
        <Menu.Item
          name="Logout"
          active={activeItem === "Logout"}
          onClick={event => {
            logout(event);
            handleItemClick(event);
          }}
          as={Link}
          position="right"
          to="/logout"
        >
          <Icon name="log out"></Icon>
          Logout
        </Menu.Item>
      ) : (
        <Menu.Menu position="right">
          <Menu.Item
            name="Sign In"
            active={activeItem === "Sign In"}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          >
            <Icon name="sign-in"></Icon>{" "}
          </Menu.Item>
          <Menu.Item
            name="Main register"
            active={activeItem === "Main register"}
            onClick={handleItemClick}
            as={Link}
            to="/main-register"
          >
            <Icon name="signup"></Icon>
            Sign up
          </Menu.Item>
        </Menu.Menu>
      )}
    </Sidebar>
  );
};
