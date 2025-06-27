export interface Article {
  id?: number;
  title: string;
  slug: string;
  description: string;
  body_markdown: string;
}

export interface ArticleDetailProps {
  params: { slug: string };
}