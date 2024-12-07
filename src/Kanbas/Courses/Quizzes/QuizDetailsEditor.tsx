import { Tabs, message } from "antd";
import type { TabsProps } from "antd";
import Details from "./Details";
import Questions from "./Questions";
import { useLocation, useNavigate, useParams } from "react-router";
import { useState } from "react";
import { Quiz, QuizAttempt } from "../../../types";
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
    points: 0,
    howManyAttempts: 1,
    dueDate: new Date(),
    availableFrom: new Date(), // Add the missing properties
    availableUntil: new Date(), // Add the missing properties
    quizAttempts: [], // Add the missing properties
    description: "", // Add the missing properties
    isPublish: false, // Add the missing properties
    title: "Unnamed Quiz",
    quizType: "gradedQuiz",
    assignmentGroup: "quiz",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: false,
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    questions: [], // Questions will be stored here
  });

  const handleSave = async () => {
    try {
      if (!quiz.title || !quiz.description || !quiz.dueDate) {
        message.error("Please fill in all required fields in Details.");
        return;
      }

      if (!quiz.questions || quiz.questions.length === 0) {
        message.error("Please add at least one question in Questions.");
        return;
      }

      const savedQuiz = await quizClient.addQuiz(quiz as Quiz);

      if (savedQuiz) {
        message.success("Quiz saved successfully!");
        navigate("/Kanbas/Courses");
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
        <Details quiz={quiz} setQuiz={setQuiz} handleSave={handleSave} />
      ),
    },
    {
      key: "2",
      label: "Questions",
      children: <Questions quiz={quiz} setQuiz={setQuiz} />,
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
