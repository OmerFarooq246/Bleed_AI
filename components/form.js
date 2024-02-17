import React, { useState } from "react";

export default function Form() {
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyDescription: "",
    companyProjects: "",
    hiringReasons: "",
    dutiesAndInvolvement: "",
    interviewStrategy: "",
    salaryAndBenefits: "",
    hiringTimeline: "",
    idealCandidateProfile: "",
    inclusivityLanguage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <div>
        <label htmlFor="jobTitle" className="block mb-1 text-lg font-bold">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 mb-3"
        />
      </div>
      <div className="flex space-x-10">
        <div>
          <label htmlFor="companyDescription" className="block mb-1 text-lg font-bold">
            Describe the Company
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={formData.companyDescription}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
        <div>
          <label htmlFor="companyProjects" className="block mb-1 text-lg font-bold">
            Company Projects
          </label>
          <textarea
            id="companyProjects"
            name="companyProjects"
            value={formData.companyProjects}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
      </div>
      <div className="flex space-x-10">
        <div>
          <label htmlFor="hiringReasons" className="block mb-1 text-lg font-bold">
            Reasons for Hiring
          </label>
          <textarea
            id="hiringReasons"
            name="hiringReasons"
            value={formData.hiringReasons}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
        <div>
          <label htmlFor="dutiesAndInvolvement" className="block mb-1 text-lg font-bold">
            Duties and Involvement
          </label>
          <textarea
            id="dutiesAndInvolvement"
            name="dutiesAndInvolvement"
            value={formData.dutiesAndInvolvement}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
      </div>
      <div className="flex space-x-10">
        <div>
          <label htmlFor="interviewStrategy" className="block mb-1 text-lg font-bold">
            Interview Strategy
          </label>
          <textarea
            id="interviewStrategy"
            name="interviewStrategy"
            value={formData.interviewStrategy}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
        <div>
          <label htmlFor="salaryAndBenefits" className="block mb-1 text-lg font-bold">
            Salary and Benefits
          </label>
          <textarea
            id="salaryAndBenefits"
            name="salaryAndBenefits"
            value={formData.salaryAndBenefits}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
      </div>
      <div className="flex space-x-10">
        <div>
          <label htmlFor="hiringTimeline" className="block mb-1 text-lg font-bold">
            Hiring Timeline
          </label>
          <textarea
            id="hiringTimeline"
            name="hiringTimeline"
            value={formData.hiringTimeline}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
        <div>
          <label htmlFor="idealCandidateProfile" className="block mb-1 text-lg font-bold">
            Ideal Candidate Profile
          </label>
          <textarea
            id="idealCandidateProfile"
            name="idealCandidateProfile"
            value={formData.idealCandidateProfile}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mb-3"
          />
        </div>
      </div>
      <div>
        <label htmlFor="inclusivityLanguage" className="block mb-1 text-lg font-bold">
          Inclusivity Language
        </label>
        <textarea
          id="inclusivityLanguage"
          name="inclusivityLanguage"
          value={formData.inclusivityLanguage}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2 mb-3"
        />
      </div>
      <button
        className="p-4 rounded-full w-full bg-yellow-300 text-xl font-bold"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}
