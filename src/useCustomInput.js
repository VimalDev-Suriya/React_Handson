import { useState } from "react";

export const useCustomInput = () => {

    const [value, setValue] = useState('');

    const setValueHandler = event => {

        setValue(event.target.value)
        
    }

    return {
        value,
        setValueHandler
    }
}
