import React from 'react'
const SliceText = ({children, number}) => {
    return (
        <>
            {children && children.length > number ? `${children.slice(0, number)}...` : children}
        </>
    )
}

export default SliceText

