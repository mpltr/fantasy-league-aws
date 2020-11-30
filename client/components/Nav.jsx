import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import NavItem from './NavItem'
import CustomLink from './CustomLink';

const Nav = ({tournaments}) => {
    const [open, setOpen] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const handleRouteChange = (url) => {
            setOpen(false);
        }

        router.events.on('routeChangeComplete', handleRouteChange);
    })

    const isHome = router.asPath === "/" 
    const navItems = [
        {
            'title': 'Seasons',
            'subitems': tournaments.map(tournament => {
                const {uid, tournamentName} = tournament
                return {
                    title: tournamentName,
                    href: `/${uid}`
                }
            })
}
    ];

    return (
        <>
            <div className="nav">
                <CustomLink href={isHome ? null : "/"}>
                    <div className="logo-wrapper">
                        <img className="logo" src="/fpl-alt.png" />
                    </div>
                </CustomLink>
                <button className="burger" onClick={() => setOpen(!open)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </button>
            </div>
            <ul className="menu">
                {navItems.map(item => {
                    return <NavItem item={item} key={item.title} />
                })}
            </ul>
            <style jsx>{`
                .nav {
                    position: fixed;
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    height: 50px;
                    background-color: var(--purple);
                    margin: auto;
                    z-index: 100;
                }

                .logo-wrapper {
                    height: 50px;
                    padding: 0 12px;
                    text-align: center;
                }

                .logo {
                    margin-top: 5px;
                    height: 40px;
                }

                .burger {
                    height: 100%;
                    width: 66px;
                    background-color: transparent;
                    padding: 8px;
                }

                .burger:focus {
                    outline: none;
                }

                .bar {
                    position: relative;
                    width: 50%;
                    height: 2px;
                    background-color: var(--white);
                    margin: 4px 25%;
                    transition: all 0.2s;
                }

                .bar:first-child {
                    top: ${open ? '6px' : '0'};
                    transform: ${open ? 'rotate(45deg)' : 'none'}
                }

                .bar:last-child {
                    top: ${open ? '-6px' : '0'};
                    transform: ${open ? 'rotate(-45deg)' : 'none'}
                }

                .bar:nth-child(2) {
                    opacity: ${open ? '0' : '1'};
                }

                .menu {
                    position: fixed;
                    margin: 0;
                    top: 50px;
                    right: 0;
                    width: 100%;
                    max-width: 320px;
                    height: calc(100vh - 50px);
                    background-color: var(--purple);
                    box-shadow: var(--shadowLeft);
                    list-style: none;
                    color: var(--white);
                    font-size: 16px;
                    padding-left: 0;
                    transition: transform 0.2s;
                    z-index: 50;
                    transform: ${open ? 'none' : 'translateX(100%)'}
                }
            `}</style>
        </>
    );
}

export default Nav;