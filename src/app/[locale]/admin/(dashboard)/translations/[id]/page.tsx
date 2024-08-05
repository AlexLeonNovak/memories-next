import { notFound } from 'next/navigation';
import { TranslationRepository } from '@/lib/repositories';
import { PageTitle } from '@/components';
import { getTranslations } from 'next-intl/server';

type TEditTranslationPage = {
  params: {
    id: string;
  };
};

export default async function EditPostPage({ params: { id } }: TEditTranslationPage) {
  const post = await TranslationRepository.getById(id);

  if (!post) {
    return notFound();
  }

  const t = await getTranslations('AdminTranslations');

  return (
    <>
      <PageTitle title={t('Edit translation')} />
    </>
  );
}
