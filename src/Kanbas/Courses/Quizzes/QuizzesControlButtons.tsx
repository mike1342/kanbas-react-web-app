import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { Quiz } from "../../../types";
import { AiOutlineStop } from "react-icons/ai";
import { Button } from "antd";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export default function QuizzesControlButtons({deleteQuiz, quiz, handlePublishToggle}: {deleteQuiz: (quizId: string) => void; quiz: Quiz; handlePublishToggle: (publish: boolean, quiz: Quiz) => void;}) {
  const { cid } = useParams();

  return (
    <div className="d-flex justify-content-end align-items-center gap-2">
      <Button
        className="border-0 p-2 d-flex align-items-center"
        onClick={() => deleteQuiz(quiz._id || '')}
      >
        <FaTrash size={20} className="text-danger" />
      </Button>
      <Button
        className="border-0 p-2 d-flex align-items-center"
        onClick={() => handlePublishToggle(!quiz.isPublished, quiz)}
      >
        {quiz.isPublished ? <GreenCheckmark /> : <AiOutlineStop color="red" size={20} />}
      </Button>
      <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/QuizDetailsEditor`}>
        <IoEllipsisVertical className="fs-4" color="black" />
      </Link>
    </div>
  );
}
