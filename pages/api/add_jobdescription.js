import bcryptjs from "bcryptjs";
import { mongoConnect } from "@/libs/mongodb";

export default async function handler(req, res) {
    console.log("req.body in job description save: ", req.body);

    try {
        // Establishing connection with db
        const client = await mongoConnect();
        const db = client.db("Bleed_AI");

        // Saving job description with the email of the user
        await db.collection("JobDescriptions").insertOne({
            email: req.body.email,
            jobDescription: req.body.jobDescription
        });

        res.status(200).json({ message: "Job description saved successfully" });
    } catch (error) {
        console.error("Error saving job description:", error.message);
        res.status(500).json({ error: "Failed to save job description" });
    }
}
