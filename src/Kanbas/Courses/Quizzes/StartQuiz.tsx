import { Button } from "antd";
import { Quiz, QuizAttempt } from "../../../types";
import { useLocation, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getQuizAttemptsForQuiz } from "./client";

const StartQuiz = () => {
  const { cid, qid } = useParams();
  const location = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);

  const { quiz } = location.state as { quiz: Quiz };
  quiz.dueDate = new Date(quiz.dueDate);
  quiz.availableFrom = new Date(quiz.availableFrom);
  quiz.availableUntil = new Date(quiz.availableUntil);

  useEffect(() => {
    // Fetch quiz attempts
    const fetchQuizAttempts = async () => {
      console.log(qid, currentUser._id);
      if (!qid) return;
      const quizAttempts = await getQuizAttemptsForQuiz(
        qid as string,
        currentUser._id
      );
      setQuizAttempts(quizAttempts);
    };

    fetchQuizAttempts();
  }, [qid]);

  const formatTimeDifference = (date1Input: Date, date2Input: Date): string => {
    const date1 = new Date(date1Input);
    const date2 = new Date(date2Input);
    // Get the absolute difference in milliseconds
    const diffMs = Math.abs(date2.getTime() - date1.getTime());

    // Calculate the time units
    const minutes = Math.floor(diffMs / (1000 * 60)) % 60;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));

    // Build the result string
    let result = "";
    if (hours > 0) {
      result += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      if (result) result += ", ";
      result += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return result || "0 minutes";
  };

  const attemptHistory = (quizAttempt: QuizAttempt, key: number) => (
    <tr className="border-bottom">
      <td>{key === 0 && <b>LATEST</b>}</td>
      {/** TODO: Add <Link> inside the td below */}
      <td className="text-danger">Attempt {key + 1}</td>
      <td>
        {formatTimeDifference(quizAttempt.timeEnded, quizAttempt.timeStarted)}
      </td>
      <td>
        {quizAttempt.score} out of {quiz.points}
      </td>
    </tr>
  );

  return (
    <div className="start-quiz-screen">
      <h1>{quiz.title}</h1>
      <hr />
      <div className="d-flex justify-content-between">
        <span>
          <b>Due </b> {quiz.dueDate.toDateString()}
        </span>
        <span>
          <b>Points </b> {quiz.points}
        </span>
        <span>
          <b>Questions </b> {quiz.questions.length}
        </span>
        <div />
      </div>
      <span>
        <b>Available </b> {quiz.availableFrom.toDateString()} -{" "}
        {quiz.availableUntil.toDateString()}
      </span>
      <br />
      <span>
        <b>Time Limit </b> {quiz.timeLimit}
      </span>
      <hr />
      <h3>Attempt History</h3>
      {quizAttempts.length > 0 ? (
        <table className="table table-borderless align-middle">
          <thead className="border-bottom">
            <tr>
              <th scope="col"></th>
              <th scope="col">Attempt</th>
              <th scope="col">Time</th>
              <th scope="col">Score</th>
            </tr>
          </thead>
          <tbody>
            {quizAttempts.map((quizAttempt, key) =>
              attemptHistory(quizAttempt, key)
            )}
          </tbody>
        </table>
      ) : (
        <p>No attempts yet</p>
      )}
      <hr />
      <div
        className="start-quiz-page"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizScreen`}>
          <Button type="primary" danger>
            Start Quiz
          </Button>
        </a>
      </div>
    </div>
  );
};

export default StartQuiz;
