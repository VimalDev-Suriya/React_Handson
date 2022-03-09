import { useState } from "react"

const FormValidations = () => {

    const [name,setName] = useState('');
    const [blurName, setBlurName] = useState(false);
    const [creditCardError, setCreditCardError] = useState({
        isError:false,
        stateMent:'',
        length:[]
    })

    // {
    //     initValue:'',
    //     monthValue:'',
    //     yearValue:''
    // }
    const [monthYear, setMonthYear] = useState('XX/XX');
    const [monthYearError, setMonthYearError] = useState({
        isError:false,
        stateMent:'',
        length:[]
    })

    const nameChangeHandler = event => {
        let rg = /\d/gi;

        if(rg.test(event.nativeEvent.data) || event.nativeEvent.inputType === "deleteContentBackward"){
            if(creditCardError.length.length <= 15 || event.nativeEvent.inputType === "deleteContentBackward"){
                setName(event.target.value);
                setCreditCardError(prevState => {
                    if(event.nativeEvent.inputType === "deleteContentBackward"){
                        prevState.length.pop()
                    }else{
                        prevState.length.push(event.nativeEvent.data)
                    }
                    return {
                        isError:false,
                        stateMent:'',
                        length:[...prevState.length]
                    }
                })
            }else{
                setCreditCardError(prevState => {
                    return {
                        isError:true,
                        stateMent:'Card Number should not extend more that 16',
                        length:prevState.length
                    }
                })
            }
        }else{
            setCreditCardError(prevState => {
                return {
                    isError:true,
                    stateMent:'Only Numbers allowed',
                    length:prevState.length
                }
            })
        }

    }

    const nameBlurHandler = () => {
        setBlurName(true);
        if(creditCardError.length.length === 0){
            setCreditCardError(prevState => {
                return {
                    isError:true,
                    stateMent:'Cannot be Empty',
                    length:prevState.length
                }
            })
        }else if(creditCardError.length.length <= 15){
            setCreditCardError(prevState => {
                return {
                    isError:true,
                    stateMent:'Card Number should not extend more that 16',
                    length:prevState.length
                }
            })
        }
    }

    const monthYearChangeHandler = event => {
        let rg = /\d/gi;
        let data = event.target.value
        console.log(data)
        let modulated = data.split('').reduce((acc,item) => {
            return acc.replace('X',item)
        },'XX/XX')

        console.log(modulated)

        if(rg.test(event.nativeEvent.data) || event.nativeEvent.inputType === "deleteContentBackward"){
            // if(event.nativeEvent.data >0 && event.nativeEvent.data<=9){

            // }
            // if(event.nativeEvent.data || event.nativeEvent.inputType === "deleteContentBackward"){
                

                // console.log(modulated)
                setMonthYear(prevState => {
                    
                    return modulated
                })
            // }
        }
    }
    return (
        <form>
            <input type="text" placeholder="Enter the Credit card Number" value={name} onChange={nameChangeHandler} onBlur={nameBlurHandler}/>
            { creditCardError.isError && <p className="error-text">{creditCardError.stateMent}</p>}

            <input type ="text" placeholder="MM/YY" value={monthYear} onChange={monthYearChangeHandler}/>

            <button type="submit">SUBMIT</button>
        </form>
    )
}

export default FormValidations