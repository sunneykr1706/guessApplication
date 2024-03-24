"use client";
import React, { useState } from "react";
import { Form, Input, Button, Card, Row, Col, Tooltip, Spin } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchDataRequest } from "../dux/guessFormReducer";
import { guessRuleGame } from "@/helpers/constants";
import InputForm from "./InputForm";

// Define the interface for your state
interface MyState {
  guess: {
    isLoading: boolean;
  };
}

const GuessForm: React.FC = () => {
  const [isNameEntered, setIsNameEntered] = useState<boolean>(false);
  const isLoading = useSelector((state: MyState) => state.guess.isLoading); // Add type annotation
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const validateName = (_: unknown, value: string) => {
    const pattern = /^[a-zA-Z\s]*$/;
    if (!value || pattern.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Name should only contain text"));
  };

  const handleSubmit = async (values: { name: string }) => {
    console.log("Submitted values:", values);
    if (values.name.trim() === "") {
      form.setFields([
        {
          name: "name",
          errors: ["Name is required"],
        },
      ]);
      return;
    }
    dispatch(fetchDataRequest(values.name));
    setIsNameEntered(true);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "97vh",
        backgroundColor: "black",
      }}
    >
      <Card style={{ width: 700, height: 400 }}>
        <div>
          <Row align="middle" gutter={[16, 0]}>
            <Col span={18}>
              <h1>Guessing Game</h1>
            </Col>
            <Col span={6}>
              <Tooltip title={guessRuleGame}>
                <InfoCircleOutlined />
              </Tooltip>
            </Col>
          </Row>
          <Form form={form} onFinish={handleSubmit}>
            <Row gutter={[16, 0]} align="middle">
              <Col span={18}>
                <Form.Item
                  name="name"
                  label="Enter a name"
                  rules={[
                    {
                      required: true,
                      message: "Name is required",
                    },
                    {
                      validator: validateName,
                    },
                  ]}
                >
                  <Input
                    type="text"
                    prefix={<UserOutlined />}
                    placeholder="Enter a name"
                    disabled={isNameEntered}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                {isNameEntered ? null : (
                  <div style={{ marginTop: -26 }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={isLoading}
                      onClick={() => form.submit()}
                    >
                      {isLoading ? <Spin /> : "Submit"}
                    </Button>
                  </div>
                )}
              </Col>
            </Row>
          </Form>
        </div>
        {isNameEntered && <InputForm />}
      </Card>
    </div>
  );
};

export default GuessForm;
