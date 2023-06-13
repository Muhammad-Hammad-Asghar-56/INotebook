import React from 'react'

const MessageDiv = ({pageTitle,pageDesc,children}) => {
    return (
        <div class="container mt-24 text-center">
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{pageTitle}</h1>
            <p class="mt-6 text-base leading-7 text-gray-600">{pageDesc}</p>
            {children}
        </div>
    )
}

export default MessageDiv
