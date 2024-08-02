import { Button } from '@/components/ui/button'
import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'

const EmojiPickerConponent = ({ children, setEmoji, parentAttributes = { variant: "outline" } }) => {
    let [openPicker, setOpenPicker] = useState(false)
    return (
        <div>
            <Button {...parentAttributes} onClick={() => { setOpenPicker(!openPicker) }}>
                {children}
            </Button>
            {openPicker &&
                <div className='absolute z-10'>
                    <EmojiPicker onEmojiClick={(e) => {
                        setEmoji(e.emoji)
                        setOpenPicker(false)
                    }} />
                </div>
            }
        </div>
    )
}

export default EmojiPickerConponent