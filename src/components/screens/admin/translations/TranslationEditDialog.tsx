'use client';

import { Pencil, Save } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { TranslationForm } from '@/components/screens';
import { Modal, SubmitButton } from '@/components/shared';
import { Button } from '@/components/ui';
import { useRouter } from '@/navigation';
import { TTranslationEntity } from '@/types';

type TranslationEditDialogProps = {
  translation: TTranslationEntity;
  onUpdate?: (data: TTranslationEntity) => void;
};
export const TranslationEditDialog = ({ translation, onUpdate }: TranslationEditDialogProps) => {
  const [show, setShow] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);
  const router = useRouter();
  const tAdm = useTranslations('Admin');
  const t = useTranslations('AdminTranslations');
  return (
    <>
      <Button variant="ghost" onClick={() => setShow(true)}>
        <Pencil />
      </Button>
      <Modal
        className="sm:w-2/3"
        open={show}
        setOpen={setShow}
        title={t('Update translation')}
        footer={
          <SubmitButton
            onClick={() => setSubmitRequested(true)}
            isPending={submitRequested}
            label={t('Save translation')}
            pendingLabel={tAdm('wait')}
            icon={<Save />}
          />
        }
      >
        <TranslationForm
          translation={translation}
          submitRequested={submitRequested}
          onFormSubmit={data => {
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
