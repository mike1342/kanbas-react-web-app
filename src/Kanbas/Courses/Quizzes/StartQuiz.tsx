import { Button } from "antd";
import { Quiz } from "../../../types";
import { useParams } from "react-router";

const StartQuiz = () => {
  const { cid, qid } = useParams();
  return (
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
  );
};

export default StartQuiz;
