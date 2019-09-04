// password.onchange = validatePassword;
// confirm_password.onkeyup = validatePassword;
// passwordValidation = (password, confirmPassword) => {
// isActive(password);
// isPasswordMatch(password, confirmPassword);
// isConfirmNumber(password, confirmPassword);
// isConfirmLowercase(password, confirmPassword);
// isPasswordTooShort(password, confirmPassword);
// isConfirmUppercase(password, confirmPassword);
// };
// isActive = password => {
//   password.length > 0? true: false}

// isPasswordTooShort = (password, confirmPassword) => {
//   if (password.length >= 8 && confirmPassword.length >= 8) {
//     return true;
//   } else {
//     return <p>Password must be at least 8 Characters</p>
//   }
// };
// isPasswordMatch = (password, confirmPassword) => {
//   password !== confirmPassword && <p>Passwords are not matching</p>}
// isConfirmUppercase = (password, confirmPassword) => {
//   if (
// isPasswordContainUpperCase(password) &&
// isPasswordContainUpperCase(confirmPassword)
//   ) {
//     return true
//   } else {
//     returnsetState({
//       passwordValidation: {
//         ..state.passwordValidation,
//         containUppercase: false,
//         containUppercaseColor: "red"
//       }
//     });
//   }
// };
// isConfirmLowercase = (password, confirmPassword) => {
//   if (
// isPasswordContainLowerCase(password) &&
// isPasswordContainLowerCase(confirmPassword)
//   ) {
//     returnsetState({
//       passwordValidation: {
//         ..state.passwordValidation,
//         containLowercase: true,
//         containLowercaseColor: "green"
//       }
//     });
//   } else {
//     returnsetState({
//       passwordValidation: {
//         ..state.passwordValidation,
//         containLowercase: false,
//         containLowercaseColor: "red"
//       }
//     });
//   }
// };
// isConfirmNumber = (password, confirmPassword) => {
//   if (
// isPasswordContainNumber(password) &&
// isPasswordContainNumber(confirmPassword)
//   ) {
//     returnsetState({
//       passwordValidation: {
//         ..state.passwordValidation,
//         containNumber: true,
//         containNumberColor: "green"
//       }
//     });
//   } else {
//     returnsetState({
//       passwordValidation: {
//         ..state.passwordValidation,
//         containNumber: false,
//         containNumberColor: "red"
//       }
//     });
//   }
// };
// isPasswordContainLowerCase = password => {
//   const newReg = /(?=.*[a-z])[a-z]/g;
//   const pas = newReg.test(password);

//   return pas;
// };
// isPasswordContainUpperCase = password => {
//   const newReg = /(?=.*[A-Z])[A-Z]/g;
//   const pas = newReg.test(password);

//   return pas;
// };
// isPasswordContainNumber = password => {
//   const newReg = /(?=.*[0-9])[0-9]/g;
//   const pas = newReg.test(password);

//   return pas;
// };
// isCheckBoxChecked = () => {
//   if (
// state.applicantEntries.value !== "Yes" ||
// state.applicantEntries.value !== "No"
//   ) {
//     return true;
//   } else {
//     return false;
//   }
// };
