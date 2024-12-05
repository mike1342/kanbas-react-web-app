import { Tabs } from "antd";
import type { TabsProps } from "antd";
import Details from "./Details";

export default function QuizDetailsEditor() {
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
      children: "Content of Tab Pane 2",
    },
  ];
  return (
    <div id="wd-quiz-details-editor">
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}
