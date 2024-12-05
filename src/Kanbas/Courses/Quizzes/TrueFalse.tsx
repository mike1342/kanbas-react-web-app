import { Button, Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function TrueFalse() {
  const [isTrueChecked, setIsTrueChecked] = useState(false);
  const [isFalseChecked, setIsFalseChecked] = useState(false);
  const navigate = useNavigate();
  const cid = useParams();

  const handleTrueChange = (checked: boolean) => {
    setIsTrueChecked(checked);
    if (checked) {
      setIsFalseChecked(false);
    }
  };

  const handleFalseChange = (checked: boolean) => {
    setIsFalseChecked(checked);
    if (checked) {
      setIsTrueChecked(false);
    }
  };
  return (
    <div className="quiz-true-false-question">
      <h5>New True/False Question</h5>
      <hr />
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item label="Question:" name="question-editor">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="True" valuePropName="checked">
          <Switch checked={isTrueChecked} onChange={handleTrueChange} />
        </Form.Item>
        <Form.Item label="False" valuePropName="checked">
          <Switch checked={isFalseChecked} onChange={handleFalseChange} />
        </Form.Item>
      </Form>
      <hr />
      <div className="d-flex justify-content-end" style={{ gap: "0.5%" }}>
        {" "}
        <Button color="danger" variant="solid">
          Save
        </Button>
        <Button
          variant="solid"
          onClick={() =>
            navigate(`/Kanbas/Courses/${cid}/Quizzes/NewQuiz`, {
              state: { activeTab: "2" },
            })
          }
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
