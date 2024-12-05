import { useState } from "react";
import { Button, Form, Input, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FaTrash } from "react-icons/fa";
import { MCQuestion } from "./../../../types";

export default function MultipleChoice({ formField }: { formField: string }) {
  const [question, setQuestion] = useState<MCQuestion>({
    _id: "",
    title: "",
    question: "",
    points: 0,
    questionType: "MC",
    choices: [""],
    correctAnswer: "",
  });

  const handleAddChoice = () => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      choices: [...prevQuestion.choices, ""],
    }));
  };

  const handleRemoveChoice = (index: number) => {
    const updatedChoices = question.choices.filter((_, i) => i !== index);
    setQuestion({
      ...question,
      choices: updatedChoices,
      correctAnswer:
        question.correctAnswer === question.choices[index]
          ? ""
          : question.correctAnswer,
    });
  };

  const handleChoiceChange = (index: number, value: string) => {
    const updatedChoices = [...question.choices];
    updatedChoices[index] = value;
    setQuestion({ ...question, choices: updatedChoices });
  };

  const handleMarkCorrect = (choice: string) => {
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      correctAnswer: prevQuestion.correctAnswer === choice ? "" : choice,
    }));
  };

  return (
    <div className="quiz-mc-question">
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
        <Form.Item label="Answers:" wrapperCol={{ span: 16 }}>
          {question.choices.map((choice, index) => (
            <Space
              key={index}
              style={{ display: "flex", marginBottom: 8 }}
              align="center"
            >
              <Input
                placeholder={`Possible Answer ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <Switch
                checked={question.correctAnswer === choice}
                onChange={() => handleMarkCorrect(choice)}
                checkedChildren="Correct"
                unCheckedChildren="Not Correct"
              />
              <Button
                danger
                onClick={() => handleRemoveChoice(index)}
                disabled={question.choices.length <= 1}
              >
                <FaTrash />
              </Button>
            </Space>
          ))}
          <Button type="dashed" onClick={handleAddChoice}>
            + Add Answer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
