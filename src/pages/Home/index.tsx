import { getArticles } from '@/apis/article';
import { Box } from '@/components/core/Box';
import { GridContainer } from '@/components/core/GridContainer';
import { Typography } from '@/components/core/Typography';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useApi } from '@/hooks/useApi';
import { useEffect } from 'react';
import ArticlesSection from './ArticlesSection';
import { Article } from '@/apis/transformers';
import { Skeleton } from '@/components/core/Skeleton';

function Home() {
  const {
    request,
    pending,
    data: articles
  } = useApi<{ articleCount: number; articles: Array<Article> }>({
    apiMethod: getArticles
  });

  useEffect(() => {
    request();
  }, []);

  return (
    <MainLayout hasHeader hasSideBar>
      <Box className='rounded-md' backgroundColor='bg-neutral-bg-1-default'>
        <GridContainer className='h-[100px] px-4 border-b border-neutral-st-2-default' alignItems='items-center'>
          <Typography variant='text-title-3'>All posts</Typography>
        </GridContainer>
        {pending
          ? Array.from({ length: 6 }).map((_, idx) => <Skeleton key={idx} />)
          : articles && <ArticlesSection articles={articles.articles} />}
      </Box>
    </MainLayout>
  );
}
export default Home;

Home.layoutProps = { position: 'default' };
