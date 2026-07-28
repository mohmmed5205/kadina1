import { useParams } from "react-router-dom";
import ArticleTemplate from "../components/blog/ArticleTemplate";
import { articlesBySlug } from "../data/articles";

export default function ArticlePage() {
  const { articleSlug } = useParams();
  const article = articlesBySlug[articleSlug];

  return <ArticleTemplate article={article} />;
}
