import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { Quiz } from "../../../types";
import { AiOutlineStop } from "react-icons/ai";
import { Button } from "antd";
export default function QuizzesControlButtons({deleteQuiz, quiz, handlePublishToggle}: {deleteQuiz: (quizId: string) => void; quiz: Quiz; handlePublishToggle: (publish: boolean, quiz: Quiz) => void;}) {
  return (
    <div className="float-end align-items-center justify-content-center">
      <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteQuiz(quiz._id || '')}/>
        <Button className="mv-auto border-0 align-self-center" onClick={() => handlePublishToggle(!quiz.isPublished, quiz)}>
          { quiz.isPublished ? <GreenCheckmark /> : <AiOutlineStop color="red" size={20} />}
        </Button>
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
