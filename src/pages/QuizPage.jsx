import { useEffect, useState } from "react";

import "../scss/quizzes.scss"

import testquiz from "../quizes/testquiz";

export default function() {
    const [questionCount, setQuestionCount] = useState(0)
    const [questionData, setQuestionData] = useState()

    function QuestionUpdate()
    {
        const newData = 


        setQuestionData(questionData)
    }

    useEffect(QuestionUpdate, [])

    return <div>
        <div id="title">Quick Quiz</div>

        <div id="question"></div>
    </div>
}