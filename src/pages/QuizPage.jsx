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
    newlist[i] = list[newPlace];
    newlist[newPlace] = temp;
  }

  return newlist
}

function ChoicesQuiz({ questionData, QuestionUpdate })
{
    return <div>
      <div className="choices-question">{questionData.question}</div>
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

      let getQ;

      if (useTermAsQuestion) {
        newData.question = term;
        newData.answer = testquiz.terms[term][answerCatagory];
        getQ = (tterm) => testquiz.terms[tterm][answerCatagory]
      } else {
        getQ = (tterm) => tterm

        newData.question = testquiz.terms[term][answerCatagory];
        newData.answer = term;
      }

      choices.push(getQ(term))

      for (let i = 0; i < rTermList.length; i++) {
        const tterm = rTermList[i];
        if (tterm == term || newData.answer == getQ(term)) continue;
        choices.push(getQ(tterm))

        if (choices.length >= maxChoices) break;
      }

      randomizeList(choices);
      newData.choices = choices
    }

    setQuestionData(newData);
  }

  useEffect(QuestionUpdate, []);

  return (
    <div>
      <div id="title">Quick Quiz</div>

      {questionData.questionType == "choices" && <ChoicesQuiz questionData={questionData} QuestionUpdate={QuestionUpdate} />}
    </div>
  );
}
