export const ROUTES = {
  HOME: "/",

  // MEAL PAGE
  MEALS: "/meals",
  getMealDetail: (id: string) => `/meals/${id}`,

  //ARTICLE PAGE
  ARTICLES: "/articles",
  ARTICLE_DETAIL: (slug: string) => `/articles/${slug}`,
};
