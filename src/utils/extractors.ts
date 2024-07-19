export const extractInstitutions = (scholarships) => {
  // Initialize an empty object to store unique institutions
  const uniqueInstitutions = {};

  // Iterate through each scholarship object
  scholarships.forEach((scholarship) => {
    // Check if the institution exists and is not already added
    if (
      scholarship.institution &&
      !uniqueInstitutions[scholarship.institution._id]
    ) {
      // Add the institution to the uniqueInstitutions object with its _id as key
      uniqueInstitutions[scholarship.institution._id] = scholarship.institution;
    }
  });

  // Convert the uniqueInstitutions object back to an array
  const result = Object.values(uniqueInstitutions);
  console.log("aa", result);
  return result;
};
