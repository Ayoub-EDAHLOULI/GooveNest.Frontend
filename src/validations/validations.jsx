export const validationLogin = (data) => {
  let valid = true;
  const errors = {};

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required.";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
    errors.email = "Email is invalid.";
    valid = false;
  }

  // Password validation
  if (!data.password?.trim()) {
    errors.password = "Password is required.";
    valid = false;
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
    valid = false;
  }

  return { valid, errors };
};

export const validationRegister = (data) => {
  let valid = true;
  const errors = {};

  // Username validation
  if (!data.username?.trim()) {
    errors.username = "Username is required.";
    valid = false;
  } else if (data.username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
    valid = false;
  }

  // Email validation
  if (!data.email?.trim()) {
    errors.email = "Email is required.";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
    errors.email = "Email is invalid.";
    valid = false;
  }

  // Password validation
  if (!data.password?.trim()) {
    errors.password = "Password is required.";
    valid = false;
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
    valid = false;
  }

  return { valid, errors };
};
