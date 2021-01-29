import React, { useState, useEffect } from 'react';
import db from '../db.json';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';
import QuizBackground from '../src/components/QuizBackground';

function LoadingWidget() {
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Loading]
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({ 
    question, 
    totalQuestions,
    questionIndex,
    onSubmit }) {

    const questionId = `questionIndex__${questionIndex}`;
    return (
        <Widget>
            <Widget.Header>
            {
                <h3>
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            }
            </Widget.Header>

            <img 
                alt="Descrição"
                style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                }}
                src={question.image}
            />
            <Widget.Content>
                <h2>
                    {question.title}
                </h2>
                <p>
                    {question.description}
                </p>

                <form onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    onSubmit();
                }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return (
                            <Widget.Topic as="label" htmlFor={alternativeId}>
                                <input 
                                    // style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    type="radio"    
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    {/*
                    <pre>
                        {JSON.stringify(question, null, 4)}
                    </pre> */}

                    <Button type="submit">
                        Confirmar
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT',
};

export default function QuizPage() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [screenState, setScreenState] = useState(screenStates.LOADING);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;


    useEffect(() => {
        setTimeout(() => {
            setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;

        if (nextQuestion < totalQuestions) {
            setCurrentQuestion(nextQuestion);
        } else {
            setScreenState(screenStates.RESULT);
        }
    }

    return (
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo />

                { screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                        question={question}
                        totalQuestions={totalQuestions}
                        questionIndex={questionIndex}
                        onSubmit={handleSubmitQuiz}
                    />
                )}
                
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Você acertou X questões</div>}
            </QuizContainer>
        </QuizBackground>
   );
}