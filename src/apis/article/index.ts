import { apiHandler } from '@/utils/apiHandler';
import { CREATE_ARTICLE, GET_ARTICLES, GET_OR_UPDATE_ARTICLE } from './endpoints';
import { transformArticle } from '../transformers';
import { ArticleFormData } from '@/pages/article';

export function getArticles() {
  return apiHandler({ ep: GET_ARTICLES }).then((res: any) => {
    return { articles: res?.articles?.map(transformArticle), articleCount: res?.articlesCount };
  });
}

export function getArticle(id?: string) {
  return apiHandler({ ep: GET_OR_UPDATE_ARTICLE(id), method: 'GET' }).then((res: any) =>
    transformArticle(res?.article)
  );
}
export function updateArticle(payload: ArticleFormData & { slug: string }) {
  return apiHandler({
    ep: GET_OR_UPDATE_ARTICLE(payload.slug),
    method: 'PUT',
    payload: {
      article: {
        slug: payload.slug,
        title: payload.title,
        description: payload.description,
        body: payload.body,
        tagList: payload.tags
      }
    }
  }).then(transformArticle);
}
export function createArticle(payload: ArticleFormData) {
  return apiHandler({
    ep: CREATE_ARTICLE,
    method: 'POST',
    payload: {
      article: {
        title: payload.title,
        description: payload.description,
        body: payload.body,
        tagList: payload.tags
      }
    }
  }).then(transformArticle);
}
