import { GoogleGenAI, Type } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema = {
  type: Type.OBJECT,
  properties: {
    tasks: {
      type: Type.ARRAY,
      description: "A list of actionable tasks to accomplish the goal.",
      items: {
        type: Type.OBJECT,
        properties: {
          task: {
            type: Type.STRING,
            description: "A single, concise to-do item. Should be a clear action."
          },
          dueDate: {
            type: Type.STRING,
            description: "An optional suggested due date for the task in YYYY-MM-DD format. If a date is not relevant, this can be null."
          }
        },
        required: ["task"]
      }
    }
  },
  required: ["tasks"]
};

export const generateTasksWithGemini = async (goal: string): Promise<{ text: string; dueDate: string | null }[]> => {
  try {
    const prompt = `Based on the following high-level goal, generate a concise and actionable to-do list of 5 to 7 steps. For each task, provide a suggested due date in YYYY-MM-DD format if applicable. If a due date isn't relevant for a specific task, the dueDate can be null. Goal: "${goal}"`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the AI.");
    }

    const parsedResponse = JSON.parse(jsonText);
    
    if (parsedResponse && Array.isArray(parsedResponse.tasks)) {
      return parsedResponse.tasks.map((item: { task: string, dueDate?: string }) => ({
          text: item.task,
          dueDate: item.dueDate || null
      })).filter(item => item.text);
    } else {
      throw new Error("Invalid response format from AI.");
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate tasks. The AI service might be unavailable or the API key may be invalid.");
  }
};
