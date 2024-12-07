import {
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  DatePicker,
  Button,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { Quiz, QuizType, AssignmentType } from "./../../../types";

export default function Details({
  quiz,
  setQuiz,
  handleSave,
}: {
  quiz: Quiz;
  setQuiz: React.Dispatch<React.SetStateAction<Quiz>>;
  handleSave: (publish: boolean) => void;
}) {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleInputChange = (field: keyof Quiz, value: any) => {
    setQuiz((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div id="wd-quiz-details">
      <hr />
      <Form
        name="layout-multiple-horizontal"
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
      >
        <Form.Item>
          <Input
            defaultValue={quiz.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </Form.Item>
      </Form>
      <h6>Quiz Instructions:</h6>
      <Form.Item className="instructions">
        <TextArea
          rows={4}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Quiz Type"
        className="quiz-type"
        wrapperCol={{ span: 6 }}
      >
        <Select
          defaultValue={quiz.quizType}
          onChange={(value: QuizType) => handleInputChange("quizType", value)}
        >
          <Select.Option value="gradedQuiz">Graded Quiz</Select.Option>
          <Select.Option value="practiceQuiz">Practice Quiz</Select.Option>
          <Select.Option value="gradedSurvey">Graded Survey</Select.Option>
          <Select.Option value="ungradedSurvey">Ungraded Survey</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Assignment Type"
        className="assignment-type"
        wrapperCol={{ span: 6 }}
      >
        <Select
          defaultValue={quiz.assignmentGroup}
          onChange={(value: AssignmentType) =>
            handleInputChange("assignmentGroup", value)
          }
        >
          <Select.Option value="quiz">Quizzes</Select.Option>
          <Select.Option value="exam">Exams</Select.Option>
          <Select.Option value="assignment">Assignment</Select.Option>
          <Select.Option value="project">Projects</Select.Option>
        </Select>
      </Form.Item>
      <Card title="Options" style={{ borderRadius: "8px", padding: "16px" }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Shuffle Answers" valuePropName="checked">
                <Switch
                  defaultChecked={quiz.shuffleAnswers}
                  onChange={(checked) =>
                    handleInputChange("shuffleAnswers", checked)
                  }
                />
              </Form.Item>
              <Form.Item label="Time Limit" valuePropName="checked">
                <Switch
                  defaultChecked={!!quiz.timeLimit}
                  onChange={(checked) =>
                    handleInputChange("timeLimit", checked ? 20 : 0)
                  }
                />
              </Form.Item>
              <Form.Item label="Multiple Answers" valuePropName="checked">
                <Switch
                  onChange={(checked) =>
                    handleInputChange("multipleAttempts", checked)
                  }
                />
              </Form.Item>
              <Form.Item label="One Question At A Time" valuePropName="checked">
                <Switch
                  defaultChecked={quiz.oneQuestionAtATime}
                  onChange={(checked) =>
                    handleInputChange("oneQuestionAtATime", checked)
                  }
                />
              </Form.Item>
              <Form.Item
                label="Lock Questions After Answering"
                valuePropName="checked"
              >
                <Switch
                  onChange={(checked) =>
                    handleInputChange("lockQuestionsAfterAnswering", checked)
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Show Correct Answers" valuePropName="checked">
                <Switch
                  onChange={(checked) =>
                    handleInputChange("showCorrectAnswers", checked)
                  }
                />
              </Form.Item>
              <Form.Item label="Minutes:" wrapperCol={{ span: 2 }}>
                <Input
                  defaultValue={quiz.timeLimit}
                  onChange={(e) =>
                    handleInputChange(
                      "timeLimit",
                      parseInt(e.target.value) || 0
                    )
                  }
                />
              </Form.Item>
              <Form.Item label="Access Code" wrapperCol={{ span: 4 }}>
                <Input
                  onChange={(e) =>
                    handleInputChange("accessCode", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Webcam Required" valuePropName="checked">
                <Switch
                  onChange={(checked) =>
                    handleInputChange("webcamRequired", checked)
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <br />
      <Card
        title="Availability"
        style={{ borderRadius: "8px", padding: "16px" }}
      >
        <Form.Item label="Due" name="DueDate">
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) => handleInputChange("dueDate", date)}
          />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Available From" name="AvailableFromDate">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => handleInputChange("availableFrom", date)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Until" name="AvailableUntilDate">
              <DatePicker
                style={{ width: "100%" }}
                onChange={(date) => handleInputChange("availableUntil", date)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <hr />
      <div className="d-flex justify-content-end" style={{ gap: "0.5%" }}>
        <Button
          color="danger"
          onClick={() => handleSave(false)}
          variant="solid"
        >
          Save
        </Button>
        <Button
          variant="solid"
          style={{ background: "#4CAF50", color: "white" }}
          onClick={() => handleSave(true)}
        >
          Save & Publish
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
