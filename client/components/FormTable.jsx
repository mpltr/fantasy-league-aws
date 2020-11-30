import React from 'react'

const FormTable = ({players}) => {

    const resultLookup = {
        0: 'L',
        1: 'D',
        3: 'W'
    }

    const sortByForm = (a,b) => {
        const aPrimary = players[a].formPoints
        const bPrimary = players[b].formPoints
        if(aPrimary == bPrimary) {
            // handle lookback
            const aForm   = [...players[a].form].reverse()
            const bForm   = [...players[b].form].reverse()
            const aLength = aForm.length
            const bLength = bForm.length
            const limit = aLength > bLength ? aLength - 1 : bLength -1
            // run through most most recent result
            for(let i = 0; i < limit; i++) {
                const aPoints = parseInt(aForm[i]);
                const bPoints = parseInt(bForm[i]);
                if(aPoints !== bPoints) return bPoints - aPoints;
            }
            return aLength - bLength;
        }
        return bPrimary - aPrimary
    }

    return (
        <>
            <table className="table table--form">
                <thead>
                    <tr>
                        <th className="header-cell--player"></th>
                        <th className="header-cell header-cell--form">Last 4 Matches</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(players).sort(sortByForm).map(playerId => {
                        const player = players[playerId]
                        const name = player.name
                        const form = player.form
                        return (
                            <tr className="row" key={playerId}>
                                <td className="cell">{name}</td>
                                <td className="cell cell--right">
                                    {form.map((result, key) => {
                                        const letter = resultLookup[result]
                                        return <span className={`result ${letter}`} key={key}>{letter}</span>
                                    })}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <style jsx>{`
                .result {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    height: 25px;
                    width: 25px;
                    color: var(--white);
                    font-size: 16px;
                    margin-right: 3px;
                    border-radius: 3px;
                }
                .W {
                    background-color: var(--teal);
                    padding-left: 1px;
                }
                .L {
                    background-color: var(--red);
                }
                .D {
                    background-color: var(--grey);
                    color: var(--darkGrey);
                }
            `}</style>
        </>
    )
}
export default FormTable