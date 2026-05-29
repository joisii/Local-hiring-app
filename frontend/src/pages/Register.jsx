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
  Divider,
  Space,
  Grid
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UserAddOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";

import {
  Link,
  useNavigate
} from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";

const { Title, Text, Paragraph } =
  Typography;

const { useBreakpoint } = Grid;

function Register() {

  const navigate = useNavigate();

  const screens = useBreakpoint();

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    values
  ) => {

    try {

      setLoading(true);

      const res = await API.post(
        "/auth/register",
        values
      );

      toast.success(
        res.data.message ||
        "Registration successful"
      );

      // Redirect to login page
      navigate("/");

    } catch (error) {

      console.log(error);

      toast.error(
        error?.response?.data
          ?.message ||
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
          "linear-gradient(135deg, #0f172a 0%, #111827 40%, #1e293b 100%)",
        overflow: "hidden"
      }}
    >

      <Row
        style={{
          minHeight: "100vh"
        }}
      >

        {/* LEFT SECTION */}
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

                {/* HERO TEXT */}
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
                    Join the
                    Hiring Platform
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
                    Create your
                    professional account
                    and connect workers
                    with clients through
                    a fast, modern, and
                    reliable hiring
                    ecosystem.
                  </Paragraph>

                </div>

                {/* FEATURE CARDS */}
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
                          Secure Platform
                        </Text>

                        <br />

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.65)"
                          }}
                        >
                          Protected
                          authentication
                          and secure user
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
                          Simplified job
                          posting and worker
                          hiring experience.
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
                          Smart Networking
                        </Text>

                        <br />

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.65)"
                          }}
                        >
                          Connect clients
                          and workers with
                          efficient hiring
                          workflows.
                        </Text>

                      </div>

                    </Space>

                  </Card>

                </Space>

              </Space>

            </div>

          </Col>

        )}

        {/* RIGHT SECTION */}
        <Col
          xs={24}
          md={12}
          lg={10}
          xl={9}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding:
              screens.xs
                ? "20px"
                : "40px"
          }}
        >

          <Card
            variant={false}
            style={{
              width: "100%",
              maxWidth: "480px",
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
                Create Account
              </Title>

              <Text type="secondary">
                Register to continue
                to the platform
              </Text>

            </div>

            {/* FORM */}
            <Form
              layout="vertical"
              onFinish={
                handleSubmit
              }
              initialValues={{
                role: "client"
              }}
              size="large"
            >

              {/* FULL NAME */}
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
                  prefix={
                    <UserOutlined />
                  }

                  placeholder="Enter your full name"

                  style={{
                    height: "50px",
                    borderRadius:
                      "12px"
                  }}
                />

              </Form.Item>

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
                      "Please enter a valid email"
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
                  },
                  {
                    min: 6,
                    message:
                      "Password must be at least 6 characters"
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

              {/* ROLE */}
              <Form.Item
                label="Select Role"
                name="role"
              >

                <Select
                  style={{
                    borderRadius:
                      "12px"
                  }}
                >

                  <Select.Option value="client">
                    Client
                  </Select.Option>

                  <Select.Option value="worker">
                    Worker
                  </Select.Option>

                </Select>

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
                    <UserAddOutlined />
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
                  Create Account
                </Button>

              </Form.Item>

            </Form>

            <Divider />

            {/* LOGIN */}
            <div
              style={{
                textAlign: "center"
              }}
            >

              <Text type="secondary">
                Already have an
                account?
              </Text>

              <br />

              <Link to="/">

                <Button
                  type="link"

                  style={{
                    marginTop:
                      "10px",
                    fontWeight:
                      "600",
                    fontSize:
                      "15px"
                  }}
                >
                  Login Here
                </Button>

              </Link>

            </div>

          </Card>

        </Col>

      </Row>

    </div>

  );
}

export default Register;