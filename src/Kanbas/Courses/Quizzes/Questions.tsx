import { Button, Card, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Segmented } from "antd";
import { useState } from "react";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";
import FillInBlank from "./FillInBlank";

export default function Questions() {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState("Multiple Choice");

  const renderQuestionComponent = (type: string, fieldName: string) => {
    switch (type) {
      case "Multiple Choice":
        return <MultipleChoice formField={fieldName} />;
      case "True/False":
        return <TrueFalse formField={fieldName} />;
      case "Fill In Blank":
        return <FillInBlank formField={fieldName} />;
      default:
        return null;
    }
  };

  return (
    <Form
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      form={form}
      name="dynamic_form_complex"
      style={{ maxWidth: 600 }}
      autoComplete="off"
      initialValues={{ items: [] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Question ${field.name + 1}`}
                key={field.key}
                extra={
                  <CloseOutlined
                    onClick={() => {
                      remove(field.name);
                    }}
                  />
                }
              >
                <Form.Item
                  label="Type"
                  name={[field.name, "type"]}
                  initialValue={selectedType}
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 10 }}
                >
                  <Input disabled />
                </Form.Item>
                {renderQuestionComponent(
                  form.getFieldValue(["items", field.name, "type"]),
                  field.name.toString()
                )}
              </Card>
            ))}

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Segmented
                options={["Multiple Choice", "True/False", "Fill In Blank"]}
                value={selectedType}
                onChange={(value) => setSelectedType(value as string)}
              />
              <Button
                type="dashed"
                onClick={() => add({ type: selectedType, name: "", list: [] })}
                block
              >
                + Add Item
              </Button>
            </div>
          </div>
        )}
      </Form.List>
    </Form>
  );
}
