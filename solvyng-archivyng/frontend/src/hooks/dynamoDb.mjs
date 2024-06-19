import { DynamoDBClient, UpdateItemCommand,ScanCommand } from '@aws-sdk/client-dynamodb';
// import { DynamoDBClient, UpdateItemCommand, QueryCommand, ScanCommand } from '@aws-sdk/client-dynamodb';

// Initialize DynamoDB client
const dynamoDB = new DynamoDBClient({
    region: import.meta.env.VITE_REGION,
    credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY,
        secretAccessKey: import.meta.env.VITE_SECRET_KEY,
    },
});

// Function to get Resource_id for a User_id
async function getResourceIdForUser(userId) {
    const params = {
        TableName: import.meta.env.VITE_DYNAMODB_TABLE_NAME,
        FilterExpression: "User_id = :userId",
        ExpressionAttributeValues: {
            ":userId": { S: userId }
        }
    };

    try {
        const data = await dynamoDB.send(new ScanCommand(params));
        if (data.Items.length > 0) {
            // Assuming that each User_id is associated with exactly one Resource_id
            return data.Items[0].Resource_id.S;
        } else {
            console.error("No items found for the provided User_id:", userId);
            return null;
        }
    } catch (error) {
        console.error("Error querying DynamoDB:", error);
        return null;
    }
}

// Function to save timezone
export const saveTimezone = async (userId, timezone) => {
    if (!timezone) {
        console.error("Timezone is empty or undefined.");
        return { error: "Timezone cannot be empty or undefined." };
    }

    console.log("Saving timezone:", timezone);

    // Look up the Resource_id associated with the User_id
    const resourceId = await getResourceIdForUser(userId);

    if (!resourceId) {
        console.error("Resource_id not found for User_id:", userId);
        return { error: "Resource_id not found for User_id." };
    }

    const params = {
        TableName: import.meta.env.VITE_DYNAMODB_TABLE_NAME,
        Key: {
            Resource_id: { S: resourceId },
        },
        UpdateExpression: "SET #tz = :tz",
        ExpressionAttributeNames: {
            "#tz": "Timezone",
        },
        ExpressionAttributeValues: {
            ":tz": { S: timezone },
        },
        ReturnValues: "UPDATED_NEW",
    };

    try {
        const result = await dynamoDB.send(new UpdateItemCommand(params));
        return { message: "Timezone saved successfully", result };
    } catch (error) {
        console.error("Error saving timezone:", error);
        return { error };
    }
};

export default dynamoDB;
