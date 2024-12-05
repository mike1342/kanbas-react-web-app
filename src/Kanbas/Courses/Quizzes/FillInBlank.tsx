import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FillInQuestion } from "../../../types";

export default function FillInBlank() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const [question, setQuestion] = useState<FillInQuestion>({
    _id: "",
    title: "",
    question: "",
    points: 0,
    questionType: "FillIn",
    correctAnswers: [""],
  });

  const handleQuestionChange = (field: keyof FillInQuestion, value: any) => {
    setQuestion((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (index: number, value: string) => {
    const updatedAnswers = [...question.correctAnswers];
    updatedAnswers[index] = value;
    setQuestion((prev) => ({ ...prev, correctAnswers: updatedAnswers }));
  };

  const addAnswerField = () => {
    setQuestion((prev) => ({
      ...prev,
      correctAnswers: [...prev.correctAnswers, ""],
    }));
  };

  const removeAnswerField = (index: number) => {
    const updatedAnswers = question.correctAnswers.filter(
      (_, i) => i !== index
    );
    setQuestion((prev) => ({ ...prev, correctAnswers: updatedAnswers }));
  };

  return (
    <div className="fill-in-question">
      <h5>New Fill In The Blank Question</h5>
      <hr />
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Row>
          <Col span={14}>
            <Form.Item
              label="Question:"
              name="question-editor"
              wrapperCol={{ span: 50 }}
            >
              <TextArea
                rows={4}
                value={question.question}
                onChange={(e) =>
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    question: e.target.value,
                  }))
                }
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Points:" wrapperCol={{ span: 4 }}>
              <Input
                type="number"
                value={question.points}
                onChange={(e) =>
                  setQuestion((prevQuestion) => ({
                    ...prevQuestion,
                    points: Number(e.target.value),
                  }))
                }
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Answers">
          {question.correctAnswers.map((answer, index) => (
            <Row key={index} gutter={8} style={{ marginBottom: "8px" }}>
              <Col span={20}>
                <Input
                  placeholder={`Possible Answer ${index + 1}`}
                  value={answer}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </Col>
              <Col span={4}>
                <Button
                  danger
                  onClick={() => removeAnswerField(index)}
                  disabled={question.correctAnswers.length === 1}
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
            + Add Possible Answer
          </Button>
        </Form.Item>
      </Form>
      <hr />
      <div className="d-flex justify-content-end" style={{ gap: "0.5%" }}>
        <Button color="danger" variant="solid">
          Save
        </Button>
        <Button
          variant="solid"
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz`, {
              state: { activeTab: "2" },
            })
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
