import { Request, Response } from 'express';
import fs from 'fs';
import { uploadFileToAzure } from '../config/azStorage';
import path from 'path';
export const randomUploadController = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).send({ error: 'No file uploaded' });
        }

        const uploadedFile = req.file;
        const fileName = uploadedFile?.originalname + '.txt' ?? '';
        const randomNumber = Math.floor(Math.random() * 1000);

        const tempFilePath = path.join(__dirname, `${fileName}.txt`);
        fs.writeFileSync(tempFilePath, randomNumber.toString());

        await uploadFileToAzure(fileName, tempFilePath)

        fs.unlinkSync(tempFilePath);

        res.status(200).send({ message: 'File uploaded successfully' });

    } catch (err: any) {
        res.status(500).send({ error: 'Server error: ' + err });
    }

}