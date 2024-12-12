import { useLocation, useNavigate } from "react-router";
import QuizAttemptComponent from "./QuizAttemptComponent";
import { Quiz, QuizAttempt } from "../../../types";
import { Button } from "antd";

const QuizAttemptScreen = () => {
  const location = useLocation();
  const { quiz, latestAttempt } = location.state as {
    quiz: Quiz;
    latestAttempt: QuizAttempt;
  };
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(-1)}>Back</Button>
      <QuizAttemptComponent quiz={quiz} latestAttempt={latestAttempt} />
    </div>
  );
};
export default QuizAttemptScreen;
