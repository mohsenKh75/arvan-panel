export interface Article {
  author: string;
  text: string;
  createdAt: string;
  description: string;
  tags: Array<string>;
  title: string;
  slug: string;
}

export function transformArticle(data: any): Article {
  return {
    title: data?.title,
    author: data?.author?.username,
    createdAt: data?.createdAt,
    description: data?.description,
    tags: data?.tagList,
    text: data?.body,
    slug: data?.slug
  };
}
