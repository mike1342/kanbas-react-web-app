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
import { useNavigate } from "react-router";
export default function Details() {
  const { TextArea } = Input;
  const navigate = useNavigate();
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
          <Input defaultValue={"Unnamed Quiz"} />
        </Form.Item>
      </Form>
      <h6>Quiz Instructions:</h6>
      <Form.Item className="instructions">
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        label="Quiz Type"
        className="quiz-type"
        wrapperCol={{ span: 6 }}
      >
        <Select defaultValue={"graded-quiz"}>
          <Select.Option value="graded-quiz">Graded Quiz</Select.Option>
          <Select.Option value="practice-quiz">Practice Quiz</Select.Option>
          <Select.Option value="graded-survey">Graded Survey</Select.Option>
          <Select.Option value="ungraded-survey">Ungraded Survey</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Assignment Type"
        className="assignment-type"
        wrapperCol={{ span: 6 }}
      >
        <Select defaultValue={"at-quizzes"}>
          <Select.Option value="at-quizzes">Quizzes</Select.Option>
          <Select.Option value="at-exams">Exams</Select.Option>
          <Select.Option value="at-assignments">Assignment</Select.Option>
          <Select.Option value="at-projects">Projects</Select.Option>
        </Select>
      </Form.Item>
      <Card title="Options" style={{ borderRadius: "8px", padding: "16px" }}>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Shuffle Answers" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item label="Time Limit" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item label="Multiple Answers" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="One Question At A Time" valuePropName="checked">
                <Switch defaultChecked />
              </Form.Item>
              <Form.Item
                label="Lock Questions After Answering"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Show Correct Answers" valuePropName="checked">
                <Switch />
              </Form.Item>
              <Form.Item label="Minutes:" wrapperCol={{ span: 2 }}>
                <Input defaultValue={"20"} />
              </Form.Item>
              <Form.Item label="Access Code" wrapperCol={{ span: 4 }}>
                <Input />
              </Form.Item>
              <Form.Item label="Webcam Required" valuePropName="checked">
                <Switch />
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
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Available From" name="AvailableFromDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Until" name="AvailableUntilDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <hr />
      <div className="d-flex justify-content-end" style={{ gap: "0.5%" }}>
        {" "}
        <Button color="danger" variant="solid">
          Save
        </Button>
        <Button
          variant="solid"
          style={{ background: "#4CAF50", color: "white" }}
        >
          Save & Publish
        </Button>
        <Button
          variant="solid"
          onClick={() => navigate("/Kanbas/Courses/RS101/Quizzes")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
