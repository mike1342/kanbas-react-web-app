import { Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { TFQuestion } from "./../../../types";
export default function TrueFalse({ formField }: { formField: string }) {
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
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
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
        <Form.Item
          wrapperCol={{ span: 50 }}
          name={[formField, "question"]}
          label="Question"
        >
          <TextArea
            rows={4}
            value={question.question}
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
          />
        </Form.Item>

        <hr />

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
    </div>
  );
}
