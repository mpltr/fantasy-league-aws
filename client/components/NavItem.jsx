import React, {useState} from 'react'
import { useRouter } from 'next/router'
import CustomLink from './CustomLink'

const NavItem = ({item}) => {

    const [open, setOpen] = useState(false)
    const {title, subitems, href} = item

    const { asPath } = useRouter()
    const isCurrent = href && href === asPath

    return (
        <CustomLink href={!isCurrent ? href : null}>
            <li className={isCurrent ? 'active' : ''} onClick={() => setOpen(!open)}>
                {title}
                {!subitems || !open ? null : (
                    <ul>
                        {subitems.map(subitem => {
                            return <NavItem item={subitem} key={subitem.title} />
                        })}
                    </ul>
                )}
                <style jsx>{`
                    li {
                        position: relative;
                        padding: 16px;
                        font-size: 18px;
                        color: var(--white);
                        user-select: none;
                    }
                    li::after {
                        display: block;
                        position: absolute;
                        top: 18px;
                        right: 16px;
                        font-size: 12px;
                        content: ${subitems ? '"▼"' : ''};
                        transform: ${open ? 'rotate(180deg)' : ''};
                    }
                    .active {
                        font-weight: bold;
                    }
                    ul {
                        padding-left: 0;
                        list-style: none;
                    }
                `}</style>
                    
            </li>
        </CustomLink>
    )
}

export default NavItem