import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
// import { useForm } from 'react-hook-form';
import { store } from '../context/StateProvider';

const Form = () => {
  
  const globalStateAndDispatch = useContext(store);
  const globalState = globalStateAndDispatch.state;
  const globalDispatch = globalStateAndDispatch.dispatch;
//   console.log(globalState);
//   console.log(globalDispatch);

//   const { results, setResults } = props;
//   const { categorySelector, setCategorySelector } = props
//   const { numberSelector, setNumberSelector } = props
  // const [ categorySelector, setCategorySelector ] = useState("")
  // const [ numberSelector, setNumberSelector ] = useState("");
  let navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios.get(`https://swapi.dev/api/${globalState.categorySelector}/${globalState.numberSelector}`)
    .then((res) => {
      console.log(res.data)
    //   setResults(res.data)
      navigate(`/${globalState.categorySelector}/${globalState.numberSelector}`)
    //   console.log(globalState.newNumber)
    })
    .catch((err) => console.log(err))
  }
// console.log("Inside Form...")
// console.log(globalState.categorySelector);
// console.log(globalState.numberSelector);

  return (
    <div className="App">
      <h1>Star Wars API</h1>
      <h2>Using the drop down menu below, select a category and type in a number.</h2>
      <form 
      onSubmit={ submitHandler }
      >
        <label>Choose: </label>
        <select
            name="categorySelector"
            value={globalState.categorySelector}
            onChange={(e) => globalDispatch({
                type: "update",
                payload: {
                    name: e.target.name,
                    value: e.target.value,
                }
            })}>
          <option name="categorySelector" defaultValue>Make your selection!!!</option>
          <option name="categorySelector" value="planets">Planets</option>
          <option name="categorySelector" value="people">People</option>
          <option name="categorySelector" value="starships">Starships</option>
          <option name="categorySelector" value="species">Species</option>
        </select>
        {/* <label>Number:</label>
        <input onChange={(e) => setNumberSelector(e.target.value)} type="number" /> */}
        <label>Number:</label>
                <input type="number"
                    name="numberSelector"
                    value={globalState.numberSelector}
                    onChange={(e) => globalDispatch({
                        type: "update",
                        payload: {
                            name: e.target.name,
                            value: e.target.value,
                        }
                    })}
                    />
        <button>Choose</button>
      </form>
    </div>
  );
}

export default Form;