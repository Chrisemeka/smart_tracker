import { Request, response, Response } from "express";
import prisma from "../prisma";
import dotenv from 'dotenv';
import { CreateBucketInput } from "../schemas/bucketSchema";
import { CreateRecordInput } from "../schemas/recordSchema";

dotenv.config();

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

export class BucketController {
    static getBuckets = async (req: AuthRequest, res: Response) => {
        try {
            const buckets = await prisma.bucket.findMany({
                where: {
                    userId: req.user!.id
                }
            });

            return res.status(200).json({
                message: 'Buckets fetched successfully',
                data: buckets
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot get user buckets', error: error });
        }
    }

    static createBucket = async (req: AuthRequest, res: Response) => {
        try {
            const { name, description, icon,  fieldSchema } = req.body as CreateBucketInput;

            if (!name || !description || !icon || !fieldSchema) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const bucket = await prisma.bucket.create({
                data: {
                    name,
                    description,
                    icon,
                    fieldSchema,
                    userId: req.user!.id
                }
            });

            return res.status(201).json({
                message: 'Bucket created successfully',
                data: bucket
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot create user bucket', error: error });
        }

    }

    static getBucketById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const bucket = await prisma.bucket.findUnique({
                where: {
                    id: id
                }
            })

            if (!bucket) {
                return res.status(404).json({ message: 'Bucket does not exist' });
            }

            return res.status(200).json({
                message: 'Bucket fetched successfully',
                data: bucket
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot get user bucket', error: error });
        }
    }

    // empty
    static updateBucket = async (req: Request, res: Response) => {
        
    }

    static getRecordInBucket = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const records = await prisma.record.findMany({
                where: {
                    bucketId: id
                }
            })

            if (!records) {
                return res.status(404).json({ message: 'No records exist for this bucket yet, create a new record first' });
            }

            return res.status(200).json({
                message: 'Records fetched successfully',
                data: records
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot get bucket records', error: error });
        }
    }

    static createRecordInBucket = async (req: AuthRequest, res: Response) => {
        try {
            const { id } = req.params;
            const { data } = req.body as CreateRecordInput;

            const record = await prisma.record.create({
                data: {
                    data,
                    bucketId: id,
                    userId: req.user!.id
                }
            })

            return res.status(201).json({
                message: 'Record created successfully',
                data: record
            })
        } catch (error) {
            console.error(error);

            return res.status(500).json({ message: 'Internal server error. Cannot create record', error: error });
        }   
    }

    // empty
    static deleteAllRecordsInBucket = async (req: Request, res: Response) => {
        
    }

    static deleteBucket = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const bucket = await prisma.bucket.findUnique({
                where: {
                    id: id
                }
            })

            if (!bucket) {
                return res.status(404).json({ message: 'Bucket does not exist' });
            }

            await prisma.bucket.delete({
                where: {
                    id: id
                }
            })

            return res.status(200).json({
                message: 'Bucket deleted successfully'
            })
        } catch (error) {
            console.error(error);   
            return res.status(500).json({ message: 'Internal server error. Cannot delete user bucket', error: error });
        }
    }
}