import { File } from "@/components/auth/forminputs/MultipleFileInput";

export type ServicesProps = {
  title: string;
  image: string;
  slug: string;
};

export type RegisterInputProps = {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  role: any;
  plan: any;
};

export type LoginInputProps = {
  email: string;
  password: string;
};

export type BioDataFormProps = {
  firstName: string;
  lastName: string;
  middleName?: string;
  dob?: any;
  gender: string;
  userId: string;
  page: string;
  trackingNumber: string;
  nextPage?: string;
};
export type ContactInfoProps = {
  email: string;
  phone: string;
  country: string;
  page: string;
  city: string;
  state?: string;
};
export type PracticeInfoProps = {
  hospitalName: string;
  hospitalAddress: string;
  hospitalEmailAddress: string;
  hospitalContactNumber: string;
  hospitalHoursOfOperation: number;
  hospitalWebsite?: string;
  servicesOffered: string[];
  insuranceAccepted: string;
  languageSpoken: string[];
  page: string;
};
export type AdditionInfoProps = {
  educationHistory: string;
  research: string;
  accomplishments: string;
  additionDocs: any;
  page: string;
};
export type AvailabilityProps = {
  meettingDuration: string;
  research: string;
  accomplishments: string;
  additionDocs: string[];
  page: string;
};
export type ProfileInfoProps = {
  bio: string;
  profilePicture?: string;
  page: string;
  medicalLicense: string;
  medicalLicenseExpiry?: any;
  yearsOfExperience: number;
};
export type EducationInfoProps = {
  medicalSchool: string;
  graduationYear: string;
  primarySpecialization: string;
  otherSpecialization: string[];
  boardCertificates: any;
  page: string;
};
