'use client';

import { Modal, SubmitButton } from '@/components/shared';
import { Plus, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui';
import { CategoryForm } from '@/components/screens';

export const CategoryDialog = () => {
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AminPosts');

  return (
    <>
      <Button className='ml-auto' type='button' variant='link' onClick={() => setShowCategoryDialog(true)}>
        <Plus />
        <span>{t('Add new category')}</span>
      </Button>
      <Modal
        open={showCategoryDialog}
        setOpen={setShowCategoryDialog}
        title={t('Add new category')}
        footer={
          <SubmitButton
            onClick={() => setSubmitRequested(true)}
            isPending={submitRequested}
            label={t('Create category')}
            pendingLabel={tAdm('wait')}
            icon={<Save />}
          />
        }
      >
        <CategoryForm
          submitRequested={submitRequested}
          onFormSubmit={() => {
            setShowCategoryDialog(false);
            setSubmitRequested(false);
          }}
          isShowSubmitButton={false}
        />
      </Modal>
    </>
  );
};
