// app/sitemap.xml/route.js
import { NextResponse } from 'next/server';

export async function GET() {
	const baseUrl = process.env.SITE_URL || 'https://brainhire.ru';

	// Статические пути
	const staticPaths = [
		{ url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
		{ url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },

		{
			url: `${baseUrl}/ai-vacancy-creation`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},

		{
			url: `${baseUrl}/ai-staff-scoring`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},

		{
			url: `${baseUrl}/ai-resume-analysis`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},

		{
			url: `${baseUrl}/ai-videointerview`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{ url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
		{
			url: `${baseUrl}/recruiting`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/contacts`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/tariffs`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
		{
			url: `${baseUrl}/partner`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.9,
		},
	];

	// Динамические пути
	let dynamicPaths = [];
	try {
		const res = await fetch('https://blog.kreorg.ru/posts/');
		const posts = await res.json();
		dynamicPaths = posts.map((post) => ({
			url: `${baseUrl}/blog/${post.category.slug}/${post.slug}`,
			lastModified: new Date(post.last_modified || new Date()),
			changeFrequency: 'daily',
			priority: 0.7,
		}));
	} catch (error) {
		console.error('Blog fetch error:', error);
	}

	const allPaths = [...staticPaths, ...dynamicPaths];

	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
		.map(
			(item) => `
    <url>
      <loc>${item.url}</loc>
      <lastmod>${item.lastModified.toISOString()}</lastmod>
      <changefreq>${item.changeFrequency}</changefreq>
      <priority>${item.priority}</priority>
    </url>
  `
		)
		.join('')}
</urlset>`;

	return new NextResponse(sitemapXml, {
		status: 200,
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400',
		},
	});
}
