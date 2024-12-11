import { Button, Card, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useEffect, useState } from "react";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import FillInBlank from "./FillInBlank";
import {
  FillInQuestion,
  MCQuestion,
  Question,
  Quiz,
  TFQuestion,
} from "../../../types";

export default function Questions({
  quiz,
  setQuiz,
}: {
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
}) {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState("Multiple Choice");

  // Update form values when quiz questions change
  useEffect(() => {
    if (quiz?.questions) {
      form.setFieldsValue({
        items: quiz.questions.map((question) => ({
          ...question,
          type: question.questionType === "MC" 
            ? "Multiple Choice" 
            : question.questionType === "TF"
            ? "True/False"
            : "Fill In Blank",
        })),
      });
    }
  }, [quiz.questions, form]);

  const renderQuestionComponent = (
    type: string,
    fieldName: string,
    questionData: Question,
    index: number
  ) => {
    if (!questionData) return null;

    switch (type) {
      case "Multiple Choice":
        return (
          <MultipleChoice
            formField={fieldName}
            questionData={questionData as MCQuestion}
            index={index}
            setQuiz={setQuiz}
          />
        );
      case "True/False":
        return (
          <TrueFalse
            formField={fieldName}
            questionData={questionData as TFQuestion}
            index={index}
            setQuiz={setQuiz}
          />
        );
      case "Fill In Blank":
        return (
          <FillInBlank
            formField={fieldName}
            questionData={questionData as FillInQuestion}
            index={index}
            setQuiz={setQuiz}
          />
        );
      default:
        return null;
    }
  };

  const handleQuestionsChange = (updatedQuestions: Question[]) => {
    setQuiz((prev: Quiz) => ({
      ...prev,
      questions: updatedQuestions.map((q) => {
        // Clean up the question object to ensure it matches the expected structure
        if (q.questionType === "MC") {
          const { choices, correctAnswer, ...rest } = q as MCQuestion;
          return { ...rest, choices, correctAnswer };
        } else if (q.questionType === "TF") {
          const { correctAnswer, ...rest } = q as TFQuestion;
          return { ...rest, correctAnswer };
        } else if (q.questionType === "FillIn") {
          const { correctAnswers, ...rest } = q as FillInQuestion;
          return { ...rest, correctAnswers };
        }
        return q;
      }),
      points: updatedQuestions.reduce((acc, q) => acc + q.points, 0),
    }));
  };

  return (
    <Form
      form={form}
      name="dynamic_form_complex"
      initialValues={{ items: quiz.questions || [] }}
      onValuesChange={(_changedValues, allValues) => {
        const updatedQuestions = allValues.items.map(
          (item: Question, index: number) => ({
            ...quiz.questions[index],
            ...item,
          })
        );
        handleQuestionsChange(updatedQuestions);
      }}
    >
      <Form.List name="items">
        {(fields, { remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field, index) => (
              <Card
                defaultValue={selectedType}
                size="small"
                title={`Question ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item
                  label="Type"
                  name={[field.name, "type"]}
                  initialValue={selectedType}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 10 }}
                >
                  <Input disabled />
                </Form.Item>
                {renderQuestionComponent(
                  form.getFieldValue(["items", field.name, "type"]), // type
                  field.name.toString(),
                  quiz.questions[index],
                  index
                )}
              </Card>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Segmented
                defaultValue="Multiple Choice"
                options={["Multiple Choice", "True/False", "Fill In Blank"]}
                value={selectedType}
                onChange={(value) => setSelectedType(value as string)}
              />
              <Button
                type="dashed"
                onClick={() => {
                  let newQuestion: Question;

                  if (selectedType === "Multiple Choice") {
                    newQuestion = {
                      _id: "",
                      title: `Question ${quiz.questions.length + 1}`,
                      question: "",
                      points: 0,
                      questionType: "MC",
                      choices: [""],
                      correctAnswer: "",
                    } as MCQuestion;
                  } else if (selectedType === "True/False") {
                    newQuestion = {
                      _id: "",
                      title: `Question ${quiz.questions.length + 1}`,
                      question: "",
                      points: 0,
                      questionType: "TF",
                      correctAnswer: false,
                    } as TFQuestion;
                  } else if (selectedType === "Fill In Blank") {
                    newQuestion = {
                      _id: "",
                      title: `Question ${quiz.questions.length + 1}`,
                      question: "",
                      points: 0,
                      questionType: "FillIn",
                      correctAnswers: [""],
                    } as FillInQuestion;
                  }

                  setQuiz((prevQuiz) => ({
                    ...prevQuiz,
                    questions: [...prevQuiz.questions, newQuestion],
                  }));

                  form.setFieldsValue({
                    items: [
                      ...form.getFieldValue("items"),
                      { type: selectedType },
                    ],
                  });
                }}
                block
              >
                + Add Item
              </Button>
            </div>
          </div>
        )}
      </Form.List>
    </Form>
  );
}
