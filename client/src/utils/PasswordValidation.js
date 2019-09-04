exports.ValidatePasswordLength = password => {
  const PasswordLength =
    password.trim().length < 8
      ? "password should be at least 8 characters"
      : "pass";
  return PasswordLength;
};

exports.ValidatePasswordMatch = ({ password, confirmPassword }) =>
  (formError.PasswordMatch =
    password !== confirmPassword
      ? "password should be at least 8 characters "
      : "pass");

exports.ValidatePasswordContainUppercase = password => {
  const newReg = /(?=.*[A-Z])[A-Z]/g;
  const pass = newReg.test(password);
  formError.PasswordContainUppercase = pass
    ? "pass"
    : "password should contain at least 1 Uppercase letter";
};
exports.ValidatePasswordContainLowercase = password => {
  const newReg = /(?=.*[a-z])[a-z]/g;
  const pass = newReg.test(password);
  formError.PasswordContainLowercase = pass
    ? "pass"
    : "password should contain at least 1 Lowercase letter";
};
exports.ValidatePasswordContainNumber = password => {
  const newReg = /(?=.*[0-9])[0-9]/g;
  const pass = newReg.test(password);
  formError.PasswordContainNumber = pass
    ? "pass"
    : "password should contain at least 1 Number";
};
