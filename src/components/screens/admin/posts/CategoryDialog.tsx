'use client';

import {
  Button, CategoryForm,
  Modal,
} from '@/components';
import {LoaderCircle, Plus, Save} from 'lucide-react';
import {useState} from 'react';

export const CategoryDialog = () => {
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [submitRequested, setSubmitRequested] = useState(false);

  return (
    <>
    <Button className="ml-auto" type="button" variant="link" onClick={() => setShowCategoryDialog(true)}>
      <Plus />
      <span>Add new category</span>
    </Button>
      <Modal open={showCategoryDialog}
             setOpen={setShowCategoryDialog}
             title="Add new category"
             footer={(
               <Button type="button" onClick={() => setSubmitRequested(true)} disabled={submitRequested}>
                 {submitRequested
                   ? (<><LoaderCircle className="animate-spin" /><span>Please wait...</span></>)
                   : (<><Save /><span>Save</span></>)
                 }
               </Button>
             )}
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
}
