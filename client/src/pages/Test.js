import { useState } from 'react'
import Picker from 'emoji-picker-react'

export default function Test() {
  const [chosenEmoji, setChosenEmoji] = useState(null)

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
  }

  return (
    <div>
      <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} native />
      {chosenEmoji && <EmojiData chosenEmoji={chosenEmoji} />}
    </div>
  )
}

const EmojiData = ({ chosenEmoji }) => <div>{chosenEmoji.emoji}</div>
