import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FillInQuestion, Quiz } from "../../../types";

export default function FillInBlank({
  formField,
  questionData,
  index,
  setQuiz,
}: {
  formField: string;
  questionData: FillInQuestion;
  index: number;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}) {
  const handleCorrectAnswersChange = (answers: string[]) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        correctAnswers: answers,
      } as FillInQuestion;
      return { ...prevQuiz, questions: updatedQuestions, points: updatedQuestions.reduce((acc, q) => acc + q.points, 0) };
    });
  };

  const handleAnswerChange = (answerIndex: number, value: string) => {
    const updatedAnswers = [...questionData.correctAnswers];
    updatedAnswers[answerIndex] = value;
    handleCorrectAnswersChange(updatedAnswers);
  };

  const addAnswerField = () => {
    handleCorrectAnswersChange([...questionData.correctAnswers, ""]);
  };

  const removeAnswerField = (answerIndex: number) => {
    const updatedAnswers = questionData.correctAnswers.filter(
      (_, i) => i !== answerIndex
    );
    handleCorrectAnswersChange(updatedAnswers);
  };

  return (
    <div className="fill-in-blank-question">
      <Form
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item label="Points:" name={[formField, "points"]}>
          <Input
            defaultValue={questionData.points}
            type="number"
            value={questionData.points}
            onChange={(e) =>
              setQuiz((prevQuiz) => {
                const updatedQuestions = [...prevQuiz.questions];
                updatedQuestions[index] = {
                  ...updatedQuestions[index],
                  points: Number(e.target.value),
                } as FillInQuestion;
                return { ...prevQuiz, questions: updatedQuestions };
              })
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
            onChange={(e) =>
              setQuiz((prevQuiz) => {
                const updatedQuestions = [...prevQuiz.questions];
                updatedQuestions[index] = {
                  ...updatedQuestions[index],
                  question: e.target.value,
                } as FillInQuestion;
                return { ...prevQuiz, questions: updatedQuestions };
              })
            }
          />
        </Form.Item>
        <hr />
        <Form.Item label="Answers">
          {questionData.correctAnswers.map((answer, answerIndex) => (
            <Row key={answerIndex} gutter={8} style={{ marginBottom: "8px" }}>
              <Col span={20}>
                <Input
                  defaultValue={answer}
                  placeholder={`Answer ${answerIndex + 1}`}
                  value={answer}
                  onChange={(e) =>
                    handleAnswerChange(answerIndex, e.target.value)
                  }
                />
              </Col>
              <Col span={4}>
                <Button
                  danger
                  onClick={() => removeAnswerField(answerIndex)}
                  disabled={questionData.correctAnswers.length === 1}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            type="dashed"
            onClick={addAnswerField}
            style={{ marginTop: "8px" }}
          >
            + Add Answer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
