export const USERNAME_REGEX = /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/;

export const validateUsername = ({ username }: { username: string }) => {
  if (!username) {
    return;
  }
  if (username.length < 5) {
    return {
      type: "error",
      message: "Username must be at least 5 characters",
    };
  }
  if (username.length > 20) {
    return {
      type: "error",
      message: "Username must be 20 characters or less",
    };
  }
  if (!USERNAME_REGEX.test(username)) {
    return {
      type: "error",
      message: "Only lowercase letters, numbers, and underscores allowed",
    };
  }
  return null;
};
