'use client';

import { Button, Modal, SubmitButton, TranslationForm } from '@/components';
import { Pencil, Save } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TTranslationEntity } from '@/types';
import { useRouter } from 'next/navigation';

type TranslationEditDialogProps = {
  translation: TTranslationEntity;
  onUpdate?: (data: TTranslationEntity) => void;
};
export const TranslationEditDialog = ({ translation, onUpdate }: TranslationEditDialogProps) => {
  const [show, setShow] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);
  const router = useRouter();
  const t = useTranslations('AdminTranslations');
  return (
    <>
      <Button variant='ghost' onClick={() => setShow(true)}>
        <Pencil />
      </Button>
      <Modal
        open={show}
        setOpen={setShow}
        title={t('Update translation')}
        footer={
          <SubmitButton
            onClick={() => setSubmitRequested(true)}
            isPending={submitRequested}
            label='Save'
            pendingLabel='Please wait...'
            icon={<Save />}
          />
        }
      >
        <TranslationForm
          translation={translation}
          submitRequested={submitRequested}
          onFormSubmit={(data) => {
            setShow(false);
            router.refresh();
            onUpdate && onUpdate(data);
          }}
          onFinally={() => {
            setSubmitRequested(false);
          }}
        />
      </Modal>
    </>
  );
};
