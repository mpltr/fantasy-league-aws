import React from 'react'
import CustomLink from '../components/CustomLink';
import Card from '../components/Card';
import Head from 'next/head'

const Index = ({tournaments}) => {
    return (
        <div className="container">
            <Head>
                <title>FPL Cup</title>
            </Head>
            {tournaments.map(tournament => {
                const uid = tournament.uid;
                return (
                    <CustomLink href={`/${uid}`} key={uid}>
                        <Card tournament={tournament}/>
                    </CustomLink>
                )
            })}
        </div>
    )
}

export default Index
