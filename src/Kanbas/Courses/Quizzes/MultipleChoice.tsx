import { Button, Form, Input, Space, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MCQuestion, Question, Quiz } from "./../../../types";

export default function MultipleChoice({
  formField,
  questionData,
  index,
  setQuiz,
}: {
  formField: string;
  questionData: MCQuestion;
  index: number;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}) {
  const handleInputChange = (
    field: keyof MCQuestion | keyof Question,
    value: string | number
  ) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];

      if (field in updatedQuestions[index]) {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          [field]: value,
        } as Question;
      }

      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleChoiceChange = (choiceIndex: number, value: string) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];

      if (updatedQuestions[index].questionType === "MC") {
        const question = updatedQuestions[index] as MCQuestion;
        const updatedChoices = [...question.choices];
        updatedChoices[choiceIndex] = value;

        updatedQuestions[index] = {
          ...question,
          choices: updatedChoices,
        } as MCQuestion;
      }

      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleAddChoice = () => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      const question = updatedQuestions[index] as MCQuestion;
      question.choices.push("");
      updatedQuestions[index] = question;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  const handleRemoveChoice = (choiceIndex: number) => {
    setQuiz((prevQuiz) => {
      const updatedQuestions = [...prevQuiz.questions];
      const question = updatedQuestions[index] as MCQuestion;
      question.choices = question.choices.filter((_, i) => i !== choiceIndex);
      updatedQuestions[index] = question;
      return { ...prevQuiz, questions: updatedQuestions };
    });
  };

  return (
    <div className="quiz-mc-question">
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
        <Form.Item label="Answers:" wrapperCol={{ span: 16 }}>
          {questionData.choices.map((choice, index) => (
            <Space
              key={index}
              align="baseline"
              style={{ display: "flex", marginBottom: 8 }}
            >
              <Input
                defaultValue={choice}
                placeholder={`Possible Answer ${index + 1}`}
                value={choice}
                onChange={(e) => handleChoiceChange(index, e.target.value)}
              />
              <Switch
                defaultChecked={questionData.correctAnswer === choice}
                checked={questionData.correctAnswer === choice}
                onChange={() => handleInputChange("correctAnswer", choice)}
                checkedChildren="Correct"
                unCheckedChildren="Not Correct"
              />
              <Button
                danger
                onClick={() => handleRemoveChoice(index)}
                disabled={questionData.choices.length <= 1}
              >
                Remove
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
