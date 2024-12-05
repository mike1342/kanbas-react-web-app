import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Details from "./Details";
import Questions from "./Questions";
import { useLocation } from "react-router";

export default function QuizDetailsEditor() {
  const location = useLocation();
  const activeTabFromState = location.state?.activeTab || "1";
  const onChange = (key: string) => {
    console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Details",
      children: <Details />,
    },
    {
      key: "2",
      label: "Questions",
      children: <Questions />,
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
