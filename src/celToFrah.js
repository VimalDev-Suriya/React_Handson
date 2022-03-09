import { Fragment, useReducer } from "react"

const degreeReducerFunction = (state,actions) => {
    if(actions.type==="CEL"){
        return {
            cel:actions.org,
            fahr:actions.val
        }
    }

    if(actions.type==="FAHR"){
        return {
            cel:actions.val,
            fahr:actions.org,
        }
    }

    return {...state}
}

const CelToFrah = () => {

    const [degreeValue, degreeValueDispatch] = useReducer(degreeReducerFunction,{
        cel:'',
        fahr:''
    })

    const toFahHandler = event => {
        let va = (event.target.value)*9/5 + 32
        degreeValueDispatch({
            type:'CEL',
            val:va,
            org:event.target.value
        })
    }

    const toCelHandler = event => {
        let va = ( event.target.value - 32) * 5/9
        degreeValueDispatch({
            type:'FAHR',
            val:va,
            org:event.target.value
        })
    }

    return (
        <Fragment>
            <div className="my2">
                <h1>DEGREE TRANSLATIONS</h1>
                <input type="number" id="celcius" placeholder="enter the celcius value" value={degreeValue.cel} onInput={toFahHandler}/>
                <input type="number" id="fahrenheit" placeholder="enter the fahrenheit value" value={degreeValue.fahr} onInput={toCelHandler}/>
            </div>
        </Fragment>
    )
}

export default CelToFrah