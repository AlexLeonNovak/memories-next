'use client';

import {
  Button, CategoryForm,
  Modal, SubmitButton,
} from '@/components';
import {Plus, Save} from 'lucide-react';
import {useState} from 'react';

export const CategoryDialog = () => {
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);

  return (
    <>
      <Button className="ml-auto" type="button" variant="link" onClick={() => setShowCategoryDialog(true)}>
        <Plus/>
        <span>Add new category</span>
      </Button>
      <Modal open={showCategoryDialog}
             setOpen={setShowCategoryDialog}
             title="Add new category"
             footer={<SubmitButton onClick={() => setSubmitRequested(true)}
                                   isPending={submitRequested}
                                   label="Create category"
                                   pendingLabel="Please wait..."
                                   icon={<Save/>}
             />}
      >
        <CategoryForm submitRequested={submitRequested}
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
