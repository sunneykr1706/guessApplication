import React, { useState } from "react";
import { Input, Select, Form, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
const { Option } = Select;

const InputForm: React.FC = () => {
  const [age, setAge] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [nationality, setNationality] = useState<string>("");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [countResult, setCountResult] = useState<number>(0);
  const countryList = useSelector((state: any) => state.guess.countryList);
  const correctAge = useSelector((state: any) => state.guess.age);
  const correctGender = useSelector((state: any) => state.guess.gender);
  const correctCountry = useSelector((state: any) => state.guess.country);

  const handleAgeChange = (value: string) => {
    setAge(value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleNationalityChange = (value: string) => {
    setNationality(value);
  };

  const handleSubmit = (values: { age: string, gender: string, nationality: string }) => {
    console.log("Submitted values:", values);
    setFormSubmitted(true);
    let correctCount = 0;
    if (parseInt(values.age) === correctAge) correctCount++;
    if (values.nationality === correctCountry.country_id) correctCount++;
    if (values.gender === correctGender) correctCount++;
    setCountResult(correctCount);
  };

  const handleTryAgain = () => {
    setFormSubmitted(false);
    setAge("");
    setGender("");
    setNationality("");
    setCountResult(0);
  };

  const handleReload = () => {
    window.location.reload(); // Reload the page
  };

  return (
    <div style={{ marginTop: 12 }}>
      {!formSubmitted ? (
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="age"
            label="Age"
            rules={[
              { required: true, message: "Please enter age" },
              { pattern: /^\d+$/, message: "Please enter a valid number" },
            ]}
          >
            <Input
              value={age}
              onChange={(e) => handleAgeChange(e.target.value)}
              prefix={<UserOutlined />}
              placeholder="Enter age"
            />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender" }]}
          >
            <Select
              value={gender}
              onChange={handleGenderChange}
              placeholder="Select gender"
            >
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="nationality"
            label="Nationality"
            rules={[{ required: true, message: "Please select nationality" }]}
          >
        <Select
          value={nationality}
          onChange={handleNationalityChange}
          placeholder="Select nationality"
        >
          {countryList?.map((country: { country_id: string }) => (
            <Option key={country.country_id} value={country.country_id}>
              {country.country_id}
            </Option>
          ))}
        </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "18px", marginBottom: "16px" }}>
            {countResult === 3
              ? "All 3 are correct! Reload to play again."
              : `${countResult} out of 3 are correct`}
          </p>
          {countResult < 3 && (
            <Button type="primary" onClick={handleTryAgain}>
              Try Again
            </Button>
          )}
          {countResult === 3 && (
            <Button type="primary" onClick={handleReload}>
              Reload
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputForm;
