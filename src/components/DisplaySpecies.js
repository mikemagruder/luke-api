import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Form from './Form';
import { store } from '../context/StateProvider'
import HyperLink from './HyperLink';

const DisplaySpecies = () => {
    const { state } = useContext(store);
    // const { numberSelector, categorySelector } = useParams();
    // // const { results, setResults } = props;
    const [ species, setSpecies ] = useState([])
    const [ people, setPeople ] = useState([])

    useEffect(() => {
        axios.get(`https://swapi.dev/api/species/${state.numberSelector}`)
            .then((res)=>{
                console.log(res.data)
                setSpecies(res.data)
            })
            .catch((error) => console.log(error))
    }, [ state.numberSelector ])

    return (
        <div style={{backgroundImage : `url('https://lumiere-a.akamaihd.net/v1/images/solo-chewbacca-main_80768fa8.jpeg?region=0%2C27%2C1560%2C780')`, color: "white" }}>
            <h1>Species of Star Wars!!!</h1>
            <p>Name: { species.name }</p>
            <p>Average Lifespan: { species.average_lifespan }</p>
            <p>Classification: { species.classification }</p>
            <p>Language: { species.language }</p>
            <p>Average Height: { species.average_height }</p>
            <h2>People of this Species</h2>
            {
                species?.people?.map((character, index) => {
                    return (
                        <p key={index}>
                            <HyperLink url={character.substring(22)} linkText={`character: ${index}`} />
                        </p>
                    )
                })
            }
        </div>
    )
}

export default DisplaySpecies;