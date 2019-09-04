import validate from "./passwordValidation";

test("should be 8 characters length", () => {
  const formData = {
    password: ""
  };

  const result = validate(formData);
  expect(result.valid).toEqual(false);
  expect(result.passwordStrong).toEqual(false);
});

test("should fail if no capital letter", () => {
  const formData = {
    password: "aaaaaaaaaaaaa"
  };

  const result = validate(formData);
  expect(result.valid).toEqual(false);
  expect(result.passwordLength).toEqual(true);
  expect(result.passwordStrong).toEqual(false);
});

test("should pass if there is capital letter", () => {
  const formData = {
    password: "aaaaaAaaaaaaa"
  };

  const result = validate(formData);
  expect(result.valid).toEqual(true);
  expect(result.passwordStrong).toEqual(true);
  expect(result.passwordLength).toEqual(true);
});

test("should not pass if email is invalid", () => {
  const formData = {
    password: "aaaaaAaaaaaaa",
    email: "assadada"
  };

  const result = validate(formData);
  expect(result.valid).toEqual(true);
  expect(result.passwordStrong).toEqual(true);
  expect(result.passwordLength).toEqual(true);
  expect(result.emailValid).toEqual(false);
});

test("should not pass if email is invalid AND password is weak", () => {
  const formData = {
    password: "aaaaaaaaaaaaa",
    email: "assadada"
  };

  const result = validate(formData);
  expect(result.valid).toEqual(false);
  expect(result.passwordStrong).toEqual(false);
  expect(result.passwordLength).toEqual(true);
  expect(result.emailValid).toEqual(false);
});

test("should not pass if name is invalid", () => {
  const formData = {
    name: "mozafar"
  };

  const result = validate(formData);
  expect(result.valid).toEqual(false);
  expect(result.nameValid).toEqual(false);
});

test("should  pass if name is valid", () => {
  const formData = {
    name: "meriem"
  };

  const result = validate(formData);
  expect(result.nameValid).toEqual(true);
});
