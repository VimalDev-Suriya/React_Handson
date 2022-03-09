import { useReducer, useState } from 'react'

const reducerFunction = (state,actions) => {
    if(actions.type === "FIRST"){
        return {
            firstInput:actions.val,
            secondInput:state.secondInput
        }
    }

    if(actions.type === "SECOND"){
        return {
            firstInput:state.firstInput,
            secondInput:actions.val
        }
    }

    if(actions.type === "RESET"){
        return {
            firstInput:'',
            secondInput:''
        }
    }
    return {...state}
}

const Calculator = () => {
    const [inputValue, inputValueDispatcher] = useReducer(reducerFunction,{
        firstInput:'',
        secondInput:''
    })

    const [ arthmentcResult, setArthmentcResult] = useState({
        result:'',
        isSubmitted:false,
        sym:'',
        numberOpes:0
    })


    const firstInputHandler = event => {
        inputValueDispatcher({
            type:'FIRST',
            val:+event.target.value
        })
    }

    const secondInputHandler = event => {
        inputValueDispatcher({
            type:'SECOND',
            val:+event.target.value
        })
    }

    const arthmeticHandler = operator => {
        switch(operator){
            case "ADD":{
                let res = inputValue.firstInput +  inputValue.secondInput
                setArthmentcResult(prevState => {
                    return {
                        result:res,
                        isSubmitted:true,
                        sym:'+',
                        numberOpes:++prevState.numberOpes
                    }
                });
                break
            }
            case "SUB":{
                let res = inputValue.firstInput - inputValue.secondInput
                setArthmentcResult(prevState => {
                    return {
                        result:res,
                        isSubmitted:true,
                        sym:'-',
                        numberOpes:++prevState.numberOpes
                    }
                });
                break
            }
            case "MUL":{
                let res = inputValue.firstInput * inputValue.secondInput
                setArthmentcResult(prevState => {
                    return {
                        result:res,
                        isSubmitted:true,
                        sym:'*',
                        numberOpes:++prevState.numberOpes
                    }
                });
                break
            }
            case "DIV":{
                let res = inputValue.firstInput / inputValue.secondInput
                setArthmentcResult(prevState => {
                    return {
                        result:res,
                        isSubmitted:true,
                        sym:'/',
                        numberOpes:++prevState.numberOpes
                    }
                });
                break
            }
        }
    }

    const resetTheFunction = () => {
        inputValueDispatcher({
            type:'RESET',
            val:''
        })
        setArthmentcResult({
            result:'',
            isSubmitted:false,
            sym:'',
            numberOpes:0
        })
    }

    return (
        <section>
            <h1>Calculator</h1>
            <h2>Number of Operations: {arthmentcResult.numberOpes}</h2>
            <input type="number" placeholder="Enter the value" value={inputValue.firstInput} onInput={firstInputHandler}/>
            {arthmentcResult.sym}
            <input type="number" placeholder="Enter the value" value={inputValue.secondInput}  onInput={secondInputHandler}/>

            <button onClick={arthmeticHandler.bind(null,'ADD')}>+</button>
            <button onClick={arthmeticHandler.bind(null,'SUB')}>-</button>
            <button onClick={arthmeticHandler.bind(null,'MUL')}>*</button>
            <button onClick={arthmeticHandler.bind(null,'DIV')}>/</button>

            <button onClick={resetTheFunction}>RESET</button>
            {
                arthmentcResult.isSubmitted ? <span>Result : {arthmentcResult.result}</span> : ''
            }
        </section>
    )
}

export default Calculator