import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(req: Request) {
  const { image } = await req.json();

  // Remove the "data:image/jpeg;base64," part
  const base64image = image.split(",")[1];

  // Start streaming
  const { text } = await generateText({
    model: google("gemini-1.5-flash"),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe this image in detail, in Pokedex style. It must separate the title and the description by `||` symbol. Format: `Title||Description`. Follow this given format strictly.",
          },
          { type: "image", image: base64image },
        ],
      },
    ],
    maxTokens: 1000,
  });

  return Response.json({ text });
}
