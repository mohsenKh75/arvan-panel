import { GridContainer } from '@/components/core/GridContainer';
import { ArticlesHeader } from './ArticlesHeader';
import { ArticleContent } from './ArticleContent';
import { Article } from '@/apis/transformers';
import { useState } from 'react';

interface Props {
  articles: Array<Article>;
}
export default function ArticlesSection({ articles }: Props) {
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>();
  return (
    <GridContainer direction='flex-col'>
      <ArticlesHeader />
      {articles?.map((article, idx) => (
        <ArticleContent
          openOptions={setSelectedArticleSlug}
          selectedArticleSlug={selectedArticleSlug}
          key={article.text}
          author={article.author}
          count={idx + 1}
          createdAt={article.createdAt}
          text={article.text}
          title={article.title}
          slug={article.slug}
        />
      ))}
    </GridContainer>
  );
}
