import * as AWS from "aws-sdk";

export const handler = async (): Promise<any> => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const tableName = process.env.TABLE_NAME;
  const params: any = {
    TableName: tableName
  };

  let allItems = [];

  try {
    console.log(`Getting data from table ${tableName}`);
    const items: any = await dynamodb.scan(params).promise();

    allItems = items.Items.map(item => item);
    allItems.forEach(item => console.log(`Item ${item.id}: ${item.content}`));
  } catch (error) {
    console.log(`Error getting data from table ${tableName}`);
    throw new Error(error);
  }

  const response: object = {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: `${allItems.length} items found`
  };

  return response;
};
