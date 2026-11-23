import { countryOptions } from "@/utils/countries";
import type { CountryOption } from "./countries.types";

export interface PersonalInformationData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: {
    country: CountryOption | null;
    number: string;
  };
  address: string;
  summary: string;
  profilePicture: File | null;
  linkedin: string;
}

// Data structure used when saving to the database
export interface SavedPersonalInformationData extends Omit<
  PersonalInformationData,
  "profilePicture"
> {
  profilePicture: number | null;
}

export interface SavedResumeData extends Omit<
  ResumeData,
  "personalInformation"
> {
  personalInformation: SavedPersonalInformationData;
}

export interface SavedResume {
  id: number;
  title: string;
  resumeData: SavedResumeData;
  modified: string;
}

export interface WorkDescriptionData {
  projectName: string;
  projectDescription: string;
  duration?: string;
}

export interface WorkExperienceData {
  id: string;
  years: string;
  company: string;
  position: string;
  description: WorkDescriptionData[];
  techstack: string[];
}

export interface EducationData {
  id: string;
  years: string;
  qualification: string;
  institution: string;
}

export interface CustomLeftPanelItemData {
  id: string;
  title: string;
  items: string[];
}

export interface CustomRightPanelItemProps {
  id: string;
  title: string;
  subtitle?: string;
  years?: string;
  content: string | string[];
}

export type ResumeSectionType =
  | "workExperience"
  | "education"
  | "customRightPanelItem"
  | "customLeftPanelItem"
  | "profileSummary"
  | "contactInfo";

export interface ResumeSectionOrder {
  id: string;
  type: ResumeSectionType;
}
export interface ResumeData {
  personalInformation: PersonalInformationData;
  workExperience: WorkExperienceData[];
  education: EducationData[];
  customLeftPanelItem?: CustomLeftPanelItemData[];
  customRightPanelItem?: CustomRightPanelItemProps[];
  sectionOrder: ResumeSectionOrder[];

  // Left panel ordering
  leftSectionOrder: ResumeSectionOrder[];
}

export const defaultResumeData: ResumeData = {
  personalInformation: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: {
      country: countryOptions.find((item) => item.code === "LK") ?? null,
      number: "",
    },
    address: "",
    summary: "",
    profilePicture: null,
    linkedin: "",
  },

  workExperience: [],

  education: [],

  customRightPanelItem: [],

  customLeftPanelItem: [],

  sectionOrder: [
    { id: "work-experience", type: "workExperience" },
    { id: "education", type: "education" },
  ],

  leftSectionOrder: [
    { id: "profile-summary", type: "profileSummary" },
    { id: "contact-info", type: "contactInfo" },
  ],
};
