const { ValidatePasswordLength } = require("../utils/PasswordValidation");
test("should output error message for ", () => {
  const testResult = ValidatePasswordLength("");
  expect(testResult).toEqual("password should be at least 8 characters");
  const testResult2 = ValidatePasswordLength("Abcdefgas");
  expect(testResult2).toEqual("pass");
  const testResult3 = ValidatePasswordLength("Abcgas");
  expect(testResult3).toEqual("password should be at least 8 characters");
});
