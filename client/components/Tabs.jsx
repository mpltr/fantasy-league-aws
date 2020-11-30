import React, {useState} from 'react';

const Tabs = (props) => {
    const [tab, setTab] = useState(0);
    // catch if a single child is passed and create array of children instead
    const children = props.children.length == undefined ? [props.children] : props.children
    return ( 
        <div className="wrapper">
            <div className="header">
                {children.filter(child => child !== undefined).map((child, index) => {
                    return (
                        <button key={index} 
                                className={tab === index ? `tab tab-${props.color}` : 'tab' }
                                onClick={() => setTab(index)}>
                            {child.props.tabtitle ?? 'Set Tab Title'}
                        </button>
                    )
                })}
            </div>
            <div>
                {children.filter(child => child !== undefined).map((child, index) => {
                    return (
                        <div key={index}
                             className={tab === index ? 'content-active' : 'content-hidden'}>
                            {child}
                        </div>
                    )
                })}
            </div>
            <style jsx>{`
                .wrapper {
                    position: relative;
                }
                
                .header {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    margin-bottom: 16px;
                    border-radius: 4px;
                    overflow: hidden;
                }
                .tab {
                    position: relative;
                    flex-grow: 1;
                    flex-basis: 10%;
                    border: none;
                    background-color: #f0f0f0;
                    padding: 16px 4px;
                    text-transform: uppercase;
                    font-size: 11px;
                    color: grey;
                    white-space: nowrap;
                    user-select: none;
                    letter-spacing: 0.3px;
                }
                .tab-red {
                    background-color: var(--red);
                    color: #fff;
                    font-weight: bold;
                }
                .tab-purple {
                    background-color: var(--purple);
                    color: #fff;
                    font-weight: bold;
                }
                .tab-teal {
                    background-color: var(--teal);
                    color: var(--white);
                    font-weight: bold;
                }
                .tab-blue {
                    background-color: var(--blue);
                    color: var(--darkGrey);
                    font-weight: bold;
                }
                .tab-active:after {
                    display: none;
                }
                .tab:active, 
                .tab:focus, 
                .tab:hover
                .tab-active:active, 
                .tab-active:focus, 
                .tab-active:hover {
                    outline:none;
                }
                .content-active {
                    width: 100%;
                }
                .content-hidden {
                    display: none;
                }
                
            `}</style>
        </div>
     );
}
 
export default Tabs;