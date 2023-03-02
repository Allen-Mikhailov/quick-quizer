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

function ChoicesQuiz({ questionData, click, questionNumber })
{

    return <div>
      <div className="choices-question">{questionData.questionText}</div>
      <div className="choice-box">
        {(questionData.choices).map((value) => 
          <div key={value+"-"+questionNumber} id={"choice-value-"+value} className="choice-button" onClick={() => {
            click(value)

          }}>
            <div className="choice-text">{value}</div>
          </div>
        )}
      </div>
    </div>
}

export default function () {
  const [ score, setScore ] = useState(0);
  const [ questionNumber, setQuestionNumber ] = useState(0)
  const [ questionData, setQuestionData ] = useState({});

  function QuestionUpdate() {

    setQuestionNumber(questionNumber+1)

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
        if (getQ(term) == getQ(tterm) || getA(term) == getA(tterm) || choices.indexOf(getA(tterm)) != -1) continue;
        choices.push(getA(tterm))

        if (choices.length >= maxChoices) break;
      }
      newData.choices = randomizeList(choices);
    }

    console.log(newData)

    setQuestionData(newData);
  }

  useEffect(QuestionUpdate, []);

  function click(value)
  {
    const scored = value == questionData.answer
    const button = document.getElementById("choice-value-"+value)

    const animPart = document.createElement("div")
    animPart.className = "choice-button-effect"
    animPart.style.borderColor = scored? "green":"red"
    button.appendChild(animPart)
    button.classList.add("choice-button-click")

    setTimeout(() => {
      button.removeChild(animPart)
      QuestionUpdate();
    } , 250)

    if (scored)
      setScore(score+1)
    else
      setScore(score-1)
  }

  return (
    <div>
      <div id="title">Quick Quiz</div>
      <div className="score">{score}</div>
      {questionData.questionType == "choice" && <ChoicesQuiz 
        questionData={questionData}  
        click={click}
        questionNumber={questionNumber}
        />}
    </div>
  );
}
