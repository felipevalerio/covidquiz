import React, { useState, useEffect } from 'react';
import db from '../../db.json';
import Widget from '../../src/components/Widget';
import Button from '../../src/components/Button';
import QuizLogo from '../../src/components/QuizLogo';
import QuizContainer from '../../src/components/QuizContainer';
import QuizBackground from '../../src/components/QuizBackground';
import AlternativesForm from '../../src/components/AlternativesForm';

function ResultWidget({ results }) {
    return (
        <Widget>
            <Widget.Header>
                Tela de Resultado
            </Widget.Header>

            <Widget.Content>
                <p>Você acertou
                    {'   '} 
                    {/*{results.reduce((somatoriaAtual, resultAtual) => {
                        const isAcerto = resultAtual === true;
                        if(isAcerto) {
                            return somatoriaAtual + 1;
                        }
                        return somatoriaAtual;
                    }, 0)} */}
                    {results.filter((x) => x).length}
                    {'   '}
                    perguntas
                </p>
                <ul>
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            {index + 1} Resultado:
                            {'   '}
                            {result === true
                                ? 'Acertou'
                                : 'Errou'
                            }
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}


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
    onSubmit,
    addResult, }) {

    const [selectedAlternative, setSelectedAlternative] = useState(undefined);
    const [isQuestionSubmited, setIsQuestionSubmited] = useState(false);
    const questionId = `questionIndex__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    const hasAlternativeSelected = selectedAlternative !== undefined;

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

                <AlternativesForm onSubmit={(infosDoEvento) => {
                    infosDoEvento.preventDefault();
                    setIsQuestionSubmited(true);
                    setTimeout(() => {
                        addResult(isCorrect);
                        onSubmit();
                        setIsQuestionSubmited(false);
                        setSelectedAlternative(undefined);
                    }, 2 * 1000);
                    
                }}>
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
                        const isSelected = selectedAlternative === alternativeIndex;

                        return (
                            <Widget.Topic as="label" 
                                key={alternativeId} 
                                htmlFor={alternativeId}
                                data-selected={isSelected}
                                data-status={isQuestionSubmited && alternativeStatus} 
                            >
                                <input 
                                    style={{ display: 'none' }}
                                    id={alternativeId}
                                    name={questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
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

                    <Button type="submit" disabled={!hasAlternativeSelected}>
                        Confirmar
                    </Button>

                    {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
                    {isQuestionSubmited && !isCorrect && <p>Você errou</p>}
                </AlternativesForm>
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
    const [results, setResults] = useState([]);
    const questionIndex = currentQuestion;
    const question = db.questions[questionIndex];
    const totalQuestions = db.questions.length;


    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

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
                <a href="/">
                    <QuizLogo />
                </a>

                { screenState === screenStates.QUIZ && (
                    <QuestionWidget 
                        question={question}
                        totalQuestions={totalQuestions}
                        questionIndex={questionIndex}
                        onSubmit={handleSubmitQuiz}
                        addResult={addResult}
                    />
                )}
                
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
            </QuizContainer>
        </QuizBackground>
   );
}