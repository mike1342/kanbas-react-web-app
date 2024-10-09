import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentControlButtons(props: {percentage: string}) {
  return (
    <div className="float-end">
      <span className="me-2 border border-black rounded p-1">{`${props.percentage}% of Total`}</span>
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}