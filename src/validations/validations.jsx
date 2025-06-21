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

export const validationAddUser = (data) => {
  let valid = true;
  const errors = {};

  // Username validation
  if (!data.userName?.trim()) {
    errors.userName = "Username is required.";
    valid = false;
  } else if (data.userName.length < 3) {
    errors.userName = "Username must be at least 3 characters.";
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

export const validationUpdateUser = (data) => {
  let valid = true;
  const errors = {};

  // Username validation
  if (data.userName && data.userName.trim() && data.userName.length < 3) {
    errors.userName = "Username must be at least 3 characters.";
    valid = false;
  }

  // Email validation
  if (data.email && data.email.trim()) {
    if (!/\S+@\S+\.\S+/.test(data.email.trim())) {
      errors.email = "Email is invalid.";
      valid = false;
    }
  }

  return { valid, errors };
};

export const validationArtistApplication = (data) => {
  let valid = true;
  const errors = {};

  // Artist Name validation
  if (!data.stageName?.trim()) {
    errors.stageName = "Artist name is required.";
    valid = false;
  } else if (data.stageName.length < 3) {
    errors.stageName = "Artist name must be at least 3 characters.";
    valid = false;
  }

  // Music Genres validation
  if (!data.musicGenres || data.musicGenres.length === 0) {
    errors.musicGenres = "At least one music genre is required.";
    valid = false;
  }

  // Artist Bio validation
  if (!data.artistBio?.trim()) {
    errors.artistBio = "Artist bio is required.";
    valid = false;
  } else if (data.artistBio.length < 10) {
    errors.artistBio = "Artist bio must be at least 10 characters.";
    valid = false;
  }

  // instagramUrl
  if (
    data.socialLinks?.instagramUrl &&
    !/^https?:\/\/.+/.test(data.socialLinks.instagramUrl.trim())
  ) {
    errors.instagramUrl = "Instagram URL must be a valid URL.";
    valid = false;
  }

  // twitterUrl
  if (
    data.socialLinks?.twitterUrl &&
    !/^https?:\/\/.+/.test(data.socialLinks.twitterUrl.trim())
  ) {
    errors.twitterUrl = "Twitter URL must be a valid URL.";
    valid = false;
  }

  // youTubeUrl
  if (
    data.socialLinks?.youTubeUrl &&
    !/^https?:\/\/.+/.test(data.socialLinks.youTubeUrl.trim())
  ) {
    errors.youTubeUrl = "YouTube URL must be a valid URL.";
    valid = false;
  }

  return { valid, errors };
};
