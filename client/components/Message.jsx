import React, {useState} from 'react';

const Message = ({updates}) => {
    const [open, setOpen] = useState(false);

    return !updates ? null : (
        <div className="wrapper">
            <button className="alert" onClick={() => setOpen(!open)}>
                Updates
                <div className="icon">!</div>
            </button>
                <div className={`modal${open ? ' modal--open' : ''}`}>
                    <div className="header">
                        <h2 className="title">Updates</h2>
                        <button className="close" onClick={() => setOpen(!open)}></button>
                    </div>
                    <div className="messages">
                        {updates && updates.map(update => {
                            return(
                                <div className="message">
                                    <span className="date">{update.date}</span> 
                                    <h2>{update.title}</h2>
                                    <div className="body" dangerouslySetInnerHTML={{__html: update.body}}>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            <style jsx>{`

                .alert {
                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    background-color: transparent;
                    color: var(--darkGrey);
                }

                .alert:focus {
                    outline: none;
                }   

                .icon {
                    color: var(--red);
                    border: 2px solid var(--red);
                    border-radius: 50%;
                    width: 24px;
                    height: 22px;
                    padding: 2px 0 0 0;
                    font-size: 18px; 
                    margin-left: 6px;
                }  

                .modal {
                    position: fixed;
                    top: 0;
                    right: 0;
                    height: 100vh;
                    border-left: 1px solid var(--grey);
                    width: 95%;
                    max-width: 460px;
                    border-radius: 5px 0 0 5px;
                    overflow: hidden;
                    box-shadow: var(--shadowLeft);
                    z-index: 9999;
                    background-color: var(--white);
                    transform: translateX(100%);
                    transition: transform 0.2s ease-out;
                }           

                .title {
                    margin: 0;
                }
                .modal--open {
                    transform: none;
                }

                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background-color: var(--teal);
                    padding: 20px;
                    color: var(--white);
                }     

                .close {
                    width: 24px;
                    height: 24px;
                    position: relative;
                    background-color: transparent;
                    padding: 0;
                }

                .close:after, .close:before {
                    content: "";
                    position: absolute;
                    left: 11px;
                    top: 0;
                    width: 2px;
                    height: 24px;
                    background-color: var(--white);
                    transform: rotate(45deg);
                }

                .close:before {
                    transform: rotate(-45deg);
                }

                .messages {
                    padding: 0 20px;
                }

                .message {
                    border-bottom: 1px solid var(--lightGrey);
                    padding: 24px 0;
                }

                h2 {
                    padding: 0;
                    margin: 0 0 8px 0;
                }

                .body {
                    font-size: 14px;
                }
               
            `}</style>
        </div>
    )
}

export default Message;