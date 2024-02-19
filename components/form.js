import React, { useState } from "react";
import Bot from "./bot";
import { CiChat2 } from "react-icons/ci";
import Loader from "./loader";

export default function Form({ conversationId }) {
  const [bot, setBot] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(conversationId)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // create query with heading then data
    const query = `Job Title: ${formData.jobTitle} Company Description: ${formData.companyDescription} Company Projects: ${formData.companyProjects} Hiring Reasons: ${formData.hiringReasons} Duties and Involvement: ${formData.dutiesAndInvolvement} Interview Strategy: ${formData.interviewStrategy} Salary and Benefits: ${formData.salaryAndBenefits} Hiring Timeline: ${formData.hiringTimeline} Ideal Candidate Profile: ${formData.idealCandidateProfile} Inclusivity Language: ${formData.inclusivityLanguage}`;
    console.log(query);
    try {
      setLoading(true);
      const url = `https://talentai-service-5oyupglq2q-uc.a.run.app/ask-job-description-agent?conversation_id=${conversationId}&query=${query}`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json' // Add accept header
        },
        body: JSON.stringify({}) // Empty body as per API documentation
      });
      const data = await response.json();
      console.log(data);
      setMessage(data.response);
      setBot(true);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full relative">
      <div className=" mx-auto mt-10 p-6 bg-white shadow-md rounded-md w-max">
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
            <label
              htmlFor="companyDescription"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="companyProjects"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="hiringReasons"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="dutiesAndInvolvement"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="interviewStrategy"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="salaryAndBenefits"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="hiringTimeline"
              className="block mb-1 text-lg font-bold"
            >
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
            <label
              htmlFor="idealCandidateProfile"
              className="block mb-1 text-lg font-bold"
            >
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
          <label
            htmlFor="inclusivityLanguage"
            className="block mb-1 text-lg font-bold"
          >
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
          {loading ? <Loader height={8} width={6} /> : "Submit"}
        </button>
      </div>
      {bot ? (
        <div className="absolute bottom-0 right-0 w-1/3 flex flex-col border-2 rounded-b-full">
          <Bot conversationId={conversationId} message={message} />
          <button
            className="p-4 rounded-b-full bg-yellow-300 text-xl font-bold"
            onClick={() => setBot(false)}
          >
            Close Bot
          </button>
        </div>
      ) : (
        <div className="absolute bottom-0 right-10">
          <button
            className="p-4 rounded-full bg-yellow-300 text-xl font-bold"
            onClick={() => setBot(true)}
          >
            <CiChat2 size={40} />
          </button>
        </div>
      )}
    </div>
  );
}
