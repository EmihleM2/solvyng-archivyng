import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import multer, { memoryStorage } from "multer";
import { getUserPresignedUrls, uploadToS3, deleteFromS3 } from "./s3.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const storage = memoryStorage();
const upload = multer({ storage });

app.use(
    cors({
        origin: "*",
    })
);
app.use(json());

//Upload images to S3 bucket
app.post("/images", upload.single("image"), (req, res) => {
    const { file } = req;
    const userId = req.headers["x-user-id"];

    if (!file || !userId) return res.status(400).json({ message: "Bad request" });

    const { error, key } = uploadToS3({ file, userId });
    if (error) return res.status(500).json({ message: error.message });

    return res.status(201).json({ key });
});

//Get images form S3 bucket
app.get("/images", async (req, res) => {
    const userId = req.headers["x-user-id"];

    if (!userId) return res.status(400).json({ message: "Bad request" });

    const { error, presignedUrls } = await getUserPresignedUrls(userId);
    if (error) return res.status(400).json({ message: error.message });

    return res.json(presignedUrls);
});

//Delete image from S3
app.delete('/images/:key', async (req, res) => {
    const { key } = req.params;
    const fullKey = `123/${key}`;  // Include the folder name in the key
    const { error, message } = await deleteFromS3(fullKey);

    if (error) {
        res.status(500).json({ message: error.message });
    } else {
        res.status(200).json({ message });
    }
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});