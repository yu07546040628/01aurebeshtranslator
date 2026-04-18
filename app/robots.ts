import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // All major search engines + AI crawlers
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        // Google — full access, no restrictions
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        // Google Image crawler
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        // Bing / Microsoft
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        // OpenAI GPT crawler (ChatGPT knowledge retrieval)
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        // OpenAI ChatGPT user-browsing agent
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        // Anthropic Claude crawler
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        // Meta AI (Llama-based) crawler
        userAgent: 'FacebookBot',
        allow: '/',
      },
      {
        // Common Crawl — used for training datasets (optional: block if unwanted)
        userAgent: 'CCBot',
        allow: '/',
      },
      {
        // Perplexity AI
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        // You.com AI search
        userAgent: 'YouBot',
        allow: '/',
      },
    ],
    sitemap: 'https://www.freeaurebesh.com/sitemap.xml',
    host: 'https://www.freeaurebesh.com',
  };
}
