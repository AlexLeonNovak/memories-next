'use client';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  AccessibilityHelp,
  Autoformat,
  AutoLink,
  Autosave,
  BlockToolbar,
  Bold,
  ClassicEditor,
  Code,
  CodeBlock,
  EditorConfig,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlEmbed,
  Italic,
  Link,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  SelectAll,
  ShowBlocks,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Undo,
} from 'ckeditor5';
import { useEffect, useRef, useState } from 'react';

import 'ckeditor5/ckeditor5.css';
import './css/wysiwyg.css';

type TWysiwygProps = {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};
export const Wysiwyg = ({ value, onChange, onBlur }: TWysiwygProps) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const config: EditorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'showBlocks',
        'selectAll',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'code',
        '|',
        'link',
        'insertTable',
        'codeBlock',
        'htmlEmbed',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'accessibilityHelp',
      ],
      shouldNotGroupWhenFull: false,
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoLink,
      Autosave,
      BlockToolbar,
      Bold,
      Code,
      CodeBlock,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlEmbed,
      Italic,
      Link,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      SelectAll,
      ShowBlocks,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Undo,
    ],
    blockToolbar: ['bold', 'italic', '|', 'link', 'insertTable', '|', 'bulletedList', 'numberedList'],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph',
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1',
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2',
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3',
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4',
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5',
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6',
        },
      ],
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true,
        },
      ],
    },
    initialData: value,
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file',
          },
        },
      },
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true,
      },
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties'],
    },
  };

  return (
    <div className='main-container'>
      <div
        className='editor-container editor-container_classic-editor editor-container_include-block-toolbar'
        ref={editorContainerRef}
      >
        <div className='editor-container__editor'>
          <div ref={editorRef}>
            {isLayoutReady && (
              <CKEditor
                data={value}
                editor={ClassicEditor}
                config={config}
                onChange={(_, editor) => onChange && onChange(editor.getData())}
                onBlur={() => onBlur && onBlur()}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
