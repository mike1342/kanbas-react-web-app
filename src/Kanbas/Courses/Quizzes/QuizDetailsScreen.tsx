import { useState } from "react";
import { Quiz } from "./../../../types";
import { Button, Col, Row, Space } from "antd";
import React from "react";
import { FaPencil } from "react-icons/fa6";

const QuizDetailsScreen = () => {
  const [quiz] = useState<Partial<Quiz>>({
    title: "Unnamed Quiz",
    points: 0,
    quizType: "gradedQuiz",
    assignmentGroup: "quiz",
    shuffleAnswers: false,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: true,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: new Date("2024-12-31T23:59:00"),
    availableFrom: new Date("2024-12-01T08:00:00"),
    availableUntil: new Date("2024-12-31T23:59:00"),
  });

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
          <Button>Preview</Button>
          <Button>
            <FaPencil />
            Edit
          </Button>
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
