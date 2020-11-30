import React, { Component } from 'react';

class Fixtures extends Component {

    renderUserDate(date) {
        return (
            <h3 className="date">{date}
                <style jsx>{`
                    .date {
                        display: block;
                        font-size: 13px;
                        text-align: center;
                        color: var(--darkGrey);
                        font-weight: bold;
                        margin-bottom: 8px;
                    }
                `}</style>
            </h3>
        )
    }

    renderAdminDate(date) {
        return (
            <>
                <input className="date"
                       type="date"
                       value={date}
                       onChange={e => {
                            const newDate = e.target.value;
                            const newFixtures = { ...this.props.fixtures};
                            newFixtures[newDate] = this.props.fixtures[date]
                            delete newFixtures[date]                                    
                            this.props.updateFixtures(newFixtures)
                       }}>
                </input>
                <style jsx>{`
                    .date {
                        margin: auto;
                    }
                `}</style>
            </>
        )
    }

    renderUserScore(score) {
        return (
            <div className="score">
                {score || '-'}
                <style jsx>{`
                    .score {
                        width: 40px;
                        color: ${ score ? 'var(--white)' : 'var(--darkGrey)'};
                        background-color: ${ score ? 'var(--blue)' : 'var(--lightGrey)'};
                        margin: 0 1px;
                        padding: 4px;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    }

    renderAdminScore(score, date, index, home=false) {
        return (
            <>
                <input  className="score"
                        type="number"
                        value={score || ""}
                        onChange={e => {
                            const newFixtures = {...this.props.fixtures}
                            const idKey = home ? 'homePlayerScore' : 'awayPlayerScore';
                            newFixtures[date][index][idKey] = e.target.value
                            this.props.updateFixtures(newFixtures)
                        }}>
                
                </input>
                <style jsx>{`
                    .score {
                        width: 40px;
                        color: var(--darkGrey);
                        background-color: var(--lightGrey);
                        margin: 0 1px;
                        padding: 4px;
                        text-align: center;
                    }
                `}</style>
            </>
        )
    }
 
    render() { 
        return ( 
            <div className="container">
                {this.props.fixtures && Object.keys(this.props.fixtures).sort().map((date, i) => {
                    return (
                        <div className="wrapper" key={i}>
                            {this.props.editmode 
                            ? this.renderAdminDate(date) 
                            : this.renderUserDate(date)}
                            <div className="week-fixtures">
                                {this.props.fixtures[date].map((fixture, k) => {
                                    const homePlayer = this.props.players[fixture.homePlayerId];
                                    const awayPlayer = this.props.players[fixture.awayPlayerId];
                                    return(
                                        <div className="fixture" key={k}>
                                            <div className="name home">{homePlayer.name}</div>
                                            {this.props.editmode
                                            ? this.renderAdminScore(fixture.homePlayerScore, date, k, true)
                                            : this.renderUserScore(fixture.homePlayerScore)}
                                            {this.props.editmode
                                            ? this.renderAdminScore(fixture.awayPlayerScore, date, k)
                                            : this.renderUserScore(fixture.awayPlayerScore)}
                                            <div className="name">{awayPlayer.name}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                   <style jsx>{`
                        .container {
                            padding-top: 32px;
                        }
                        .week-fixtures {
                            padding: 8px 0 32px 0;
                        }
                        .fixture {
                            display: flex;
                            justify-content: center;
                            margin-bottom: 4px;
                        }
                        .name {
                            width: calc(50% - 42px);
                            padding: 4px 8px;
                            color: var(--darkGrey);
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .home {
                            text-align: right;
                            padding: 4px 8px;
                        }

                        @media (max-width: 567px) {
                            .container {
                                padding-top: 8px;
                            }                           
                        }
                    `}</style>
            </div>
        );
    }
}
 
export default Fixtures;