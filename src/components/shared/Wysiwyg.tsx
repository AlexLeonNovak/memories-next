'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  GeneralHtmlSupport,
  Bold,
  Essentials,
  Italic,
  Mention,
  Paragraph,
  Undo,
  Link,
  List,
  Indent,
  IndentBlock,
  BlockQuote,
  SourceEditing,
  type EditorConfig,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import './css/wysiwyg.css';

type TWysiwygProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
export const Wysiwyg = ({ value, onChange, onBlur }: TWysiwygProps) => {
  const config: EditorConfig = {
    toolbar: {
      items: [
        'sourceEditing',
        'undo',
        'redo',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'blockQuote',
      ],
    },
    plugins: [
      GeneralHtmlSupport,
      Bold,
      Essentials,
      Italic,
      Mention,
      Paragraph,
      Undo,
      Link,
      List,
      Indent,
      IndentBlock,
      BlockQuote,
      SourceEditing,
    ],
    htmlSupport: {
      allow: [
        {
          name: /.*/,
          attributes: true,
          classes: true,
          styles: true,
        },
      ],
    },
    initialData: value,
  };

  return (
    <CKEditor
      data={value}
      editor={ClassicEditor}
      config={config}
      onChange={(_, editor) => onChange && onChange(editor.getData())}
      onBlur={() => onBlur && onBlur()}
    />
  );
};
