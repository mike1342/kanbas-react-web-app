import { useEffect, useState } from "react";
import { Quiz } from "./../../../types";
import { Button, Col, Row, Space } from "antd";
import React from "react";
import { FaPencil } from "react-icons/fa6";
import { useParams } from "react-router";
import { getQuizById } from "./client";
import { Link } from "react-router-dom";

const QuizDetailsScreen = () => {
  const [quiz, setQuiz] = useState<Quiz>({
    title: "Unnamed Quiz",
    quizType: "gradedQuiz",
    points: 0,
    assignmentGroup: "quiz",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    howManyAttempts: 0,
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

  useEffect(() => {
    // Fetch quiz details
    const fetchQuiz = async () => {
      console.log(qid);
      if (!qid) return;
      const quiz = await getQuizById(qid as string);
      setQuiz(quiz);
    };

    fetchQuiz();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const fields = [
    { label: "Quiz Type", value: quiz.quizType },
    { label: "Points", value: quiz.points },
    { label: "Assignment Group", value: quiz.assignmentGroup },
    { label: "Shuffle Answers", value: quiz.shuffleAnswers ? "Yes" : "No" },
    { label: "Time Limit", value: `${quiz.timeLimit} Minutes` },
    { label: "Multiple Attempts", value: quiz.multipleAttempts ? "Yes" : "No" },
    {
      label: "Show Correct Answers",
      value: quiz.showCorrectAnswers ? "Yes" : "No",
    },
    {
      label: "One Question at a Time",
      value: quiz.oneQuestionAtATime ? "Yes" : "No",
    },
    { label: "Webcam Required", value: quiz.webcamRequired ? "Yes" : "No" },
    {
      label: "Lock Questions After Answering",
      value: quiz.lockQuestionsAfterAnswering ? "Yes" : "No",
    },
  ];

  return (
    <div className="quiz-details-screen">
      <div className="d-flex justify-content-end">
        <Space size="small">
          <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Preview`}>
            <Button>Preview</Button>
          </a>
          <a href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/QuizDetailsEditor`}>
            <Button>
              <FaPencil />
              Edit
            </Button>
          </a>
        </Space>
      </div>
      <hr />
      <h3>{quiz.title}</h3>
      <br />
      <div>
        <Row gutter={[16, 8]}>
          {fields.map((field, index) => (
            <React.Fragment key={index}>
              <Col span={8} style={{ textAlign: "right", fontWeight: "bold" }}>
                {field.label}
              </Col>
              <Col span={16} style={{ textAlign: "left" }}>
                {field.value}
              </Col>
            </React.Fragment>
          ))}
        </Row>
      </div>
      <hr />
      <h4>Availability</h4>
      <Row gutter={[16, 8]}>
        <Col span={8} style={{ textAlign: "right", fontWeight: "bold" }}>
          Due
        </Col>
        <Col span={16} style={{ textAlign: "left" }}>
          {quiz.dueDate?.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Col>
        <Col span={8} style={{ textAlign: "right", fontWeight: "bold" }}>
          Available From
        </Col>
        <Col span={16} style={{ textAlign: "left" }}>
          {quiz.availableFrom?.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Col>
        <Col span={8} style={{ textAlign: "right", fontWeight: "bold" }}>
          Until
        </Col>
        <Col span={16} style={{ textAlign: "left" }}>
          {quiz.availableUntil?.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default QuizDetailsScreen;
