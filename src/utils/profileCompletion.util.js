export const getProfileCompletion = (user) => {
  if (!user) return { percent: 0 };

  const REQUIRED_FIELDS = [
    "firstName",
    "lastName",
    "email",
    "contact",
    "nationality",
    "favouriteTeam",
    "postcode",
    "dateOfBirth",
  ];

  const filled = REQUIRED_FIELDS.filter(
    (key) => user[key] !== null && user[key] !== ""
  ).length;

  // ✅ image handled separately
  const hasAvatar = !!(user.avatarUrl || user.profileImage);

  const totalFields = REQUIRED_FIELDS.length + 1;
  const filledTotal = hasAvatar ? filled + 1 : filled;

  return {
    percent: Math.round((filledTotal / totalFields) * 100),
  };
};
