import { Tabs, message } from "antd";
import type { TabsProps } from "antd";
import Details from "./Details";
import Questions from "./Questions";
import { useLocation, useNavigate, useParams } from "react-router";
import { SetStateAction, useEffect, useState } from "react";
import { Quiz } from "../../../types";
import * as quizClient from "./client";

export default function QuizDetailsEditor() {
  const navigate = useNavigate();
  const { cid } = useParams();
  const location = useLocation();
  const activeTabFromState = location.state?.activeTab || "1";
  const onChange = (key: string) => {
    console.log(key);
  };

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
    // Fetch quiz details
    const fetchQuiz = async () => {
      if (!qid) return;
      const quiz = await quizClient.getQuizById(qid as string);
      console.log(quiz);
      setQuiz(quiz);
    };

    fetchQuiz();
  }, [cid, qid]);

  if (!quiz) return <div>Loading...</div>;

  const handleSave = async (publish: boolean) => {
    try {
      if (!quiz.title || !quiz.description || !quiz.dueDate) {
        message.error("Please fill in all required fields in Details.");
        return;
      }

      if (!quiz.questions || quiz.questions.length === 0) {
        message.error("Please add at least one question in Questions.");
        return;
      }
      let totalPoints = 0;
      for (const question of quiz.questions) {
        totalPoints += question.points;
      }

      const savedQuiz = await quizClient.addQuiz({
        ...quiz,
        isPublished: publish,
        points: totalPoints,
        cid: cid as string,
      });

      if (savedQuiz) {
        message.success("Quiz saved successfully!");
        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
      } else {
        message.error("Failed to save quiz.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while saving the quiz.");
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Details",
      children: (
        <Details
          quiz={quiz}
          setQuiz={setQuiz as React.Dispatch<SetStateAction<Quiz>>}
          handleSave={handleSave}
        />
      ),
    },
    {
      key: "2",
      label: "Questions",
      children: (
        <Questions
          quiz={quiz}
          setQuiz={setQuiz as React.Dispatch<SetStateAction<Quiz>>}
        />
      ),
    },
  ];
  return (
    <div id="wd-quiz-details-editor">
      <Tabs
        type="card"
        defaultActiveKey={activeTabFromState}
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
