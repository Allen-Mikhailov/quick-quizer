import { useEffect, useState } from "react";

import "../scss/quizzes.scss"

import testquiz from "../quizes/testquiz";

const maxChoices = 5
const questionTypes = ["choice"]

function randomFromList(list)
{
    return list[Math.floor(Math.random()*list.length)]
}

function randomizeList(list)
{
    for (let i = 0; i < list.length; i++)
    {
        const newPlace = Math.floor(Math.random()*list.length)
        const temp = list[i]
        list[i] = list[newPlace]
        list[newPlace] = temp
    }
}

export default function() {
    const [questionCount, setQuestionCount] = useState(0)
    const [questionData, setQuestionData] = useState()

    function QuestionUpdate()
    {
        const newData = {}
        const qType = randomFromList(questionTypes)
        newData.questionType = qType
        const answerCatagory = randomFromList(testquiz["question-types"][qType])

        if (qType == "choice")
        {
            const useTermAsQuestion = Math.random()>.5;
            const term = randomFromList(Object.keys(testquiz.terms))

            if (useTermAsQuestion)
            {
                newData.question = term
                newData.answer = testquiz.terms[term][answerCatagory]
                const choices = []

                const rTermList = randomizeList(Object.keys(testquiz.terms))
                for (let i = 0; i < rTermList.length; i++)
                {
                    const tterm = rTermList[i]
                    if ()
                    if (choices.length >= maxChoices)
                        break;
                }
                
                randomizeList(choices)

            }

        }


        setQuestionData(questionData)
    }

    useEffect(QuestionUpdate, [])

    return <div>
        <div id="title">Quick Quiz</div>

        <div id="question"></div>
    </div>
}