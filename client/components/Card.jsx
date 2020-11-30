import React from 'react'

const Card = ({tournament}) => {
    
    const {numberOfGroups, 
           numberOfKnockoutRounds, 
           startDate, 
           tournamentName, 
           weeksBetweenFixtures} = tournament;

    return (
        <div>
            <span className="span">{`Season: ${tournamentName}`}</span>
            <span className="span">{`Start Date: ${startDate}`}</span>
            <span className="span">{`Weeks between fixtures: ${weeksBetweenFixtures}`}</span>
            <span className="span">{`No Groups: ${numberOfGroups}`}</span>
            <span className="span">{`No Knockout Rounds: ${numberOfKnockoutRounds}`}</span>
            <style jsx>{`
                div {
                    background-color: var(--teal);
                    color: var(--white);
                    padding: 16px;
                    margin-bottom: 16px;
                    border-radius: 5px;
                    box-shadow: var(--shadow);
                    max-width: 320px;
                }
                span {
                    display: block;
                }
                span:first-child {
                    font-size: 18px;
                    margin-bottom: 8px;
                }
            `}</style>
        </div>
    )
}
export default Card