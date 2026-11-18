import type { SavedResumeData } from "@/types/resume.types";

declare global {
  interface Window {
    rbpApiSettings: {
      apiUrl: string;
      nonce: string;
    };
  }
}

const API_URL = window.rbpApiSettings.apiUrl;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "X-WP-Nonce": window.rbpApiSettings.nonce,
});

/**
 * Save a new resume.
 */
export const saveResume = async (
  resumeData: SavedResumeData,
  title: string,
) => {
  const response = await fetch(`${API_URL}resumes`, {
    method: "POST",
    headers: getHeaders(),
    credentials: "same-origin",
    body: JSON.stringify({
      title,
      resumeData,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save resume");
  }

  return response.json();
};

/**
 * Get all saved resumes.
 */
export const getResumes = async () => {
  const response = await fetch(`${API_URL}resumes`, {
    headers: getHeaders(),
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resumes");
  }

  return response.json();
};

/**
 * Get one resume.
 */
export const getResumeById = async (id: number) => {
  const response = await fetch(`${API_URL}resumes/${id}`, {
    headers: getHeaders(),
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch resume");
  }

  return response.json();
};

/**
 * Update an existing resume.
 */
export const updateResume = async (
  id: number,
  resumeData: SavedResumeData,
  title: string,
) => {
  const response = await fetch(`${API_URL}resumes/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    credentials: "same-origin",
    body: JSON.stringify({
      title,
      resumeData,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update resume");
  }

  return response.json();
};

/**
 * Delete a resume.
 */
export const deleteResume = async (id: number) => {
  const response = await fetch(`${API_URL}resumes/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
    credentials: "same-origin",
  });

  if (!response.ok) {
    throw new Error("Failed to delete resume");
  }

  return response.json();
};
