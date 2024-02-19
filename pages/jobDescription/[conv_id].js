import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import BaseLayout from "@/components/BaseLayout/BaseLayout";
import { useSession } from "next-auth/react";


export default function index() {
  const [JD, setJD] = useState("");
  const router = useRouter();
  const session = useSession();
  const { conv_id } = router.query;
  console.log(session);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://talentai-service-5oyupglq2q-uc.a.run.app/get-job-description?conversation_id=${conv_id}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.job_description) setJD(data.job_description);
      else setJD("No JD found");
    };
    if (conv_id) fetchData();
  }, [conv_id]);

  const handleSave = async () => {
    try {
      const response = await fetch("/api/add_jobdescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.data.user.email,
          jobDescription: JD,
        }),
      });
      console.log(response);
    }
    catch (error) {
      console.error("Error saving job description:", error.message);
    }

  }
  return (
    <BaseLayout title={"Job Description"}>
            <div className="mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4">Edit Job Description</h1>
            <textarea
                value={JD}
                onChange={(e) => setJD(e.target.value)}
                className="w-full border rounded-md px-3 py-2 h-80"
                placeholder="Enter or edit job description..."
            ></textarea>
            <div className="flex justify-end mt-4">
                <button onClick={handleSave} className="bg-yellow-300 px-4 py-2 rounded-md font-semibold text-white hover:bg-yellow-400">Save</button>
            </div>
        </div>
    </BaseLayout>
  );
}
