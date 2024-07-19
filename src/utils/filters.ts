import { Scholarship } from "@/redux/types";

const filterScholarships = (scholarships: Scholarship[], filters: string[]) => {
  const filterObj = filters.reduce((acc, filter) => {
    const [property, value] = filter.split(".");
    if (!acc[property]) {
      acc[property] = new Set();
    }
    acc[property].add(value);
    return acc;
  }, {});
  console.log("filterO", filterObj);

  // Filter the scholarships based on the filter object
  return scholarships.filter((scholarship) => {
    for (const property in filterObj) {
      let scholarshipValue;
      if (property === "level") {
        scholarshipValue = scholarship.levelOfEducation;
      } else if (property === "course") {
        scholarshipValue = scholarship.courseInterest._id;
      } else if (property === "inst") {
        scholarshipValue = scholarship.institution._id;
      } else {
        continue; // Skip if the property is not handled
      }
      console.log("scholarshipValue", scholarshipValue);

      if (!filterObj[property].has(String(scholarshipValue))) {
        return false;
      }
    }
    return true;
  });
};

export default filterScholarships;
