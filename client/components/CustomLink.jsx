import React from 'react'
import Link from 'next/link'

const CustomLink = ({href,  children, target='_self'}) => {
    return  (
        !href ? <>{children}</> : 
            <Link href={href}>
                <a target={target} onClick={e => e.stopPropagation()}>
                    {children}
                </a>
                    
            </Link>
    )
}

export default CustomLink;