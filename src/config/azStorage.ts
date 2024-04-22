import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';
import 'dotenv/config'

const accountName = process.env.STORAGE_NAME ?? '';
const accountKey = process.env.STORAGE_KEY ?? '';
const containerName = "random-file-container"

export const uploadFileToAzure = async (fileName: string, filePath: string): Promise<void> => {
    try {
        if (!accountName || !accountKey || !containerName) {
            throw new Error('Invalid Storage Account credentials');
        }
        const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(fileName);
        await blockBlobClient.uploadFile(filePath);
    } catch (error) {
        throw new Error('Error uploading file to Azure Blob Storage: ' + error);
    }
};
