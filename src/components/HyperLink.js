import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { store } from '../context/StateProvider';
import axios from 'axios'

const HyperLink = (props) => {
    const globalStateAndDispatch = useContext(store);
    const globalState = globalStateAndDispatch.state;
    const globalDispatch = globalStateAndDispatch.dispatch;
    // console.log(globalState.numberSelector);
    // console.log(globalDispatch);
    
    // const { state } = useContext(store);
    const { url, linkText } = props;
    const navigate = useNavigate();
    
    const submitHandler = (e) => {
        e.preventDefault()
        // console.log(`Url is: ${url}`);
        // console.log(`Link Text is: ${linkText}`);
        console.log(globalState.categorySelector)
        console.log(globalState.numberSelector)
        console.log(url)
        
        const urlSplit = url.split('/')
        console.log(`Url split is: ${urlSplit[0]}/${urlSplit[1]}`)
        
        globalDispatch({
            type: "hyperLinkCategoryUpdate",
            payload: {
                name: "categorySelector",
                value: urlSplit[0],
            }
        })
        globalDispatch({
            type: "hyperLinkNumberUpdate",
            payload: {
                name: "numberSelector",
                value: urlSplit[1],
            }
        })
        console.log(globalState.categorySelector)
        console.log(globalState.numberSelector)
        console.log(globalState.updatedPlanetID);
        
                
                
        axios.get(`https://swapi.dev/api/${globalState.categorySelector}/${globalState.numberSelector}`)
            .then((res)=>{
                console.log(res.data)
                navigate(`/${globalState.categorySelector}/${globalState.numberSelector}`)
            })
            .catch((error) => console.log(error))
    }

    return (
    <div>
        <p 
            style={{color: "blue", textDecoration: "underline"}} 
            onClick={(e) => submitHandler(e)} >
            {/* onClick={() => navigate(`/${url}`)}> */}
            {linkText} 
        </p>
    </div>
    )
}

export default HyperLink;