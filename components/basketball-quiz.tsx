"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const questions = [
  {
    prompt: "How long is a regulation NBA quarter?",
    options: ["10 minutes", "12 minutes", "15 minutes"],
    correct: 1,
    explanation: "Each regulation quarter lasts 12 minutes."
  },
  {
    prompt: "Who became the NBA's first unanimous MVP in 2016?",
    options: ["LeBron James", "Kevin Durant", "Stephen Curry"],
    correct: 2,
    explanation: "Stephen Curry received every first-place vote for the 2015–16 MVP award."
  },
  {
    prompt: "How many seconds are on a standard NBA shot clock?",
    options: ["24 seconds", "30 seconds", "35 seconds"],
    correct: 0,
    explanation: "The standard shot clock starts at 24 seconds."
  },
  {
    prompt: "How long is one NBA overtime period?",
    options: ["3 minutes", "5 minutes", "8 minutes"],
    correct: 1,
    explanation: "Each overtime period lasts five minutes."
  },
  {
    prompt: "How many points is a made free throw worth?",
    options: ["1 point", "2 points", "3 points"],
    correct: 0,
    explanation: "A successful free throw adds one point."
  }
];

export default function BasketballQuiz() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const hasInteracted = useRef(false);
  const question = questions[questionIndex];
  const answer = answers[questionIndex];
  const answered = answer !== undefined;
  const score = answers.filter((choice, index) => choice === questions[index].correct).length;

  useEffect(() => {
    if (!hasInteracted.current) return;
    if (answered) nextRef.current?.focus();
    else headingRef.current?.focus();
  }, [answered, questionIndex]);

  return (
    <section className="basketball-quiz" aria-labelledby="quiz-heading">
      <div className="quiz-top">
        <h3 id="quiz-heading">Play the NBA quiz</h3>
        <span>Score {score}/{questions.length}</span>
      </div>
      {question ? (
        <>
          <p className="quiz-progress">Question {questionIndex + 1} of {questions.length}</p>
          <h4 ref={headingRef} tabIndex={-1}>{question.prompt}</h4>
          <div className="quiz-options">
            {question.options.map((option, index) => (
              <button
                key={option}
                className={answered && index === question.correct ? "quiz-correct" : undefined}
                type="button"
                disabled={answered}
                onClick={() => {
                  hasInteracted.current = true;
                  setAnswers((previous) => previous.length === questionIndex ? [...previous, index] : previous);
                }}
              >
                {option}
              </button>
            ))}
          </div>
          <div role="status">
            {answered && <p className="quiz-feedback">{answer === question.correct ? "Correct." : "Good try."} {question.explanation}</p>}
          </div>
          {answered && (
            <button ref={nextRef} className="button button-primary quiz-action" type="button" onClick={() => setQuestionIndex(questionIndex + 1)}>
              {questionIndex === questions.length - 1 ? "See results" : "Next question"} <ArrowRight size={14} />
            </button>
          )}
        </>
      ) : (
        <>
          <h4 ref={headingRef} tabIndex={-1}>Final score {score} out of {questions.length}</h4>
          <button
            className="button button-primary quiz-action"
            type="button"
            onClick={() => {
              setAnswers([]);
              setQuestionIndex(0);
            }}
          >
            Play again <ArrowRight size={14} />
          </button>
        </>
      )}
    </section>
  );
}
