export interface Course {
  _id: string;
  name: string;
  description: string;
}

export interface Scholarship {
  _id: string;
  name: string;
  description: string;
  deadline: Date;
  awardAmount: number;
  levelOfEducation: string;
  courseInterest: Course;
  author: string;
  institution: Institution;
}

export interface Institution {
  __v: number;
  _id: string;
  description: string;
  name: string;
  status: string;
  website: string;
}
