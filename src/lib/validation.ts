export type FieldErrors = Record<string, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin(input: {
  email: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const email = input.email.trim();
  const password = input.password;

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address (example: name@organization.com).";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateSignup(input: {
  fullName: string;
  organizationName: string;
  email: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const fullName = input.fullName.trim();
  const organizationName = input.organizationName.trim();
  const email = input.email.trim();
  const password = input.password;

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!organizationName) {
    errors.organizationName = "Organization name is required.";
  } else if (organizationName.length < 2) {
    errors.organizationName = "Organization name must be at least 2 characters.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address (example: name@organization.com).";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function validateAcceptInvite(input: {
  token: string;
  fullName: string;
  password: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  const token = input.token.trim();
  const fullName = input.fullName.trim();
  const password = input.password;

  if (!token) {
    errors.token = "Invite token is required.";
  }

  if (!fullName) {
    errors.fullName = "Full name is required.";
  } else if (fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export function firstError(errors: FieldErrors): string | null {
  const values = Object.values(errors);
  return values.length > 0 ? values[0] : null;
}
