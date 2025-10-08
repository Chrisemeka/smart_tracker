import { Request, response, Response } from "express";
import prisma from "../prisma";
import dotenv from 'dotenv';

dotenv.config();

export class RecordController {
    static getRecordDetail = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const record = await prisma.record.findUnique({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: 'Record fetched successfully',
                data: record
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot get record', error: error });
        }
    }

    static updateRecord = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { data } = req.body;
            const record = await prisma.record.update({
                where: {
                    id: id
                },
                data: {
                    data: data
                }
            });
            return res.status(200).json({
                message: 'Record updated successfully',
                data: record
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot update record', error: error });
        }
    }

    static deleteRecord = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const record = await prisma.record.delete({
                where: {
                    id: id
                }
            });
            return res.status(200).json({
                message: 'Record deleted successfully',
                data: record
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error. Cannot delete record', error: error });
        }
    }
}