"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
exports.handler = async () => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const tableName = process.env.TABLE_NAME;
    const params = {
        TableName: tableName,
        Item: {
            id: "2",
            content: "This is my content - 2"
        },
        ConditionExpression: "attribute_not_exists(id)",
        ReturnConsumedCapacity: "TOTAL"
    };
    try {
        await dynamodb.put(params).promise();
        console.log(`Writing item ${params.Item.id} to ${tableName}`);
    }
    catch (error) {
        console.log(`Error writing to table ${tableName}`);
        throw new Error(error);
    }
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: "Success!"
    };
    return response;
};
