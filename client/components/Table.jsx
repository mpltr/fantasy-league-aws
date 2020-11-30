import React, { Component } from 'react'

class Table extends Component {
    state = {
        sortBy: 'points',
        descending: true
    }

    sortLookup = {
        P: {name: "played"},
        W: {name: 'win', noMobile: true},
        D: {name: 'draw', noMobile: true},
        L: {name: 'loss', noMobile: true},
        PF: {name: 'for', noMobile: true},
        PA: {name: 'against', noMobile: true},
        PD: {name: 'gd'},
        PTS: {name: 'points'}
    }

    setSort(e) {
        const newSortBy = e.target.innerText

        // change sort type if already sorted by new sort by
        if (this.state.sortBy === this.sortLookup[newSortBy].name) {
            this.setState({ descending: !this.state.descending })    
        } else {
            this.setState({descending: true});
            this.setState({sortBy: this.sortLookup[newSortBy].name})
        }

    }

    headerClass(key) {
        let headerClass = "header-cell";
        if(this.sortLookup[key].noMobile) headerClass = headerClass + ' no-mobile';
        if(this.sortLookup[key].name === this.state.sortBy) {
            const sortClass = this.state.descending ? ' header-cell--desc' : ' header-cell--asc';
            headerClass = headerClass + sortClass;
        }
        return headerClass
    }

    renderPlayers() {
        return this.props.tablePlayerIds.sort((a,b) => {
            const aPrimary = this.props.players[a][this.state.sortBy] || 0;
            const bPrimary = this.props.players[b][this.state.sortBy] || 0;
            const aSecondary = this.props.players[a].gd || 0
            const bSecondary = this.props.players[b].gd || 0
            if(aPrimary == bPrimary) return this.state.descending ? bSecondary - aSecondary : aSecondary - bSecondary;
            return this.state.descending ? bPrimary - aPrimary : aPrimary - bPrimary;
        }).map((playerId, i) => { 
            return (
                <tr className="row" key={i}>
                    <td className="cell">{this.props.players[playerId].name}</td>
                    <td className="cell">{this.props.players[playerId].played || 0}</td>
                    <td className="cell no-mobile">{this.props.players[playerId].win || 0}</td>
                    <td className="cell no-mobile">{this.props.players[playerId].draw || 0}</td>
                    <td className="cell no-mobile">{this.props.players[playerId].loss || 0}</td>
                    <td className="cell no-mobile">{this.props.players[playerId].for || 0}</td>
                    <td className="cell no-mobile">{this.props.players[playerId].against || 0}</td>
                    <td className="cell">{this.props.players[playerId].gd || 0}</td>
                    <td className="cell">{this.props.players[playerId].points || 0}</td>
                    <style jsx>{`
                        .row:nth-child(${this.props.numberOfGroupTeamsToProgress}) td {
                            border-bottom: ${this.state.sortBy === 'points' && this.state.descending ? '1px dashed var(--grey)' : 'none'};
                        }
                    `}
                    </style>
                </tr>
            )
        })
    }

    render() {
        return (
            <>
                <table className="table">
                    <thead>
                        <tr>
                            <th className="header-cell header-cell--player"></th>
                            {Object.keys(this.sortLookup).map(key => {
                                return(
                                    <th onClick={(e) => this.setSort(e)}
                                        className={this.headerClass(key)}
                                        key={key}>
                                        {key}
                                    </th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderPlayers()}
                    </tbody>
                </table>
                <div className="rotate">Rotate for more info</div>
                <style jsx>{`
                    
                    `}
                </style>
            </>
        );
    }
}

export default Table