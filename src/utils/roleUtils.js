export const getPrimaryRole = (roles) => {
  if (roles.includes("ADMIN")) return "ADMIN";
  if (roles.includes("ARTIST")) return "ARTIST";
  return "LISTENER";
};
