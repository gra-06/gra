
'use server';

/**
 * @fileOverview A portfolio guide AI agent that can answer questions about projects, blog posts, and the user.
 * - streamPortfolioGuide - A function that handles the portfolio guide chat process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { client } from '@/lib/sanity';

// Tool to get portfolio information from Sanity
const getPortfolioInfo = ai.defineTool(
  {
    name: 'getPortfolioInfo',
    description: 'Use this tool to get information about portfolio projects, blog posts, or general info about the portfolio owner. Specify the type of information you need.',
    inputSchema: z.object({
      type: z.enum(['projects', 'posts', 'about']).describe("The type of information to query: 'projects' for work portfolio, 'posts' for blog articles, or 'about' for personal information."),
      query: z.string().describe("A simple keyword query to search for. For example, 'latest', 'design', 'tech leadership', etc."),
    }),
    outputSchema: z.string().describe("A JSON string containing the queried information, or a message indicating no results were found."),
  },
  async ({ type, query }) => {
    let groqQuery = '';
    let params = { query: `%${query}%` };

    switch (type) {
      case 'projects':
        groqQuery = `*[_type == "project" && (name match $query || client match $query || services[] match $query || tags[] match $query)] | order(date desc){
            name, client, "category": categories[]->title, services, "url": "/projects/" + slug.current, overview
        }[0...5]`;
        break;
      case 'posts':
        groqQuery = `*[_type == "post" && (title match $query || tags[] match $query)] | order(publishedAt desc){
            title, "category": categories[]->title, excerpt, "url": "/blog/" + slug.current
        }[0...5]`;
        break;
      case 'about':
        // For 'about', we can return some static info or query a specific 'about' document if it exists.
        // For now, let's return a summary. This can be expanded.
        return JSON.stringify({
            summary: "Mustafa Saraçoğlu is a creative professional specializing in design and development, turning ideas into reality. You can find more on the /about page."
        });
      default:
        return JSON.stringify({ error: 'Invalid information type specified.' });
    }

    try {
        const results = await client.fetch(groqQuery, params);
        if (results.length === 0) {
            return JSON.stringify({ message: `No ${type} found matching '${query}'.` });
        }
        return JSON.stringify(results);
    } catch (error) {
        console.error("Sanity fetch error:", error);
        return JSON.stringify({ error: `Failed to fetch ${type} from Sanity.` });
    }
  }
);


const portfolioGuidePrompt = ai.definePrompt({
    name: 'portfolioGuidePrompt',
    system: `You are a helpful and friendly portfolio guide for Mustafa Saraçoğlu's website. Your name is Olyve.
    - Your goal is to help users discover projects, blog posts, and learn more about Mustafa.
    - Keep your answers concise, friendly, and to the point.
    - Use the 'getPortfolioInfo' tool to answer user questions about projects, blog posts, or Mustafa himself.
    - When providing information about projects or posts, always include the name/title and a URL to the item.
    - Do not make up information. If you cannot find an answer using your tools, say so politely.
    - Always respond in Markdown format.
    - Introduce yourself in the first message.
    `,
    tools: [getPortfolioInfo],
});

export async function streamPortfolioGuide({ messages }: { messages: { role: 'user' | 'model', content: string }[] }) {
    const { stream } = ai.generate({
        model: 'googleai/gemini-2.0-flash',
        prompt: messages,
        system: portfolioGuidePrompt.context[0].text,
        tools: [getPortfolioInfo],
        config: {
            temperature: 0.3,
        }
    });

    return stream;
}
