// Single responsibility
// Hide implementation details
// if there are errors:

// input: object representing the applciant (comes from state)

// output: it will return an object like this:

// {
//    valid: false,
//    passwordStrong: false,
//    passwordMatch: false,
//    emailValid: false
// }

const validatePasswordLength = password => {
  return password && password.length > 8;
};
const validatePasswordStrength = password => {
  return /[A-Z]/.test(password);
};

const validateEmail = email => {
  return email && /\@/.test(email);
};

const validateName = name => {
  return name && /meriem/.test(name);
};

const validate = form => {
  const { password, email, name } = form;
  const passwordLength = validatePasswordLength(password); //
  const passwordStrong = validatePasswordStrength(password);
  const valid = !!passwordStrong && !!passwordLength;
  const emailValid = validateEmail(email);

  const nameValid = validateName(name);
  return {
    nameValid,
    passwordLength,
    passwordStrong,
    valid,
    emailValid
  };
};

export default validate;

// exports.ValidatePasswordLength = password => {
//   const PasswordLength =
//     password.trim().length < 8
//       ? "password should be at least 8 characters"
//       : "pass";
//   return PasswordLength;
// };

// exports.ValidatePasswordMatch = ({ password, confirmPassword }) =>
//   (formError.PasswordMatch =
//     password !== confirmPassword
//       ? "password should be at least 8 characters "
//       : "pass");

// exports.ValidatePasswordContainUppercase = password => {
//   const newReg = /(?=.*[A-Z])[A-Z]/g;
//   const pass = newReg.test(password);
//   formError.PasswordContainUppercase = pass
//     ? "pass"
//     : "password should contain at least 1 Uppercase letter";
// };
// exports.ValidatePasswordContainLowercase = password => {
//   const newReg = /(?=.*[a-z])[a-z]/g;
//   const pass = newReg.test(password);
//   formError.PasswordContainLowercase = pass
//     ? "pass"
//     : "password should contain at least 1 Lowercase letter";
// };
// exports.ValidatePasswordContainNumber = password => {
//   const newReg = /(?=.*[0-9])[0-9]/g;
//   const pass = newReg.test(password);
//   formError.PasswordContainNumber = pass
//     ? "pass"
//     : "password should contain at least 1 Number";
// };
