import { useContext, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Space,
  Divider
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined
} from "@ant-design/icons";

import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";
import { AuthContext } from "../context/AuthContext";

const { Title, Text } = Typography;

function Login() {
  const navigate = useNavigate();

  const { setUser, setToken } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      const res = await API.post("/auth/login", values);

      const { token, user } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(token);
      setUser(user);

      toast.success("Login successful");

      // Role-based navigation
      if (user.role === "worker") {
        navigate("/worker-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        padding: "20px"
      }}
    >
      <Card
        style={{
          width: 420,
          borderRadius: "20px",
          boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
          backdropFilter: "blur(10px)"
        }}
      >
        <Space
          orientation="vertical"
          size="small"
          style={{
            width: "100%",
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          <Title level={2} style={{ marginBottom: 0 }}>
            Welcome Back
          </Title>

          <Text type="secondary">
            Login to continue to your account
          </Text>
        </Space>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email"
              },
              {
                type: "email",
                message: "Enter a valid email"
              }
            ]}
          >
            <Input
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
                message: "Please enter your password"
              }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
            />
          </Form.Item>

          <Form.Item style={{ marginTop: "10px" }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              icon={<LoginOutlined />}
              loading={loading}
              style={{
                height: "45px",
                borderRadius: "10px",
                fontWeight: "600"
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>

        <Divider />

        <div style={{ textAlign: "center" }}>
          <Text type="secondary">
            Don&apos;t have an account?
          </Text>

          <br />

          <Link to="/register">
            <Button
              type="link"
              icon={<UserAddOutlined />}
              style={{
                marginTop: "8px",
                fontWeight: "600"
              }}
            >
              Create New Account
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Login;