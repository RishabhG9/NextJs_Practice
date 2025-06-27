import { Article, ArticleDetailProps } from "../type/type";


export default async function ArticleDetail({ params }: ArticleDetailProps) {
  const res = await fetch(`https://dev.to/api/articles/ben/${params.slug}`);
  const article: Article = await res.json();

  return (
    <div>
      <h1>{article?.title}</h1>
      <p>{article?.description}</p>
      <pre>{article?.body_markdown.slice(0, 500)}...</pre>
    </div>
  );
}
