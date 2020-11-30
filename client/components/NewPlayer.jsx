import React from 'react';

const NewPlayer = (props) => {
    return ( 
        <>
            <h4>Player {props.index + 1}</h4>
            <input placeholder="Name" 
                   value={props.player ? props.player.name : ''} 
                   onChange={(e) => props.update(props.index, 'name', e.target.value)}/>
            <input placeholder="# Seed"
                   min="1"
                   max="4"
                   type="number"
                   value={props.player ? props.player.seed : ''}
                   onChange={(e) => props.update(props.index, 'seed', e.target.value)}/>
            {/* <input placeholder="FPL Link"
                   type="url"
                   value={props.player ? props.player.fplLink : ''} 
                   onChange={(e) => props.update(props.index, 'fplLink', e.target.value)}/> */}
        </> 
     );
}
 
export default NewPlayer;