import React from 'react'
import './Message.scss'

export default function Message({own}) {
  return (
    <div className={ own ? "message own" : "message"}>
        <div className='top'>
            <img
                src='https://i.pinimg.com/736x/6e/31/e5/6e31e54567cf3239e60d6c95e5f89091.jpg'
            />
            <p>using nearer necessary flew noun bill worker empty additional military molecular certain act dust accident dot mysterious cat likely course hurry queen fair by</p>
        </div>
        <div className='bottom'>1 hour ago</div>
    </div>
  )
}
