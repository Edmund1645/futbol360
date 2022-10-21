import { Handler } from "@netlify/functions";
import axios from "axios";

interface IEventBody {
  targetAPIPath: string;
  targetAPIParams: Record<string, any>;
}
const handler: Handler = async (event, context) => {
  const body: IEventBody = JSON.parse(event.body as string);
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "NO API KEY PROVIDED" }),
    };
  }

  try {
    const response = await axios.get(body.targetAPIPath, {
      params: body.targetAPIParams || {},
      headers: {
        "X-Auth-Token": apiKey,
      },
      baseURL: "https://api.football-data.org/v4",
    });
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response.status,
      body: JSON.stringify(error),
    };
  }
};

export { handler };
