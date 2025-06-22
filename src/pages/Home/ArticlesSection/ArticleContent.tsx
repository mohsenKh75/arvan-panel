import { EDIT_PARAM } from '@/apis/article/endpoints';
import { Button } from '@/components/core/Button';
import { GridContainer } from '@/components/core/GridContainer';
import { ASSETS_PATH } from '@/components/core/Image/assetsPath';
import { Typography } from '@/components/core/Typography';
import Options from '@/components/shared/Options';
import { URLS } from '@/router/urls';
import { classnames } from '@/utils/classnames';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  count: number;
  title: string;
  author: string;
  text: string;
  createdAt: string;
  slug: string;
  openOptions: (id?: string) => void;
  selectedArticleSlug?: string;
}

export function ArticleContent({
  count,
  author,
  createdAt,
  text,
  title,
  slug,
  selectedArticleSlug,
  openOptions
}: Props) {
  const nav = useNavigate();

  function onEdit(id?: string) {
    if (id) nav(`${URLS.article}?${EDIT_PARAM}=${id}`);
  }

  return (
    <GridContainer xSpacing='space-x-4' className='p-4 w-full relative' justifyContent='justify-start'>
      <Typography className='truncate w-[2%]' variant='text-title-3'>
        {count}
      </Typography>
      <Typography bold className='truncate w-[25%]' variant='text-title-3'>
        {title}
      </Typography>
      <Typography className='truncate w-[10%]' variant='text-title-3'>
        {author}
      </Typography>
      <Typography className='truncate w-[45%]' variant='text-title-3'>
        {text}
      </Typography>
      <Typography className='truncate w-[20%]' variant='text-title-3'>
        {createdAt}
      </Typography>
      <Button onClick={() => openOptions(slug)} variant='secondary' layout='icon' iconSrc={ASSETS_PATH.dots} />
      <Options
        isOpen={selectedArticleSlug === slug}
        openOptions={openOptions}
        id={selectedArticleSlug}
        onEdit={onEdit}
      />
    </GridContainer>
  );
}
