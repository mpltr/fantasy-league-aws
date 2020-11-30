import React, { Component } from 'react'
import NewPlayer from '../../components/NewPlayer'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

class CreateTournament extends Component {
    state = {
        screen: 0,
        tournamentName: '',
        numberOfPlayers: 2,
        numberOfGroups: 1,
        startDate: '',
        numberOfPvpFixtures: 1,
        weeksBetweenFixtures: 3,
        numberOfKnockoutRounds: 1,
        newPlayers: []
    }

    updatePlayerValue = (index, key, value) => {
        const newPlayersState = this.state.newPlayers
        if (!newPlayersState[index]) newPlayersState[index] = {}
        newPlayersState[index][key] = value
        this.setState({
            newPlayers: newPlayersState
        })
    }

    createTournament = () => {

        //  TODO: better validation 
        if(
            this.state.tournamentName
            && this.state.numberOfPlayers
            && this.state.numberOfGroups
            && this.state.startDate
            && this.state.numberOfPvpFixtures
            && this.state.weeksBetweenFixtures
            && this.state.numberOfKnockoutRounds
            && this.state.newPlayers.length === parseInt(this.state.numberOfPlayers)
            && this.state.newPlayers.every(player => {
                return player.hasOwnProperty('name');
            })         
        ) {
            let formData = new URLSearchParams();
            formData.append('data', JSON.stringify(this.state));
            fetch(`${process.env.NEXT_PUBLIC_API}/tournament`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            }).then(res => res.json()).then((response) => {
                Router.push(`/tournaments/${response.tournamentUid}`);
            }).catch(err => {
                console.error(err);
            })
        } else {
            alert('One or more fields missing');
        }
        
    }
    
    renderSettings() {
        
        return (
            <div>
                <h2>Tournament Settings</h2>
                <label for="tournamentName">Season (XXXX/XX)</label>
                <input name="tournamentName"
                       value={this.state.tournamentName}
                       onChange={(e) => this.setState({tournamentName: e.target.value})}
                       ></input>
                <label for="startDate">Start Date</label>
                <input name="startDate"
                    type="date"
                    value={this.state.startDate}
                    onChange={(e) => this.setState({ startDate: e.target.value })}
                ></input>
                <label for="numberOfPlayers">Number of Players</label>
                <input name="numberOfPlayers" 
                       type="number" 
                       value={this.state.numberOfPlayers}
                       min="2" 
                       max="56"
                       onChange={(e) => this.setState({numberOfPlayers: e.target.value})}
                       ></input>
                <label for="numberOfGroups">Number of Groups</label>
                <select name="numberOfGroups"
                        onChange={(e) => this.setState({ numberOfGroups: e.target.value })}
                >
                    <option value="1" selected={this.state.numberOfGroups == 1 ? 'selected' : ''}>1</option>
                    <option value="2" selected={this.state.numberOfGroups == 2 ? 'selected' : ''}>2</option>
                    <option value="4" selected={this.state.numberOfGroups == 4 ? 'selected' : ''}>4</option>
                    <option value="8" selected={this.state.numberOfGroups == 8 ? 'selected' : ''}>8</option>
                </select>
                <label for="numberOfPvpFixtures">Number of Times to play each player in group</label>
                <input name="numberOfPvpFixtures"
                       type="number"
                       value={this.state.numberOfPvpFixtures}
                       min="1"
                       max="4"
                       onChange={(e) => this.setState({ numberOfPvpFixtures: e.target.value })}
                ></input>
                <label for="weeksBetweenFixtures">Weeks between fixtures</label>
                <input name="weeksBetweenFixtures"
                       type="number"
                       value={this.state.weeksBetweenFixtures}
                       min="1"
                       max="10"
                       onChange={(e) => this.setState({ weeksBetweenFixtures: e.target.value })}
                ></input>
                <label for="numberOfKnockoutRounds">Number of Knockout Rounds</label>
                <input name="numberOfKnockoutRounds"
                        type="number"
                        value={this.state.numberOfKnockoutRounds}
                        min="1"
                        max="6"
                        onChange={(e) => this.setState({ numberOfKnockoutRounds: e.target.value })}
                ></input>
                <style jsx>{`
                        input, select {
                            text-align: left;
                            margin: 4px 0 8px 0;
                            width: calc(100% - 16px);
                        }
                        select {
                            width: 100%;
                        }
                    `}
                </style>
            </div>
        )
    }
    
    renderPlayers = () => {
        const players = [];
        for (let i = 0; i < this.state.numberOfPlayers; i++) {
            players.push(
                <NewPlayer index={i} player={this.state.newPlayers[i] ?? null} update={this.updatePlayerValue} />
            )
        }
        return (
            <div >
                <h2>Players</h2>
                {players}
                <style jsx global>{`
                    input {
                        margin-bottom: 4px;
                        width: 100%;
                        text-align: left;
                    }
                    h4 {
                        padding-left: 2px;
                        color: var(--darkGrey);
                    }
                `}
                </style>
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                {this.state.screen === 0 && this.renderSettings()}
                {this.state.screen === 1 && this.renderPlayers()}
                <div className="button-wrapper">
                    {this.state.screen > 0 && <button onClick={() => this.setState({screen: this.state.screen - 1 })}>Back</button>}
                    {this.state.screen < 1 && <button className="next" onClick={() => this.setState({ screen: this.state.screen + 1 })}>Next</button>}
                    {this.state.screen === 1 && <button onClick={() => this.createTournament()}>Create Tournament</button>}
                </div>

                <style jsx global>{`
                    .container {
                        max-width: 800px;
                        margin: auto;
                    }
                    .button-wrapper {
                        display: flex;
                        justify-content: space-between;
                    }
                    .next {
                        margin-left: auto;
                    }
                    button {
                        background-color: var(--teal);
                        border: none;
                        color: white;
                        padding: 12px 20px;
                        margin-top: 16px;
                        border-radius: 4px;
                    }
                `}
                </style>
            </ div>
        )
    }
}

export default CreateTournament;