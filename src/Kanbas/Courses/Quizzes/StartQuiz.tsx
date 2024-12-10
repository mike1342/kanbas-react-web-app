import { Button } from "antd";

const StartQuiz = () => {
  return (
    <div className="start-quiz-page" style={{display: "flex", justifyContent: "center"}}>
      <Button type="primary" danger>
        Start Quiz
      </Button>
    </div>
  );
};

export default StartQuiz;
