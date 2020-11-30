import React, {useState, useCallback} from 'react'
import Fixtures from '../../../components/Fixtures'
import fetch from 'isomorphic-unfetch'
import CustomLink from '../../../components/CustomLink';

const UpdateScores = (props) => {
    // create state from props
    const [fixtures, updateFixtures] = useState(props.fixtures)
    const submitToApi = useCallback(() => {

        let formData = new URLSearchParams()
        formData.append('data', JSON.stringify({
            fixtures: fixtures, 
            id: props.id
        }));

        fetch(`${process.env.NEXT_PUBLIC_API}/fixtures`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData
        }).then(res => res.json()).then(response => {
            const message = response.status ? response.message : response.error
            alert(message)
        }).catch(err => {
            console.error(err)
        })

    })
    return ( 
        <div className="container">
            <div className="header">
                <h1>{props.name}</h1>
                <CustomLink url={`/tournaments/${props.uid}`} label="Tournament Home" target="_blank"/> 
                <button onClick={submitToApi}>Update Scores</button>
            </div>
            <Fixtures fixtures={fixtures} 
                      players={props.players} 
                      editmode={true}
                      updateFixtures={updateFixtures}/>
            <style jsx>{`
                .container {
                    max-width: 800px;
                    margin: auto;
                }
                .header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
            `}</style>
        </div>
    )
}

UpdateScores.getInitialProps = async (context) => {

    const uid = context.query.id
    const data = await fetch(`${process.env.NEXT_PUBLIC_API}/tournament/${uid}`).then(res => res.json())

    // merge fixtures
    const mergedFixtures =  {}
    Object.keys(data.fixtures).forEach(groupLetter => {
        Object.keys(data.fixtures[groupLetter]).forEach(date => {
            if(!mergedFixtures[date]) {
                mergedFixtures[date] = data.fixtures[groupLetter][date]
            } else {
                mergedFixtures[date] = mergedFixtures[date].concat(data.fixtures[groupLetter][date])
            }
        })
    })

    return {
        id: data.id,
        uid: uid, 
        name: data.name, 
        players: data.players,
        tables: data.tables,
        fixtures: mergedFixtures,
        mergedFixtures: mergedFixtures,
    }
    return {}
}
 
 
export default UpdateScores