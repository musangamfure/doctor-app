"use client";

import React, { useContext, useState } from "react";
import { createContext } from "react";
import {
  AdditionInfoProps,
  BioDataFormProps,
  ContactInfoProps,
  EducationInfoProps,
  PracticeInfoProps,
  ProfileInfoProps,
} from "../types/types";
// 2. create define the shape of the data you want to track
interface IOnboardingContextData {
  trackingNumber: string;
  doctorProfileId: string;
  setTrackingNumber: (tNumber: string) => void;
  setDoctorProfileId: (dProfileId: string) => void;
  savedDBData: any;
  setSavedDBData: (data: any) => void;

  bioData: BioDataFormProps;
  setBioData: (bioData: BioDataFormProps) => void;
  profileData: ProfileInfoProps;
  educationData: EducationInfoProps;
  setProfileData: (profileData: ProfileInfoProps) => void;
  setEducationData: (educationData: EducationInfoProps) => void;
  practiceData: PracticeInfoProps;
  setPracticeData: (practiceData: PracticeInfoProps) => void;
  additionData: AdditionInfoProps;
  setAdditionData: (additionData: AdditionInfoProps) => void;
  contactData: ContactInfoProps;
  setContactData: (contactData: ContactInfoProps) => void;
}

const initialBioData = {
  firstName: "",
  lastName: "",
  middleName: "",
  dob: "",
  gender: "",
  userId: "",
  page: "",
  trackingNumber: "",
  nextPage: "",
};
const initialProfileData = {
  bio: "",
  profilePicture: "",
  medicalLicense: "",
  medicalLicenseExpiry: "",
  yearsOfExperience: 0,
  page: "",
};

const initialEducationData = {
  medicalSchool: "",
  graduationYear: "",
  primarySpecialization: "",
  otherSpecialization: [],
  boardCertificates: [],
  page: "",
};

const initialPracticeData = {
  hospitalName: "",
  hospitalAddress: "",
  hospitalEmailAddress: "",
  hospitalContactNumber: "",
  hospitalHoursOfOperation: 0,
  hospitalWebsite: "",
  servicesOffered: [],
  insuranceAccepted: "",
  languageSpoken: [],
  page: "",
};

const initialAdditionData = {
  educationHistory: "",
  research: "",
  accomplishments: "",
  additionDocs: [],
  page: "",
};

const initialContactData = {
  email: "",
  phone: "",
  country: "",
  page: "",
  city: "",
  state: "",
};

const initialSavedDBData = {};

// 2. create and export a context
const initialValue: IOnboardingContextData = {
  trackingNumber: "",
  doctorProfileId: "",
  setDoctorProfileId: () => {},
  setTrackingNumber: () => {},
  setBioData: () => {},
  bioData: initialBioData,
  setProfileData: () => {},
  profileData: initialProfileData,
  setEducationData: () => {},
  educationData: initialEducationData,
  setPracticeData: () => {},
  practiceData: initialPracticeData,
  setAdditionData: () => {},
  additionData: initialAdditionData,
  setContactData: () => {},
  contactData: initialContactData,
  savedDBData: initialSavedDBData,
  setSavedDBData: () => {},
};
const OnboardingContext = createContext<IOnboardingContextData | null>(
  initialValue
);

export function OnboardingContectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [doctorProfileId, setDoctorProfileId] = useState("");

  const [contactData, setContactData] =
    useState<ContactInfoProps>(initialContactData);
  const [additionData, setAdditionData] =
    useState<AdditionInfoProps>(initialAdditionData);
  const [practiceData, setPracticeData] =
    useState<PracticeInfoProps>(initialPracticeData);
  const [educationData, setEducationData] =
    useState<EducationInfoProps>(initialEducationData);
  const [profileData, setProfileData] =
    useState<ProfileInfoProps>(initialProfileData);
  const [bioData, setBioData] =
    React.useState<BioDataFormProps>(initialBioData);
  const [savedDBData, setSavedDBData] = useState<any>({});

  const contextValue = {
    trackingNumber,
    setTrackingNumber,
    doctorProfileId,
    setDoctorProfileId,
    educationData,
    bioData,
    setSavedDBData,
    savedDBData,
    setContactData,
    contactData,
    setBioData,
    setEducationData,
    profileData,
    setProfileData,
    practiceData,
    setPracticeData,
    additionData,
    setAdditionData,
  };
  return (
    <OnboardingContext.Provider value={contextValue}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === null) {
    throw new Error(
      "useOnboardingContext must be used within a OnboardingContextProvider"
    );
  }
  return context;
}

export default OnboardingContext;
