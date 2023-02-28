import { useEffect, useState } from "react";

import "../scss/quizzes.scss";

import testquiz from "../quizes/testquiz";

const maxChoices = 5;
const questionTypes = ["choice"];

function randomFromList(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function randomizeList(list) {
  const newlist = [...list]
  for (let i = 0; i < list.length; i++) {
    const newPlace = Math.floor(Math.random() * list.length);
    const temp = newlist[i];
    newlist[i] = newlist[newPlace];
    newlist[newPlace] = temp;
  }

  return newlist
}

function ChoicesQuiz({ questionData, QuestionUpdate })
{
    return <div>
      <div className="choices-question">{questionData.questionText}</div>
      <div className="choice-box">
        {(questionData.choices).map((value) => 
          <div key={value} className="choice-button">
            <div className="choice-text">{value}</div>
          </div>
        )}
      </div>
    </div>
}

export default function () {
  const [questionCount, setQuestionCount] = useState(0);
  const [questionData, setQuestionData] = useState({});

  function QuestionUpdate() {
    const newData = {};
    const qType = randomFromList(questionTypes);
    newData.questionType = qType;
    const answerCatagory = randomFromList(testquiz["question-types"][qType]);

    if (qType == "choice") {
      const useTermAsQuestion = Math.random() > 0.5;
      const term = randomFromList(Object.keys(testquiz.terms));

      const choices = [];
      const rTermList = randomizeList(Object.keys(testquiz.terms));

      let getQ, getA;
      const termReturn = (tterm) => tterm;
      const catagoryReturn = (tterm) => testquiz.terms[tterm][answerCatagory];

      if (useTermAsQuestion) {
        getQ = termReturn
        getA = catagoryReturn
      } else {
        getQ = catagoryReturn
        getA = termReturn
      }

      newData.question = getQ(term);
      newData.answer = getA(term);
      newData.questionText = newData.question+ "?"

      choices.push(getA(term))

      for (let i = 0; i < rTermList.length; i++) {
        const tterm = rTermList[i];
        if (getQ(term) == getQ(tterm) || getA(term) == getA(tterm) || choices.indexOf(getQ(tterm)) != -1) continue;
        choices.push(getA(tterm))

        if (choices.length >= maxChoices) break;
      }

      randomizeList(choices);
      newData.choices = choices
    }

    console.log(newData)

    setQuestionData(newData);
  }

  useEffect(QuestionUpdate, []);

  return (
    <div>
      <div id="title">Quick Quiz</div>

      {questionData.questionType == "choice" && <ChoicesQuiz questionData={questionData} QuestionUpdate={QuestionUpdate} />}
    </div>
  );
}
