import { Button, Dropdown, MenuProps, Space, message } from "antd";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";

export default function Questions() {
  const cid = useParams();
  const handleMenuClick: MenuProps["onClick"] = (e) => {};
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      label: "True/False",
      key: "1",
      onClick: () =>
        navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz/NewTrueFalseQ`),
    },
    {
      label: "Multiple Choice",
      key: "2",
      onClick: () => navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz/NewMCQ`),
    },
    {
      label: "Fill In The Blank",
      key: "3",
      onClick: () =>
        navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz/NewFillInBlankQ`),
    },
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <div className="quizzes-questions">
      <h5 className="d-flex justify-content-end">Points: {/*points here*/}</h5>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Dropdown menu={menuProps}>
          <Button>
            <FaPlus />
            <Space>New Question</Space>
          </Button>
        </Dropdown>
      </div>
      {/* Questions displayed here */}
      <hr />
      <div className="d-flex justify-content-center" style={{ gap: "0.5%" }}>
        {" "}
        <Button color="danger" variant="solid">
          Save
        </Button>
        <Button
          variant="solid"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
