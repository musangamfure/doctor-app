export type ServicesProps = {
  title: string;
  imageUrl: string;
  slug: string;
};
export type SpecialtyProps = {
  title: string;
  slug: string;
};
export type SymptomsProps = {
  title: string;
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
  hourlWage: number;
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

export type statsProps = {
  doctors: string;
  patients: string;
  appointments: string;
  services: string;
};

export type DoctorAvailabilityProps = {
  monday: string[];
  tuesday: string[];
  wednesday: string[];
  thursday: string[];
  friday: string[];
  saturday: string[];
  sunday: string[];
};

export type DoctorProfileProps = {
  firstName: string;
  lastName: string;
  gender: string;
  operationMode: string;
  bio: string;
  hourlWage: number;
  specialtyId: string;
  profilePicture?: string;
  availability: DoctorAvailabilityProps | null;
};

type DoctorProfile = {
  id: string;
  firstName: string;
  lastName: string;
  gender: string;
  bio: string | null;
  hourlWage: number | null;
  profilePicture: string | null;
  primarySpecialization: string | null;
  yearsOfExperience: number | null;
  country: string | null;
  state: string | null;
  city: string | null;
  otherSpecialization: string[] | null;
  hospitalName: string | null;
  hospitalWebsite: string | null;
  servicesOffered: string[] | null;
  insuranceAccepted: string | null;
  research: string | null;
  accomplishments: string | null;
  hospitalHoursOfOperation: number | null;
  availability: DoctorAvailabilityProps | null;
};

export type Doctor = {
  id: string;
  name: string;
  email: string;
  slug: string;
  phone: string;
  doctorProfile: DoctorProfile | null;
};

export interface appointmentsProps {
  appointmentDate: Date | undefined;
  appointmentFormattedDate: string;
  doctorId: string;
  doctorProfileId: string;
  patientId: string;
  charge: number;
  appointmentTime: string;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  phone: string;
  location: string;
  dob: Date;
  appointmentReason: string;
  medicalDocuments: string[];
  occupation: string;
}
