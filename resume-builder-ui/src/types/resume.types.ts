import { generateId } from "@/utils/generateId";

export interface PersonalInformationData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  profilePicture: File | null;
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
  | "customRightPanelItem";

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
}

export const defaultResumeData: ResumeData = {
  personalInformation: {
    fullName: "Lihini Galagedara",
    jobTitle: "Software Engineer",
    email: "lihini@gmail.com",
    phone: "0770190533",
    address: "polduwa road pelawatte",
    summary:
      "I am a passionate software engineer with a strong background in developing scalable web applications. I have experience working with modern technologies and frameworks, and I am always eager to learn and adapt to new challenges.",
    profilePicture: null,
  },

  workExperience: [
    {
      id: generateId(),
      years: "2017- 2020",
      company: "swivel tech",
      position: "software engineer",
      description: [
        {
          projectName: "Project 1",
          projectDescription:
            "Developed a web-based strata management platform in an Agile team for ERP solutions.",
          duration: "2017- 2018",
        },
        {
          projectName: "Project 2",
          projectDescription:
            "Developed a mobile application for managing employee schedules and attendance.",
          duration: "2018- 2020",
        },
      ],
      techstack: ["react", "typescript", "nodejs"],
    },
  ],

  education: [
    {
      id: generateId(),
      years: "2013- 2017",
      qualification: "BSc in Computer Science",
      institution: "University of Colombo",
    },
  ],

  customRightPanelItem: [
    {
      id: generateId(),
      title: "Projects",
      subtitle: "Personal Projects",
      content: "Developed several web applications.",
    },
    {
      id: generateId(),
      title: "Certifications",
      content: ["React Certification", "JavaScript Certification"],
    },
  ],

  sectionOrder: [
    { id: "work-experience", type: "workExperience" },
    { id: "education", type: "education" },
    // IDs must match the IDs in customRightPanelItem
  ],
};
