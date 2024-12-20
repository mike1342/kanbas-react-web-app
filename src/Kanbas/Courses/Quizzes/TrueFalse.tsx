import { Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { TFQuestion, Quiz } from "../../../types";

export default function TrueFalse({
  formField,
  questionData,
  index,
  setQuiz,
}: {
  formField: string;
  questionData: TFQuestion;
  index: number;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}) {
  const handleInputChange = (
    field: keyof TFQuestion,
    value: string | number | boolean
  ) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value,
      } as TFQuestion;
      return { ...prevQuiz, questions: updatedQuestions, points: updatedQuestions.reduce((acc, q) => acc + q.points, 0) };
    });
  };

  const handleCorrectAnswerChange = (isTrue: boolean) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        correctAnswer: isTrue,
      } as TFQuestion;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  return (
    <div className="quiz-true-false-question">
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item
          label="Points:"
          name={[formField, "points"]}
          initialValue={questionData.points}
        >
          <Input
            defaultValue={questionData.points}
            type="number"
            value={questionData.points}
            onChange={(e) =>
              handleInputChange("points", Number(e.target.value))
            }
          />
        </Form.Item>
        <Form.Item
          label="Question"
          name={[formField, "question"]}
          initialValue={questionData.question}
        >
          <TextArea
            defaultValue={questionData.question}
            rows={4}
            value={questionData.question}
            onChange={(e) => handleInputChange("question", e.target.value)}
          />
        </Form.Item>
        <hr />

        <Form.Item label="True">
          <Switch
            defaultChecked={questionData.correctAnswer}
            checked={questionData.correctAnswer === true}
            onChange={() => handleCorrectAnswerChange(true)}
          />
        </Form.Item>
        <Form.Item label="False">
          <Switch
            defaultChecked={!questionData.correctAnswer}
            checked={questionData.correctAnswer === false}
            onChange={() => handleCorrectAnswerChange(false)}
          />
        </Form.Item>
      </Form>
    </div>
  );
}
