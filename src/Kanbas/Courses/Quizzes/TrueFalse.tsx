import { Button, Col, Form, Input, Row, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TFQuestion } from "./../../../types";
export default function TrueFalse() {
  const navigate = useNavigate();
  const { cid } = useParams();

  const [question, setQuestion] = useState<TFQuestion>({
    _id: "",
    title: "",
    question: "",
    points: 0,
    questionType: "TF",
    correctAnswer: false,
  });

  const handleTrueChange = (checked: boolean) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      correctAnswer: checked,
    }));
  };

  const handleFalseChange = (checked: boolean) => {
    if (checked) {
      setQuestion((prevQuestion) => ({
        ...prevQuestion,
        correctAnswer: false,
      }));
    }
  };

  return (
    <div className="quiz-true-false-question">
      <h5>New True/False Question</h5>
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
        <Form.Item label="True" valuePropName="checked">
          <Switch
            checked={question.correctAnswer === true}
            onChange={handleTrueChange}
          />
        </Form.Item>
        <Form.Item label="False" valuePropName="checked">
          <Switch
            checked={question.correctAnswer === false}
            onChange={handleFalseChange}
          />
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
