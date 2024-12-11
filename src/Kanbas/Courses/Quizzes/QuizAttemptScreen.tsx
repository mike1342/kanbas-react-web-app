import { useEffect, useState } from "react";
import {
  Quiz,
  QuizAttempt,
  Question,
  QuestionAttempt,
  MCQuestion,
  TFQuestion,
  FillInQuestion,
  MCQuestionAttempt,
  TFQuestionAttempt,
  FillInQuestionAttempt,
} from "../../../types";
import { Card, Radio, Typography, Input, Space } from "antd";
import { getQuizAttemptsForQuiz } from "./client";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const { Title } = Typography;

interface QuizAttemptScreenProps {
  quiz: Quiz;
}

const QuizAttemptScreen = ({ quiz }: QuizAttemptScreenProps) => {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStudentAnswer = (
    question: Question,
    questionAttempt: QuestionAttempt
  ): string | boolean | undefined => {
    switch (question.questionType) {
      case "MC": {
        const mcAttempt = questionAttempt as MCQuestionAttempt;
        return mcAttempt.selectedChoice;
      }
      case "TF": {
        const tfAttempt = questionAttempt as TFQuestionAttempt;
        return tfAttempt.selectedAnswer;
      }
      case "FillIn": {
        const fillInAttempt = questionAttempt as FillInQuestionAttempt;
        return fillInAttempt.selectedAnswer;
      }
      default:
        return undefined;
    }
  };

  const renderQuestion = (
    question: Question,
    questionAttempt?: QuestionAttempt
  ) => {
    const { questionType, question: questionText, points } = question;

    const studentAnswer = questionAttempt
      ? getStudentAnswer(question, questionAttempt)
      : undefined;

    // Determine correctness if `showCorrectAnswers` is enabled
    const isCorrect =
      quiz.showCorrectAnswers &&
      (questionType === "MC"
        ? (questionAttempt as MCQuestionAttempt)?.selectedChoice ===
          (question as MCQuestion).correctAnswer
        : questionType === "TF"
        ? (questionAttempt as TFQuestionAttempt)?.selectedAnswer ===
          (question as TFQuestion).correctAnswer
        : questionType === "FillIn"
        ? (question as FillInQuestion).correctAnswers.includes(
            (questionAttempt as FillInQuestionAttempt)?.selectedAnswer?.trim()
          )
        : undefined);

    const correctAnswer =
      questionType === "MC"
        ? (question as MCQuestion).correctAnswer
        : questionType === "TF"
        ? (question as TFQuestion).correctAnswer
        : questionType === "FillIn"
        ? (question as FillInQuestion).correctAnswers.join(", ")
        : undefined;

    return (
      <Card bordered style={{ marginBottom: "16px" }} key={question._id}>
        <Title level={4}>{questionText}</Title>
        <p>
          <b>Points:</b> {points}
        </p>
        {questionType === "MC" || questionType === "TF" ? (
          <Radio.Group value={studentAnswer} disabled>
            <Space direction="vertical">
              {questionType === "MC" &&
                (question as MCQuestion).choices.map((choice, index) => (
                  <Radio key={index} value={choice}>
                    {choice}
                  </Radio>
                ))}
              {questionType === "TF" && (
                <>
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </>
              )}
            </Space>
          </Radio.Group>
        ) : (
          <Input
            value={studentAnswer?.toString() || "No answer provided"}
            disabled
          />
        )}
        <p>
          <b>Your Answer:</b>{" "}
          {studentAnswer !== undefined
            ? questionType === "TF"
              ? studentAnswer
                ? "True"
                : "False"
              : studentAnswer
            : "No answer provided"}
        </p>
        {quiz.showCorrectAnswers && (
          <p>
            {isCorrect ? (
              <span style={{ color: "green", fontWeight: "bold" }}>
                Correct!
              </span>
            ) : (
              <>
                <span style={{ color: "red", fontWeight: "bold" }}>
                  Incorrect.
                </span>
                {correctAnswer && (
                  <p>
                    <b>Correct Answer:</b> {correctAnswer.toString()}
                  </p>
                )}
              </>
            )}
          </p>
        )}
      </Card>
    );
  };

  useEffect(() => {
    const fetchLatestAttempt = async () => {
      if (!qid) {
        setError("Quiz ID is missing.");
        setLoading(false);
        return;
      }

      try {
        const attempts = await getQuizAttemptsForQuiz(qid, currentUser._id);
        const sortedAttempts = attempts.sort(
          (
            a: { timeEnded: string | number | Date },
            b: { timeEnded: string | number | Date }
          ) => new Date(b.timeEnded).getTime() - new Date(a.timeEnded).getTime()
        );
        const latest = sortedAttempts.length > 0 ? sortedAttempts[0] : null;
        setLatestAttempt(latest);
      } catch (err) {
        console.error("Error fetching quiz attempts:", err);
        setError("Failed to load the latest attempt.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAttempt();
  }, [qid, currentUser._id]);

  if (loading) {
    return <p>Loading latest attempt...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!latestAttempt) {
    return <p>No attempts available.</p>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>Latest Attempt</Title>
      <p>
        <b>Score:</b> {latestAttempt.score} out of {quiz.points}
      </p>
      <p>
        <b>Date:</b> {new Date(latestAttempt.timeEnded).toLocaleString()}
      </p>
      <p>
        <b>Time Taken:</b>{" "}
        {Math.round(
          (new Date(latestAttempt.timeEnded).getTime() -
            new Date(latestAttempt.timeStarted).getTime()) /
            1000 /
            60
        )}{" "}
        minutes
      </p>
      <hr />
      {quiz.questions.map((question) => {
        const questionAttempt = latestAttempt.answers.find(
          (answer) => answer._id?.toString() === question._id?.toString()
        );
        return renderQuestion(question, questionAttempt);
      })}
    </div>
  );
};

export default QuizAttemptScreen;
