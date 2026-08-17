/// <reference types="vite/client" />

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  categoryId: string;
  date: string;
  heroImageUrl: string;
}

export function getLatestArticles(): Article[] {
  // Read local JSON files using Vite's fast glob
  const files = import.meta.glob('/src/articles/*/*/article.json', { eager: true });
  const images = import.meta.glob('/src/articles/*/*/hero.png', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
  
  const articles: Article[] = [];

  for (const path in files) {
    const file = files[path] as { default: any };
    const articleData = file.default;
    
    // Extract category and slug folder name from path: /src/articles/category-name/article-slug/article.json
    const parts = path.split('/');
    const slugFolder = parts[parts.length - 2];
    const categoryFolder = parts[parts.length - 3];
    
    const imagePath = `/src/articles/${categoryFolder}/${slugFolder}/hero.png`;
    const heroImageUrl = images[imagePath] || '';

    articles.push({
      ...articleData,
      categoryId: categoryFolder,
      heroImageUrl
    });
  }

  // Sort by date descending
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
