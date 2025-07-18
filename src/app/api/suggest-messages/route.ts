import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const systemPrompt = `
You are Sagespace, an empathetic AI companion designed to help users reflect on their mental health and emotional well-being. 

Your job is to generate:
1. A list of engaging, supportive questions that encourage users to share their feelings, reflect on their emotions, and think positively. These should feel safe, non-judgmental, and universally applicable. Each question should be separated by '||'.
2. A list of gentle, motivational suggestions or affirmations that users can use to feel supported and calm. These should inspire self-care and emotional balance. Each suggestion should also be separated by '||'.

Avoid medical or diagnostic language, and do not touch highly sensitive topics (like trauma details). Instead, focus on kindness, encouragement, and helping users feel heard in a safe space.

For example, your output should look like:
QUESTIONS: What’s something small that made you smile today?||When do you feel most at peace?||What’s a gentle reminder you need right now?  
SUGGESTIONS: Take a deep breath and remind yourself you’re doing your best.||It’s okay to rest—your worth isn’t tied to productivity.||Reach out to someone who makes you feel safe, even just to say hi.

Ensure your response is structured exactly like this:
QUESTIONS: <list of questions separated by '||'>  
SUGGESTIONS: <list of suggestions separated by '||'>
`;

    // Add system prompt to history
    const chatHistory = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
    ];

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 512,
        temperature: 0.7,
        topP: 0.95,
      },
    });
    const chat = model.startChat({ history: chatHistory });

    const result = await chat.sendMessageStream(
      messages[messages.length - 1].content
    );

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          controller.enqueue(encoder.encode(chunk.text()));
        }
        controller.close();
      },
    });

    return new Response(stream);
  } catch (err: any) {
    console.error('Gemini API Error:', err);

    return new Response(
      JSON.stringify({
        error: 'Something went wrong.',
        details: err.message || String(err),
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
