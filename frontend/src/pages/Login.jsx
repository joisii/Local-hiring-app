import { useContext, useState } from "react";

import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Grid
} from "antd";

import {
  MailOutlined,
  LockOutlined,
  LoginOutlined,
  UserAddOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  TeamOutlined
} from "@ant-design/icons";

import {
  useNavigate,
  Link
} from "react-router-dom";

import toast from "react-hot-toast";

import API from "../services/api";

import { AuthContext }
from "../context/AuthContext";

const { Title, Text, Paragraph } =
  Typography;

const { useBreakpoint } = Grid;

function Login() {

  const navigate = useNavigate();

  const screens = useBreakpoint();

  const {
    setUser,
    setAccessToken
  } = useContext(AuthContext);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    values
  ) => {

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/login",
        values
      );

      console.log(res.data);

      const {
        accessToken,
        user
      } = res.data.data;

      // store tokens
      localStorage.setItem(
        "accessToken",
        accessToken
      );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // update context
      setAccessToken(accessToken);

      setUser(user);

      toast.success(
        "Login successful"
      );

      // navigation
      if (
        user.role === "worker"
      ) {

        navigate(
          "/worker-dashboard"
        );

      } else {

        navigate(
          "/client-dashboard"
        );
      }

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
        "Login failed"
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
          "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
        overflow: "hidden"
      }}
    >

      <Row
        style={{
          minHeight: "100vh"
        }}
      >

        {/* LEFT SIDE */}
        {!screens.xs && (

          <Col
            xs={0}
            md={12}
            lg={14}
            xl={15}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "50px"
            }}
          >

            <div
              style={{
                maxWidth: "520px"
              }}
            >

              <Space
                orientation="vertical"
                size="large"
              >

                <div>

                  <Title
                    style={{
                      color: "#fff",
                      fontSize:
                        screens.lg
                          ? "58px"
                          : "42px",
                      lineHeight: 1.1,
                      marginBottom:
                        "20px"
                    }}
                  >
                    Local Hiring
                    Platform
                  </Title>

                  <Paragraph
                    style={{
                      color:
                        "rgba(255,255,255,0.75)",
                      fontSize:
                        "18px",
                      lineHeight: 1.8
                    }}
                  >
                    A modern hiring
                    ecosystem for
                    workers and
                    clients.
                    Manage jobs,
                    hiring, reviews,
                    and workforce
                    operations in one
                    professional
                    platform.
                  </Paragraph>

                </div>

                {/* Feature Cards */}
                <Space
                  orientation="vertical"
                  size="middle"
                  style={{
                    width: "100%"
                  }}
                >

                  <Card
                    variant={false}
                    style={{
                      background:
                        "rgba(255,255,255,0.08)",
                      backdropFilter:
                        "blur(10px)",
                      borderRadius:
                        "18px"
                    }}
                  >

                    <Space
                      align="start"
                    >

                      <SafetyCertificateOutlined
                        style={{
                          fontSize:
                            "24px",
                          color:
                            "#60a5fa"
                        }}
                      />

                      <div>

                        <Text
                          style={{
                            color:
                              "#fff",
                            fontSize:
                              "16px",
                            fontWeight:
                              "600"
                          }}
                        >
                          Secure
                          Authentication
                        </Text>

                        <br />

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.65)"
                          }}
                        >
                          Protected
                          access with
                          role-based
                          authentication.
                        </Text>

                      </div>

                    </Space>

                  </Card>

                  <Card
                    variant={false}
                    style={{
                      background:
                        "rgba(255,255,255,0.08)",
                      backdropFilter:
                        "blur(10px)",
                      borderRadius:
                        "18px"
                    }}
                  >

                    <Space
                      align="start"
                    >

                      <ThunderboltOutlined
                        style={{
                          fontSize:
                            "24px",
                          color:
                            "#60a5fa"
                        }}
                      />

                      <div>

                        <Text
                          style={{
                            color:
                              "#fff",
                            fontSize:
                              "16px",
                            fontWeight:
                              "600"
                          }}
                        >
                          Fast Workflow
                        </Text>

                        <br />

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.65)"
                          }}
                        >
                          Streamlined
                          job posting and
                          worker
                          management.
                        </Text>

                      </div>

                    </Space>

                  </Card>

                  <Card
                    variant={false}
                    style={{
                      background:
                        "rgba(255,255,255,0.08)",
                      backdropFilter:
                        "blur(10px)",
                      borderRadius:
                        "18px"
                    }}
                  >

                    <Space
                      align="start"
                    >

                      <TeamOutlined
                        style={{
                          fontSize:
                            "24px",
                          color:
                            "#60a5fa"
                        }}
                      />

                      <div>

                        <Text
                          style={{
                            color:
                              "#fff",
                            fontSize:
                              "16px",
                            fontWeight:
                              "600"
                          }}
                        >
                          Smart Hiring
                        </Text>

                        <br />

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.65)"
                          }}
                        >
                          Connect
                          clients and
                          workers with
                          better hiring
                          experiences.
                        </Text>

                      </div>

                    </Space>

                  </Card>

                </Space>

              </Space>

            </div>

          </Col>

        )}

        {/* RIGHT SIDE */}
        <Col
          xs={24}
          md={12}
          lg={10}
          xl={9}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: screens.xs
              ? "20px"
              : "40px"
          }}
        >

          <Card
            variant={false}
            style={{
              width: "100%",
              maxWidth: "460px",
              borderRadius: "28px",
              boxShadow:
                "0 15px 45px rgba(0,0,0,0.25)",
              background:
                "rgba(255,255,255,0.96)",
              backdropFilter:
                "blur(14px)"
            }}
          >

            {/* HEADER */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "30px"
              }}
            >

              <Title
                level={2}
                style={{
                  marginBottom: "8px"
                }}
              >
                Welcome Back
              </Title>

              <Text type="secondary">
                Login to continue to
                your dashboard
              </Text>

            </div>

            {/* FORM */}
            <Form
              layout="vertical"
              onFinish={
                handleSubmit
              }
              size="large"
            >

              {/* EMAIL */}
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
                      "Enter a valid email"
                  }
                ]}
              >

                <Input
                  prefix={
                    <MailOutlined />
                  }

                  placeholder="Enter your email"

                  style={{
                    height: "50px",
                    borderRadius:
                      "12px"
                  }}
                />

              </Form.Item>

              {/* PASSWORD */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter your password"
                  }
                ]}
              >

                <Input.Password
                  prefix={
                    <LockOutlined />
                  }

                  placeholder="Enter your password"

                  style={{
                    height: "50px",
                    borderRadius:
                      "12px"
                  }}
                />

              </Form.Item>

              {/* BUTTON */}
              <Form.Item
                style={{
                  marginTop: "25px"
                }}
              >

                <Button
                  type="primary"

                  htmlType="submit"

                  block

                  icon={
                    <LoginOutlined />
                  }

                  loading={loading}

                  style={{
                    height: "52px",
                    borderRadius:
                      "14px",
                    fontWeight:
                      "600",
                    fontSize:
                      "16px"
                  }}
                >
                  Login
                </Button>

              </Form.Item>

            </Form>

            <Divider />

            {/* REGISTER */}
            <div
              style={{
                textAlign: "center"
              }}
            >

              <Text type="secondary">
                Don&apos;t have an
                account?
              </Text>

              <br />

              <Link to="/register">

                <Button
                  type="link"

                  icon={
                    <UserAddOutlined />
                  }

                  style={{
                    marginTop:
                      "10px",
                    fontWeight:
                      "600",
                    fontSize:
                      "15px"
                  }}
                >
                  Create New Account
                </Button>

              </Link>

            </div>

          </Card>

        </Col>

      </Row>

    </div>

  );
}

export default Login;