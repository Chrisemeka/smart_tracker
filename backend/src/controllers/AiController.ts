import { Request, response, Response } from "express";
import prisma from "../prisma";
import dotenv from 'dotenv';
import cleanAIResponse from "../helpers/cleanAiResponse";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { fi } from "zod/v4/locales";

dotenv.config();


export class AiController {
    private static genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    static getUrlData = async (req: Request, res: Response) => {
        try {
            const { bucketFields, url } = req.body; 
            
            if (!bucketFields) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Bucket fields are required' 
                });
            }

            const model = this.genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash" 
            });

            const system_context = `
                
            `;

            const result = await model.generateContent({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `${system_context}\n\nPlease extract and analyze data from this URL: ${url}`
                    }]
                }]
            });

            const extractedData = result.response.text();
            
            return res.status(200).json({
                success: true,
                data: extractedData,
                url: url
            });

        } catch (error) {
            console.error('Error extracting URL data:', error);
            
            return res.status(500).json({ 
                success: false,
                message: 'Failed to extract URL data',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }

    static getBucketFields = async (req: Request, res: Response) => {
        try {
            const { bucketName } = req.body;

            if (!bucketName) {
                return res.status(400).json({ 
                    success: false,
                    message: 'Bucket name is required' 
                });
            }

            const model = this.genAI.getGenerativeModel({ 
                model: "gemini-2.0-flash" 
            });

            const system_context = `
                You are an intelligent assistant that helps users create optimal tracking structures for their organizational needs. Your task is to analyze a bucket name and suggest the most relevant and useful fields for tracking items in that category.

                Your Role:
                - Understand the user's intent from their bucket name
                - Suggest 5-8 practical fields that someone would realistically want to track
                - Provide field names that are clear, concise, and actionable
                - Consider common use cases for similar tracking needs

                Guidelines:
                1. Field Relevance: Only suggest fields that are directly useful for the bucket type
                2. Field Types: Choose appropriate types from: text, date, number, url, dropdown
                3. Practical Focus: Think about what information helps users make decisions or track progress
                4. Avoid Redundancy: Don't suggest multiple fields that capture the same information
                5. Universal Fields: Consider including status/progress tracking when appropriate
                6. Specificity: Adapt field names to match the bucket context (e.g., "Company" for jobs, "Institution" for scholarships)

                Field Type Selection:
                - text: General information, names, descriptions, short notes
                - date: Deadlines, start dates, completion dates, milestones
                - number: Amounts, quantities, scores, ratings, prices
                - url: Application links, resource links, reference URLs
                - dropdown: Status fields, categories, priorities (suggest 3-5 options)

                Common Patterns by Category:

                Job/Career Tracking:
                - Company/Organization, Position/Role, Location, Salary/Compensation, Application Deadline, Status, Application Link, Requirements

                Academic (Scholarships/Programs):
                - Institution/University, Program/Scholarship Name, Deadline, Amount/Funding, GPA Requirement, Application Status, Eligibility, Application Link

                Learning Resources:
                - Course/Resource Name, Platform/Provider, Duration, Difficulty Level, Cost, Completion Status, Skills Covered, Resource Link

                Personal Progress (Fitness/Habits):
                - Activity/Exercise, Date, Duration, Quantity/Metrics, Notes, Progress Status

                Events/Opportunities:
                - Event Name, Date, Location, Registration Deadline, Cost, Category, Status, Event Link

                Response Format:
                Return ONLY a valid JSON array with this exact structure:
                [
                {
                    "fieldName": "descriptive field name",
                    "fieldType": "text|date|number|url",
                }
                ]

                Important Rules:
                - Always include at least one date field if deadlines/timing matters
                - Always suggest a status/progress field for trackable items
                - Field names should be 1-4 words maximum
                - Use title case for field names (e.g., "Application Deadline" not "application deadline")
                - Placeholder text should guide users on what to enter
                - For dropdown status fields, suggest 4-5 realistic options
                - Do not include overly technical or niche fields unless the bucket name clearly indicates expertise

                Examples:

                Bucket: "Remote Data Science Jobs"
                [
                {"fieldName": "Company", "fieldType": "text"},
                {"fieldName": "Position", "fieldType": "text"},
                {"fieldName": "Salary Range", "fieldType": "text"},
                {"fieldName": "Tech Stack", "fieldType": "text"},
                {"fieldName": "Application Deadline", "fieldType": "date"},
                {"fieldName": "Job Posting Link", "fieldType": "url"}
                ]

                Bucket: "PhD Scholarships"
                [
                {"fieldName": "University", "fieldType": "text"},
                {"fieldName": "Scholarship Name", "fieldType": "text"},
                {"fieldName": "Funding Amount", "fieldType": "text"},
                {"fieldName": "Application Deadline", "fieldType": "date"},
                {"fieldName": "GPA Requirement", "fieldType": "text"},
                {"fieldName": "Application Link", "fieldType": "url"}
                ]

                Bucket: "Gym Progress"
                [
                {"fieldName": "Exercise", "fieldType": "text"},
                {"fieldName": "Date", "fieldType": "date"},
                {"fieldName": "Weight", "fieldType": "number"},
                {"fieldName": "Reps", "fieldType": "number"},
                {"fieldName": "Sets", "fieldType": "number"},
                {"fieldName": "Duration", "fieldType": "text"},
                {"fieldName": "Notes", "fieldType": "text"}
                ]

                CRITICAL: Return ONLY the raw JSON array. Do not wrap it in markdown code blocks, backticks, or any other formatting. Your response should start with [ and end with ]

                Now analyze the bucket name provided by the user and generate appropriate field suggestions.
            `;

            const result = await model.generateContent({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `${system_context}\n\nPlease extract and analyze data from this URL: ${bucketName}`
                    }]
                }]
            });

            const extractedData = result.response.text();

            const cleanFields = cleanAIResponse(extractedData);
            const fields = cleanFields.map((field:any, index: number) => ({
                ...field, id: `field-${Date.now()}-${index}`
            }));
            
            return res.status(200).json({
                success: true,
                fields: fields,
                bucket: bucketName
            });
        } catch (error) {
            console.error('Error extracting bucket field data:', error);
            
            return res.status(500).json({ 
                success: false,
                message: 'Failed to extract bucket field data',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    }
}