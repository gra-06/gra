
'use server';

/**
 * @fileOverview A portfolio guide AI agent that can answer questions about projects, blog posts, and the user.
 * - streamPortfolioGuide - A function that handles the portfolio guide chat process.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { client } from '@/lib/sanity';
import { createStreamableValue } from 'ai/rsc';

// Tool to get portfolio information from Sanity
const getPortfolioInfo = ai.defineTool(
  {
    name: 'getPortfolioInfo',
    description: "Portfolyo projeleri, blog yazıları veya portfolyo sahibi hakkında bilgi almak için bu aracı kullanın. İhtiyacınız olan bilgi türünü belirtin.",
    inputSchema: z.object({
      type: z.enum(['projects', 'posts', 'about']).describe("Sorgulanacak bilgi türü: iş portfolyosu için 'projects', blog makaleleri için 'posts' veya kişisel bilgiler için 'about'."),
      query: z.string().describe("Aramak için basit bir anahtar kelime sorgusu. Örneğin, 'en son', 'tasarım', 'teknoloji liderliği' vb."),
    }),
    outputSchema: z.string().describe("Sorgulanan bilgiyi içeren bir JSON dizesi veya sonuç bulunamadığını belirten bir mesaj."),
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
        // 'about' için statik bir bilgi dönebilir veya varsa belirli bir 'about' dokümanını sorgulayabiliriz.
        // Şimdilik bir özet dönelim. Bu genişletilebilir.
        return JSON.stringify({
            summary: "Mustafa Saraçoğlu, fikirleri gerçeğe dönüştüren, tasarım ve geliştirme alanında uzmanlaşmış yaratıcı bir profesyoneldir. Daha fazlasını /about sayfasında bulabilirsiniz."
        });
      default:
        return JSON.stringify({ error: 'Geçersiz bilgi türü belirtildi.' });
    }

    try {
        const results = await client.fetch(groqQuery, params);
        if (results.length === 0) {
            return JSON.stringify({ message: `'${query}' ile eşleşen ${type} bulunamadı.` });
        }
        return JSON.stringify(results);
    } catch (error) {
        console.error("Sanity getirme hatası:", error);
        return JSON.stringify({ error: `Sanity'den ${type} getirilemedi.` });
    }
  }
);


const portfolioGuidePrompt = ai.definePrompt({
    name: 'portfolioGuidePrompt',
    system: `Sen, Mustafa Saraçoğlu'nun web sitesi için yardımsever ve arkadaş canlısı bir portfolyo rehberisin. Adın Olyve.
    - Amacın, kullanıcıların projeleri, blog yazılarını keşfetmelerine ve Mustafa hakkında daha fazla bilgi edinmelerine yardımcı olmaktır.
    - Cevaplarını kısa, samimi ve konuya odaklı tut.
    - Projeler, blog yazıları veya Mustafa hakkındaki kullanıcı sorularını yanıtlamak için 'getPortfolioInfo' aracını kullan.
    - Projeler veya yazılar hakkında bilgi verirken, her zaman adı/başlığı ve öğeye bir URL ekle.
    - Bilgi uydurma. Araçlarını kullanarak bir cevap bulamazsan, bunu kibarca söyle.
    - Her zaman Markdown formatında yanıt ver.
    - İlk mesajda kendini tanıt.
    `,
    tools: [getPortfolioInfo],
});

export async function streamPortfolioGuide({ messages }: { messages: { role: 'user' | 'model', content: string }[] }) {
    const stream = createStreamableValue();

    (async () => {
        const { stream: anstream } = ai.generateStream({
            model: 'googleai/gemini-2.0-flash',
            prompt: messages,
            system: portfolioGuidePrompt.system,
            tools: [getPortfolioInfo],
            config: {
                temperature: 0.3,
            }
        });
        
        for await (const chunk of anstream) {
            if (chunk.text) {
                stream.update(chunk.text);
            }
        }
        stream.done();
    })();

    return { output: stream.value };
}
