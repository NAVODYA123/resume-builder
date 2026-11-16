export interface ResumeData {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
  profilePicture: File | null;
}

export const defaultResumeData: ResumeData = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  profilePicture: null,
};
