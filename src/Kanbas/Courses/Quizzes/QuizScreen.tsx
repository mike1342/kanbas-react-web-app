import React, { useEffect, useState } from "react";
import {
  Button,
  Radio,
  Input,
  Typography,
  Space,
  Divider,
  Card,
  Alert,
} from "antd";
import {
  Quiz,
  Question,
  MCQuestion,
  TFQuestion,
  FillInQuestion,
  QuizAttempt,
} from "./../../../types";
import { useParams } from "react-router";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";

const { Title, Paragraph } = Typography;

const QuizScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quiz, setQuiz] = useState<Quiz>({
    title: "Unnamed Quiz",
    quizType: "gradedQuiz",
    points: 0,
    assignmentGroup: "quiz",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 1,
    showCorrectAnswers: false,
    accessCode: "",
    oneQuestionAtATime: true,
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
  const { cid, qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: any;
  }>({});
  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        if (!qid) {
          setError("Quiz ID is missing.");
          setLoading(false);
          return;
        }
        const fetchedQuiz = await quizClient.getQuizById(qid as string);
        const attempts = await quizClient.getQuizAttemptsForQuiz(
          qid,
          currentUser._id
        );
        setQuiz(fetchedQuiz);
        setQuizAttempts(attempts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching quiz:", err);
        setError("Failed to load quiz.");
        setLoading(false);
      }
    };
    fetchQuizData();
  }, [qid, currentUser._id]);

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

  const handleAnswerChange = (questionId: string, answer: any) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    quiz.questions.forEach((question) => {
      if (question.questionType === "MC") {
        const mcQuestion = question as MCQuestion;
        if (selectedAnswers[question._id] === mcQuestion.correctAnswer) {
          score += question.points;
        }
      } else if (question.questionType === "TF") {
        const tfQuestion = question as TFQuestion;
        if (selectedAnswers[question._id] === tfQuestion.correctAnswer) {
          score += question.points;
        }
      } else if (question.questionType === "FillIn") {
        const fillInQuestion = question as FillInQuestion;
        if (
          fillInQuestion.correctAnswers.includes(
            selectedAnswers[question._id]?.trim().toLowerCase()
          )
        ) {
          score += question.points;
        }
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    try {
      const timeEnded = new Date();
      const attempt = {
        quizId: qid as string,
        studentId: currentUser._id,
        score: calculateScore(),
        timeStarted: new Date(), // Replace with actual time started
        timeEnded,
        answers: quiz.questions.map((q) => ({
          _id: q._id,
          questionType: q.questionType,
          selectedAnswer: selectedAnswers[q._id],
        })),
      };
      await quizClient.saveQuizAttempt(attempt);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const renderQuestion = (question: Question | undefined) => {
    if (!question) {
      return <div style={{ color: "red" }}>Invalid or missing question.</div>;
    }
    switch (question.questionType) {
      case "MC":
        const mcQuestion = question as MCQuestion;
        return (
          <Card bordered style={{ marginBottom: "16px" }}>
            <Title level={4}>{mcQuestion.question}</Title>
            <Radio.Group
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value)
              }
            >
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
            <Radio.Group
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value)
              }
            >
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
              placeholder="Type your answer"
              onChange={(e) =>
                handleAnswerChange(question._id, e.target.value)
              }
            />
          </Card>
        );
      default:
        return null;
    }
  };
  return (
    <div style={{ padding: "24px" }}>
      {currentUser.role === "FACULTY" && (
        <Alert
          message="This is a preview of the published version of this quiz"
          type="warning"
          showIcon
        />
      )}
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
              <Button
                type="primary"
                danger
                onClick={handleSubmit}
                disabled={currentUser.role === "FACULTY"}
              >
                Submit
              </Button>
            )}
          </div>
          <br />
        </div>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {quiz.questions.map((question) => (
            <div key={question._id}>{renderQuestion(question)}</div>
          ))}
          <div className="d-flex justify-content-end">
            <Button
              type="primary"
              danger
              onClick={handleSubmit}
              disabled={currentUser.role === "FACULTY"}
            >
              Submit
            </Button>
          </div>
        </Space>
      )}
      {currentUser.role === "FACULTY" && (
        <div className="d-flex justify-content-evenly">
          <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetailsEditor`}>
            <Button color="default" variant="outlined">
              <FaPencil />
              Keep Editing This Quiz
            </Button>
          </a>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
