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

export {
  unCaughtException,
  unHandledRejection,
  mobileMin,
  mobileMax,
  mobileStarts,
  mobileEnds,
};
