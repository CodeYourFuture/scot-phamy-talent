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

// applicantEntries: {
//   name, email, password, confirmPassword, about, city, skills, cvLink, value;
// }

const validatePasswordLength = password => {
  return password.length > 8;
};
const validatePasswordMatching = (password, confirmPassword) => {
  return password === confirmPassword;
};
const validatePasswordContainUppercase = password => {
  return /[A-Z]/.test(password);
};
const validatePasswordContainLowercase = password => {
  return /[a-z]/.test(password);
};
const validatePasswordContainNumber = password => {
  return /[0-9]/.test(password);
};

const validateSelectedCity = city => {
  return city !== null;
};
const validateSelectedSkills = Skills => {
  return Skills !== null;
};
const validateCheckedRightToWork = rightToWork => {
  return rightToWork === "Yes" || rightToWork === "No";
};
const validate = form => {
  const { password, confirmPassword, city, skills, rightToWork } = form;
  const passwordLength = validatePasswordLength(password);
  const passwordIsMatching = validatePasswordMatching(
    password,
    confirmPassword
  );
  const passwordContainUppercase = validatePasswordContainUppercase(password);
  const passwordContainLowerCase = validatePasswordContainLowercase(password);
  const passwordContainNumber = validatePasswordContainNumber(password);
  const cityIsSelected = validateSelectedCity(city);
  const skillsIsSelected = validateSelectedSkills(skills);
  const checkRightToWorkBox = validateCheckedRightToWork(rightToWork);
  const valid =
    !!passwordIsMatching &&
    !!passwordLength &&
    !!passwordContainUppercase &&
    !!passwordContainLowerCase &&
    !!passwordContainNumber &&
    !!cityIsSelected &&
    !!skillsIsSelected &&
    !!checkRightToWorkBox;

  return {
    passwordLength,
    passwordIsMatching,
    passwordContainUppercase,
    passwordContainLowerCase,
    passwordContainNumber,
    cityIsSelected,
    skillsIsSelected,
    checkRightToWorkBox,
    valid
  };
};

export default validate;
