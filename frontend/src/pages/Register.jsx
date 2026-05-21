import { useState } from "react";

import {
  Card,
  Form,
  Input,
  Button,
  Select,
  Typography,
  Row,
  Col,
  Divider
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";
import toast from "react-hot-toast";

const { Title, Text } = Typography;

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await API.post(
        "/auth/register",
        values
      );

      toast.success(
        res.data.message || "Registration successful"
      );

      // Redirect to login page
      navigate("/");

    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <Row
        justify="center"
        align="middle"
        style={{ width: "100%" }}
      >
        <Col xs={24} sm={20} md={14} lg={10} xl={8}>
          <Card
            variant="outlined"
            style={{
              borderRadius: "20px",
              boxShadow:
                "0 10px 40px rgba(0,0,0,0.3)"
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Title level={2}>
                Create Account
              </Title>

              <Text type="secondary">
                Register to continue
              </Text>
            </div>

            <Divider />

            <Form
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                role: "client"
              }}
            >
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter your full name"
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Enter your name"
                />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter your email"
                  },
                  {
                    type: "email",
                    message:
                      "Please enter a valid email"
                  }
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="Enter your email"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter your password"
                  },
                  {
                    min: 6,
                    message:
                      "Password must be at least 6 characters"
                  }
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Enter password"
                />
              </Form.Item>

              <Form.Item
                label="Select Role"
                name="role"
              >
                <Select size="large">
                  <Select.Option value="client">
                    Client
                  </Select.Option>

                  <Select.Option value="worker">
                    Worker
                  </Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loading}
                  block
                  icon={<UserAddOutlined />}
                  style={{
                    height: "45px",
                    borderRadius: "10px",
                    fontWeight: "600"
                  }}
                >
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div
              style={{
                textAlign: "center",
                marginTop: "10px"
              }}
            >
              <Text type="secondary">
                Already have an account?
              </Text>

              <br />

              <Link
                to="/"
                style={{
                  color: "#1677ff",
                  fontWeight: "600"
                }}
              >
                Login Here
              </Link>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Register;