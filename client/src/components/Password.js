import React, { Component } from "react";
import { Form, Icon, Input, Message } from "semantic-ui-react";

export default class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passwords: {
        Password: "",
        confirmPassword: ""
      },
      passwordValidation: {
        lengthValid: false,
        matching: false,
        active: false,
        eightCharactersColor: "red",
        matchColor: "red",
        containUppercaseColor: "red",
        containLowercaseColor: "red",
        containNumberColor: "red",
        containUppercase: false,
        containLowercase: false,
        containNumber: false
      }
    };
  }
  isPasswordValid = () => {
    return this.state.passwordValidation.lengthValid &&
      this.state.passwordValidation.matching &&
      this.state.passwordValidation.containUppercase &&
      this.state.passwordValidation.containLowercase &&
      this.state.passwordValidation.containNumber
      ? this.props.getPassword(this.state.passwords.password)
      : alert("error in password");
  };
  handleChange = e => {
    const property = e.target.name;
    const value = e.target.value;
    // this.props.getPassword(value);
    this.setState(function(prevState) {
      const newEntries = prevState.passwords;
      newEntries[property] = value;
      return { passwords: newEntries };
    });
  };
  passwordValidation = (password, confirmPassword) => {
    this.isActive(this.state.passwords.password);
    this.isPasswordMatch(password, confirmPassword);
    this.isConfirmNumber(password, confirmPassword);
    this.isConfirmLowercase(password, confirmPassword);
    this.isPasswordTooShort(password, confirmPassword);
    this.isConfirmUppercase(password, confirmPassword);
  };

  isActive = password => {
    if (password.length > 0) {
      this.setState({
        passwordValidation: { ...this.state.passwordValidation, active: true }
      });
    }
  };
  isPasswordTooShort = (password, confirmPassword) => {
    if (password.length >= 6 && confirmPassword.length >= 6) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          lengthValid: true,
          eightCharactersColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          lengthValid: false,
          eightCharactersColor: "red"
        }
      });
    }
  };
  isPasswordMatch = (password, confirmPassword) => {
    if (password === confirmPassword) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          matching: true,
          matchColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          matching: false,
          matchColor: "red"
        }
      });
    }
  };
  isConfirmUppercase = (password, confirmPassword) => {
    if (
      this.isPasswordContainUpperCase(password) &&
      this.isPasswordContainUpperCase(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containUppercase: true,
          containUppercaseColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containUppercase: false,
          containUppercaseColor: "red"
        }
      });
    }
  };
  isConfirmLowercase = (password, confirmPassword) => {
    if (
      this.isPasswordContainLowerCase(password) &&
      this.isPasswordContainLowerCase(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containLowercase: true,
          containLowercaseColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containLowercase: false,
          containLowercaseColor: "red"
        }
      });
    }
  };
  isConfirmNumber = (password, confirmPassword) => {
    if (
      this.isPasswordContainNumber(password) &&
      this.isPasswordContainNumber(confirmPassword)
    ) {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containNumber: true,
          containNumberColor: "green"
        }
      });
    } else {
      return this.setState({
        passwordValidation: {
          ...this.state.passwordValidation,
          containNumber: false,
          containNumberColor: "red"
        }
      });
    }
  };
  isPasswordContainLowerCase = password => {
    const newReg = /(?=.*[a-z])[a-z]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isPasswordContainUpperCase = password => {
    const newReg = /(?=.*[A-Z])[A-Z]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isPasswordContainNumber = password => {
    const newReg = /(?=.*[0-9])[0-9]/g;
    const pas = newReg.test(password);

    return pas;
  };
  isCheckBoxChecked = () => {
    if (this.state.value !== "Yes" || this.state.value !== "No") {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const { password, confirmPassword } = this.state.passwords;
    const {
      active,
      eightCharactersColor,
      matchColor,
      containUppercaseColor,
      containLowercaseColor,
      containNumberColor
    } = this.state.passwordValidation;
    console.log(this.state.passwords);
    return (
      <Form onSubmit={this.isPasswordValid}>
        <Form.Field
          control={Input}
          label="Password"
          value={password}
          type="password"
          placeholder="Password"
          iconPosition="left"
          name="password"
          //   onKeyUp={this.props.getPassword(password)}
          required
          onChange={this.handleChange}
        >
          <Icon name="lock" color="blue" />
          <input />
        </Form.Field>

        <Form.Field
          control={Input}
          label="Confirm Password"
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          iconPosition="left"
          name="confirmPassword"
          required
          onKeyUp={() =>
            setTimeout(() => {
              this.passwordValidation(password, confirmPassword);
            }, 50)
          }
          onChange={this.handleChange}
        >
          <Icon name="undo alternate" color="blue" />
          <input />
        </Form.Field>
        {active === false ? null : (
          <Message>
            <p style={{ color: eightCharactersColor }}>
              password Must be at least 8 characters
            </p>
            <p style={{ color: matchColor }}>Matching Passwords</p>
            <p style={{ color: containUppercaseColor }}>
              Password Contain at least 1 Uppercase letter
            </p>
            <p style={{ color: containLowercaseColor }}>
              Password Contain at least 1 Lowercase letter
            </p>
            <p style={{ color: containNumberColor }}>
              Password Contain at least 1 Number letter
            </p>
          </Message>
        )}
      </Form>
    );
  }
}
