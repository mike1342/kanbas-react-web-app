import React, { useEffect, useState } from "react";
import { Button, Radio, Input, Typography, Space, Divider, Card } from "antd";
import {
  Quiz,
  Question,
  MCQuestion,
  TFQuestion,
  FillInQuestion,
} from "./../../../types";
import { useParams } from "react-router";
import * as quizClient from "./client";

const { Title, Paragraph } = Typography;

const QuizScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>({
    title: "",
    quizType: "gradedQuiz",
    points: 0,
    assignmentGroup: "quiz",
    shuffleAnswers: false,
    timeLimit: 0,
    multipleAttempts: false,
    howManyAttempts: 0,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: false,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date(),
    availableFrom: new Date(),
    availableUntil: new Date(),
    questions: [],
    quizAttempts: [],
    description: "",
    isPublished: false,
    cid: "",
  });
  const { qid } = useParams();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) return;
      const quiz = await quizClient.getQuizById(qid as string);
      setQuiz(quiz);
    };

    fetchQuiz();
  }, [qid]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {};

  const renderQuestion = (question: Question) => {
    switch (question.questionType) {
      case "MC":
        const mcQuestion = question as MCQuestion;
        return (
          <Card bordered style={{ marginBottom: "16px" }}>
            <Title level={4}>{mcQuestion.question}</Title>
            <Radio.Group>
              <Space direction="vertical">
                {mcQuestion.choices.map((choice, index) => (
                  <Radio key={index} value={choice}>
                    {choice}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Card>
        );
      case "TF":
        const tfQuestion = question as TFQuestion;
        return (
          <Card bordered style={{ marginBottom: "16px" }}>
            <Title level={4}>{tfQuestion.question}</Title>
            <Radio.Group>
              <Space direction="vertical">
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Space>
            </Radio.Group>
          </Card>
        );
      case "FillIn":
        const fillInQuestion = question as FillInQuestion;
        return (
          <Card bordered style={{ marginBottom: "16px" }}>
            <Title level={4}>{fillInQuestion.question}</Title>
            <Input
              placeholder="Type your answer here"
              style={{ width: "100%", maxWidth: "400px" }}
            />
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title>{quiz.title}</Title>
      <Paragraph>{quiz.description}</Paragraph>
      <Divider />
      {quiz.oneQuestionAtATime ? (
        <div>
          {renderQuestion(quiz.questions[currentQuestionIndex])}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <Button
              type="default"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button type="primary" onClick={handleNextQuestion}>
                Next
              </Button>
            ) : (
              <Button type="primary" danger onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {quiz.questions.map((question) => (
            <div key={question._id}>{renderQuestion(question)}</div>
          ))}
        </Space>
      )}
    </div>
  );
};

export default QuizScreen;
