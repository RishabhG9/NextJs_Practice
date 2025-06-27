import { ROUTES } from "@/routes/Routes";
import Link from "next/link";
import { Article } from "./type/type";


export default async function ArticlesPage() {
  const res = await fetch("https://dev.to/api/articles?username=ben");
  const articles: Article[] = await res.json();

  return (
    <div>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article?.id}>
            <Link href={ROUTES.ARTICLE_DETAIL(article?.slug)}>
              {article?.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
