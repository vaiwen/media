import React, { useState } from 'react'
import { GoChevronDown, GoChevronLeft } from 'react-icons/go'

const ExpandablePanel = ({ header, children }) => {

    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className='mb-2 rounded border'>
            <div className='flex p-2 justify-between items-center'>
                <div className=' flex items-center justify-between'>
                    {header}
                </div>
                <div className='cursor-pointer' onClick={handleClick}>
                    {!expanded ? <GoChevronDown size={25} /> : <GoChevronLeft size={25} />}
                </div>
            </div>
            {expanded && <div className='p-2 border-t'> {children} </div>}
        </div>
    )
}

export default ExpandablePanel