import React, { useState} from 'react';
import { useCustomInput } from './useCustomInput';

const QuizSingle = ({incementCount,count,dd, data}) => {

    const { value:val, setValueHandler:setHandler } = useCustomInput();

    const saveData = () => {
        val && dd(val);
        incementCount()
    }

    return (
        <div id={`quiz-${count}`}>
            <h3>{data[count].question}</h3>
            <input type="radio" id={data[count].a} name={`question_${count}`} value={data[count].a} onChange={setHandler} checked={val===data[count].a}/>{data[count].a}
            <input type="radio" id={data[count].b} name={`question_${count}`} value={data[count].b} onChange={setHandler} checked={val===data[count].b}/>{data[count].b}
            <input type="radio" id={data[count].c} name={`question_${count}`} value={data[count].c} onChange={setHandler} checked={val===data[count].c}/>{data[count].c}
            <input type="radio" id={data[count].d} name={`question_${count}`} value={data[count].d} onChange={setHandler} checked={val===data[count].d}/>{data[count].d}
            <button type="button" onClick={saveData}>Save</button>
        </div>
    )
}

export default QuizSingle