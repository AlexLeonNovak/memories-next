'use client';

import { useRef } from 'react';
import JoditEditor from 'jodit-react';
import { Jodit } from 'jodit/esm/jodit';
import './css/wysiwyg.css';

type TWysiwygProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value?: string) => void;
};
export const Wysiwyg = ({ value, onChange, onBlur }: TWysiwygProps) => {
  const editorRef = useRef<Jodit | null>(null);

  const onFullSizeChange = (enable: boolean) => {
    document.body.classList.toggle('editor-full-size-opened', enable);
  };

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: 'Type or paste your content here!',
    globalFullSize: false,
    addNewLine: false,
    events: {
      toggleFullSize: onFullSizeChange,
    },
  };

  return (
    <div className='editor-container'>
      <JoditEditor
        ref={editorRef}
        value={value || ''}
        config={config}
        onChange={(content) => onChange && onChange(content)}
        onBlur={(content) => onBlur && onBlur(content)}
      />
    </div>
  );
};
