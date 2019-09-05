import validate from "./formValidation";
describe("form to be valid", () => {
  it("should be 8 characters length", () => {
    const formData = {
      password: ""
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(false);
  });

  it("should fail if Password NotMatching", () => {
    const formData = {
      password: "abcdefghij",
      confirmPassword: "abcdefghi"
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(false);
  });

  it(`should fail if there is capital letter and matching password 
  and length is 8 characters But there is no LowerCase letter `, () => {
    const formData = {
      password: "ABCDEFGHIJ",
      confirmPassword: "ABCDEFGHIJ"
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(false);
  });

  it("should not pass if Length & match & uppercase & Lowercase & but no number", () => {
    const formData = {
      password: "abcdEfghj",
      confirmPassword: "abcdEfghj"
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(true);
    expect(result.passwordContainNumber).toEqual(false);
  });

  it("should not pass length & match & lowercase & uppercase & number but no city selected ", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: null
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(true);
    expect(result.passwordContainNumber).toEqual(true);
    expect(result.cityIsSelected).toEqual(false);
  });
  it("should not pass length & match & lowercase & uppercase & number & city selected  but no Skills", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: null
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(true);
    expect(result.passwordContainNumber).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(false);
  });
  it("should not pass length & match & lowercase & uppercase & number & city selected &  Skills but no right to work", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: ["v", "b", "v"],
      rightToWork: ""
    };

    const result = validate(formData);
    expect(result.valid).toEqual(false);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(true);
    expect(result.passwordContainNumber).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
    expect(result.checkRightToWorkBox).toEqual(false);
  });
  it("should pass length & match & lowercase & uppercase & number & city selected  & no Skills and not checked", () => {
    const formData = {
      password: "abcdEfghj1",
      confirmPassword: "abcdEfghj1",
      city: "Glasgow",
      skills: ["v", "b", "v"],
      rightToWork: "Yes"
    };

    const result = validate(formData);
    expect(result.valid).toEqual(true);
    expect(result.passwordLength).toEqual(true);
    expect(result.passwordIsMatching).toEqual(true);
    expect(result.passwordContainUppercase).toEqual(true);
    expect(result.passwordContainLowerCase).toEqual(true);
    expect(result.passwordContainNumber).toEqual(true);
    expect(result.cityIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
    expect(result.skillsIsSelected).toEqual(true);
  });
});