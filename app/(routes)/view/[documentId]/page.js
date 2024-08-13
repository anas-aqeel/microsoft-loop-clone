import React from 'react'
import RichTextEditorViewOnly from '../../_components/RichTextEditor/RichTextEditorViewOnly'

const Document = () => {

    return (
        <div
            className='pointer-events-none'
            style={{ outline: 'none' }}
        >
            <RichTextEditorViewOnly />
        </div>
    )
}

export default Document;
