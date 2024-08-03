"use client"
import React from 'react'
import Editor from '@stfy/react-editor.js'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/nested-list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Attaches from "@editorjs/attaches"

const EDITOR_JS_TOOLS = {
  embed: Embed,
  table: Table,
  marker: Marker,
  list: List,
  warning: Warning,
  code: Code,
  linkTool: LinkTool,
  image: Image,
  raw: Raw,
  header: Header,
  quote: Quote,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
  attaches: Attaches
}


const RichTextEditor = () => (
  <>
    <Editor
      autofocus
      tools={EDITOR_JS_TOOLS}
      holder="editorjs-container"
      excludeDefaultTools={['header']}
      onChange={() => console.log('Something is changing!!')}
      onData={(data) => console.log(data)}
      customTools={{
        header: {
          class: Header,
          config: {
            placeholder: 'Enter a header',
            levels: [2, 3, 4],
            defaultLevel: 3
          }
        }
      }}
      onReady={() => console.log('Start!')}
      data={{
        time: 1722718707947,
        blocks: [

        ],
      }
      }
    />

    < div id="editorjs-container" className='shadow-lg rounded-md py-4 px-3' >

    </div >

  </>
)

export default RichTextEditor
