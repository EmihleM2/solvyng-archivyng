import { GetObjectCommand, ListObjectsV2Command, PutObjectCommand, S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuid } from "uuid";
import path from 'path';

// Configure the keys for accessing AWS
const s3 = new S3Client({
    region: process.env.REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
    },
});

const BUCKET = process.env.BUCKET_NAME;

export const uploadToS3 = async ({ file, userId }) => {
    const extension = path.extname(file.originalname);
    const key = `${userId}/${uuid()}${extension}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    });

    try {
        await s3.send(command);
        return { key };
    } catch (error) {
        console.log(error);
        return { error };
    }
};

<<<<<<< HEAD
=======
// const getImageKeysByUser = async (userId) => {
//     const command = new ListObjectsV2Command({
//         Bucket: BUCKET,
//          Prefix: `${userId}/resized`,
//     });

//     const { Contents = [] } = await s3.send(command);

//     return Contents.sort(
//         (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
//     ).map((image) => image.Key);
// };

>>>>>>> f8aa2b7 (latest)
const getImageKeysByUser = async (userId) => {
    const command = new ListObjectsV2Command({
        Bucket: BUCKET,
        Prefix: userId, 
    });

    const { Contents = [] } = await s3.send(command);

    return Contents
        .filter((image) => !image.Key.startsWith(`${userId}/resized`)) 
        .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
        .map((image) => image.Key);
};



export const getUserPresignedUrls = async (userId) => {
    try {
        const imageKeys = await getImageKeysByUser(userId);

        const presignedUrls = await Promise.all(
            imageKeys.map((key) => {
                const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
                return getSignedUrl(s3, command, { expiresIn: 900 });
            })
        );
        return { presignedUrls };
    } catch (error) {
        console.log(error);
        return { error };
    }
};



export const deleteFromS3 = async (key) => {
    const command = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
    });

    try {
        await s3.send(command);
<<<<<<< HEAD
        // console.log(response);
        return { message: 'File deleted successfully' };
    } catch (error) {
        // console.log(error);
=======
        console.log(response);
        return { message: 'File deleted successfully' };
    } catch (error) {
        console.log(error);
>>>>>>> f8aa2b7 (latest)
        return { error };
    }
};

