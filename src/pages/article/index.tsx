import { createArticle, getArticle, updateArticle } from '@/apis/article';
import { EDIT_PARAM } from '@/apis/article/endpoints';
import { Box } from '@/components/core/Box';
import { Button } from '@/components/core/Button';
import { Checkbox } from '@/components/core/Checkbox';
import { GridContainer } from '@/components/core/GridContainer';
import { Input } from '@/components/core/Input';
import { MainLayout } from '@/components/Layout/MainLayout';
import { useApi } from '@/hooks/useApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z as zod } from 'zod';

const articleSchema = zod.object({
  title: zod.string().min(3, { message: 'title must be at least 3 characters' }),
  description: zod.string().optional(),
  body: zod.string().optional(),
  tags: zod.string().array().optional()
});

export type ArticleFormData = zod.infer<typeof articleSchema>;

export default function Article() {
  const [param] = useSearchParams();
  const slug = param.get(EDIT_PARAM);
  const { request: requestGetArticle, data: articleData } = useApi({ apiMethod: getArticle });
  const { request: requestPostArticle } = useApi<ArticleFormData & { slug: string }>({
    apiMethod: slug ? updateArticle : createArticle
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema)
  });

  function submitArticleData(data: ArticleFormData) {
    requestPostArticle({ slug: slug as string, ...data }).then(() => toast.success('done'));
  }

  useEffect(() => {
    if (slug) requestGetArticle(slug);
  }, [slug]);

  return (
    <MainLayout hasHeader hasSideBar>
      <form onSubmit={handleSubmit(submitArticleData)}>
        <GridContainer>
          <GridContainer
            direction='flex-col'
            ySpacing='space-y-4'
            backgroundColor='bg-neutral-bg-1-default'
            className='p-4 w-2/3 rounded-md'
          >
            <Input
              {...register('title')}
              placeholder='write here'
              title='title'
              error={errors?.title?.message}
              state={errors?.title?.message ? 'error' : undefined}
            />
            <Input {...register('description')} placeholder='write here' title='description' />
            <Input {...register('body')} inputSize='field' placeholder='write here' title='body' />
            <Box>
              <Button type='submit'>Submit</Button>
            </Box>
          </GridContainer>
          <GridContainer
            direction='flex-col'
            backgroundColor='bg-neutral-bg-1-default'
            className='w-1/3 p-4 ml-2 rounded-md'
          >
            <Input className='mb-2' placeholder='add new tag' title='new tag' />
            {articleData?.tags?.map((tag) => (
              <Box className='pb-1'>
                <Checkbox
                  name='tags'
                  value={tag}
                  title={tag}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const value = e.target.value;

                    const currentTags = new Set((watch('tags') as string[]) ?? []);

                    if (checked) {
                      currentTags.add(value);
                    } else {
                      currentTags.delete(value);
                    }

                    setValue('tags', Array.from(currentTags), {
                      shouldValidate: true
                    });
                  }}
                  checked={(watch('tags') as string[])?.includes(tag) || false}
                />
              </Box>
            ))}
          </GridContainer>
        </GridContainer>
      </form>
    </MainLayout>
  );
}
Article.layoutProps = { position: 'default' };
