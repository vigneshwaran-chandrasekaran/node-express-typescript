const unCaughtException = "WE GOT AN UNCAUGHT EXCEPTION";
const unHandledRejection = "WE GOT AN UN HANDLED REJECTION";

/**
 * Mobile Number Validation
 */
const mobileStarts = 6000000000;
const mobileEnds = 9999999999;
const mobileMin = [
  mobileStarts,
  "The value of `{PATH}` ({VALUE}) is not valid",
];
const mobileMax = [
  mobileEnds,
  "The value of `{PATH}` ({VALUE}) exceeds the limit ({MAX}).",
];

const ERRORS = {
  users: {
    mobile: "Mobile number already exists",
    email: "Email already exists",
    notAvailable: "No such user exists",
    inValid: "User credentials are invalid",
    validEmail: "Email must be a valid email address",
    trim: "Email may not contain any spaces at the beginning or end",
    empty: "Email is required",
  },
};

export {
  unCaughtException,
  unHandledRejection,
  ERRORS,
  mobileMin,
  mobileMax,
  mobileStarts,
  mobileEnds,
};
