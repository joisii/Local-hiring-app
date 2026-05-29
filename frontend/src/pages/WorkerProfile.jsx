import {
  useEffect,
  useState
} from "react";

import {
  Card,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Typography,
  Space,
  Row,
  Col,
  Avatar,
  Divider,
  Tag,
  Spin,
  Grid
} from "antd";

import {
  ToolOutlined,
  DollarOutlined,
  SaveOutlined,
  UserOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

import API from "../services/api";

import DashboardLayout
from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

const {
  Title,
  Text,
  Paragraph
} = Typography;

const { useBreakpoint } = Grid;

function WorkerProfile() {

  const screens =
    useBreakpoint();

  const [loading, setLoading] =
    useState(false);

  const [pageLoading,
    setPageLoading] =
    useState(true);

  const [formData,
    setFormData] =
    useState({
      skills: "",
      pricing: "",
      availability: true
    });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      setPageLoading(true);

      const res =
        await API.get(
          "/users/me"
        );

      setFormData({
        skills:
          res.data.data.skills.join(
            ", "
          ),

        pricing:
          res.data.data.pricing,

        availability:
          res.data.data
            .availability
      });

    } catch {

      toast.error(
        "Failed to load profile"
      );

    } finally {

      setPageLoading(false);

    }
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await API.put(
        "/users/worker-profile",
        {
          skills:
            formData.skills
              .split(",")
              .map((s) =>
                s.trim()
              ),

          pricing:
            Number(
              formData.pricing
            ),

          availability:
            formData.availability
        }
      );

      toast.success(
        "Profile updated"
      );

    } catch {

      toast.error(
        "Update failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout
      title="Worker Profile"
    >

      {pageLoading ? (

        <Card
          variant={false}
          style={{
            borderRadius:
              "24px",
            padding: "60px",
            textAlign:
              "center"
          }}
        >

          <Spin size="large" />

          <Paragraph
            type="secondary"
            style={{
              marginTop: "20px"
            }}
          >
            Loading profile...
          </Paragraph>

        </Card>

      ) : (

        <Row
          justify="center"
        >

          <Col
            xs={24}
            lg={20}
            xl={16}
          >

            {/* HERO SECTION */}
            <Card
              variant={false}
              style={{
                marginBottom:
                  "30px",
                borderRadius:
                  "28px",
                overflow:
                  "hidden",
                background:
                  "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)",
                boxShadow:
                  "0 10px 35px rgba(22,119,255,0.25)"
              }}
            >

              <Row
                gutter={[30, 30]}
                align="middle"
              >

                {/* LEFT */}
                <Col
                  xs={24}
                  md={16}
                >

                  <Space
                    orientation="vertical"
                    size="middle"
                  >

                    <Space
                      align="center"
                      size="large"
                    >

                      <Avatar
                        size={90}
                        icon={
                          <UserOutlined />
                        }
                        style={{
                          background:
                            "#fff",
                          color:
                            "#1677ff"
                        }}
                      />

                      <div>

                        <Title
                          level={2}
                          style={{
                            color:
                              "#fff",
                            margin:
                              0
                          }}
                        >
                          Worker
                          Profile
                        </Title>

                        <Text
                          style={{
                            color:
                              "rgba(255,255,255,0.8)",
                            fontSize:
                              "16px"
                          }}
                        >
                          Manage your
                          professional
                          information
                        </Text>

                      </div>

                    </Space>

                    <Paragraph
                      style={{
                        color:
                          "rgba(255,255,255,0.85)",
                        lineHeight:
                          1.8,
                        fontSize:
                          "15px",
                        marginBottom:
                          0
                      }}
                    >
                      Keep your
                      skills,
                      pricing, and
                      availability
                      updated to
                      improve job
                      opportunities
                      and client
                      trust.
                    </Paragraph>

                  </Space>

                </Col>

                {/* RIGHT */}
                <Col
                  xs={24}
                  md={8}
                >

                  <Card
                    variant={false}
                    style={{
                      borderRadius:
                        "20px",
                      textAlign:
                        "center"
                    }}
                  >

                    <Space
                      orientation="vertical"
                    >

                      {formData.availability ? (

                        <CheckCircleOutlined
                          style={{
                            fontSize:
                              "40px",
                            color:
                              "#52c41a"
                          }}
                        />

                      ) : (

                        <CloseCircleOutlined
                          style={{
                            fontSize:
                              "40px",
                            color:
                              "#ff4d4f"
                          }}
                        />

                      )}

                      <Title
                        level={4}
                        style={{
                          margin:
                            0
                        }}
                      >
                        {formData.availability
                          ? "Available"
                          : "Unavailable"}
                      </Title>

                      <Text
                        type="secondary"
                      >
                        Current Work
                        Status
                      </Text>

                    </Space>

                  </Card>

                </Col>

              </Row>

            </Card>

            {/* PROFILE FORM */}
            <Card
              variant={false}
              style={{
                borderRadius:
                  "28px",
                boxShadow:
                  "0 8px 30px rgba(0,0,0,0.06)"
              }}
            >

              {/* HEADER */}
              <Space
                orientation="vertical"
                size="small"
                style={{
                  width: "100%",
                  marginBottom:
                    "25px"
                }}
              >

                <Title
                  level={3}
                  style={{
                    marginBottom:
                      0
                  }}
                >
                  Update Profile
                </Title>

                <Text
                  type="secondary"
                >
                  Maintain your
                  professional
                  profile and job
                  preferences.
                </Text>

              </Space>

              <Divider />

              {/* INFO CARD */}
              <Card
                variant={false}
                style={{
                  marginBottom:
                    "30px",
                  borderRadius:
                    "18px",
                  background:
                    "#f5f7fb"
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
                        "#1677ff",
                      marginTop:
                        "4px"
                    }}
                  />

                  <div>

                    <Text
                      strong
                      style={{
                        fontSize:
                          "16px"
                      }}
                    >
                      Professional
                      Profile Tips
                    </Text>

                    <br />

                    <Text
                      type="secondary"
                      style={{
                        lineHeight:
                          1.8
                      }}
                    >
                      Add accurate
                      skills and
                      pricing to
                      increase your
                      chances of
                      getting hired.
                      Clients are
                      already
                      confused enough
                      by freelancers
                      calling
                      themselves
                      “full-stack AI
                      blockchain
                      ninjas.”
                    </Text>

                  </div>

                </Space>

              </Card>

              {/* FORM */}
              <Form
                layout="vertical"
                onFinish={
                  handleSubmit
                }
                size="large"
              >

                <Row
                  gutter={[24, 0]}
                >

                  {/* SKILLS */}
                  <Col
                    xs={24}
                  >

                    <Form.Item
                      label="Skills"
                    >

                      <Input
                        prefix={
                          <ToolOutlined />
                        }

                        placeholder="Electrician, Plumbing, Carpentry"

                        value={
                          formData.skills
                        }

                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            skills:
                              e.target
                                .value
                          })
                        }

                        style={{
                          height:
                            "50px",
                          borderRadius:
                            "12px"
                        }}
                      />

                    </Form.Item>

                    {/* SKILL TAGS */}
                    <div
                      style={{
                        marginBottom:
                          "25px"
                      }}
                    >

                      <Space wrap>

                        {formData.skills
                          .split(",")
                          .filter(
                            (skill) =>
                              skill.trim()
                          )
                          .map(
                            (
                              skill,
                              index
                            ) => (

                              <Tag
                                key={
                                  index
                                }
                                color="blue"
                                style={{
                                  padding:
                                    "6px 12px",
                                  borderRadius:
                                    "20px"
                                }}
                              >
                                {skill.trim()}
                              </Tag>

                            )
                          )}

                      </Space>

                    </div>

                  </Col>

                  {/* PRICING */}
                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Pricing (₹)"
                    >

                      <InputNumber
                        prefix={
                          <DollarOutlined />
                        }

                        placeholder="Enter pricing"

                        style={{
                          width:
                            "100%",
                          height:
                            "50px"
                        }}

                        value={
                          formData.pricing
                        }

                        onChange={(
                          value
                        ) =>
                          setFormData({
                            ...formData,
                            pricing:
                              value
                          })
                        }
                      />

                    </Form.Item>

                  </Col>

                  {/* AVAILABILITY */}
                  <Col
                    xs={24}
                    md={12}
                  >

                    <Form.Item
                      label="Availability"
                    >

                      <Card
                        variant
                        style={{
                          borderRadius:
                            "14px"
                        }}
                      >

                        <Space
                          style={{
                            width:
                              "100%",
                            justifyContent:
                              "space-between"
                          }}
                        >

                          <div>

                            <Text
                              strong
                            >
                              Available
                              for Jobs
                            </Text>

                            <br />

                            <Text
                              type="secondary"
                            >
                              Toggle your
                              work
                              availability
                            </Text>

                          </div>

                          <Switch
                            checked={
                              formData.availability
                            }

                            onChange={(
                              checked
                            ) =>
                              setFormData({
                                ...formData,
                                availability:
                                  checked
                              })
                            }
                          />

                        </Space>

                      </Card>

                    </Form.Item>

                  </Col>

                </Row>

                {/* BUTTON */}
                <Form.Item
                  style={{
                    marginTop:
                      "20px"
                  }}
                >

                  <Button
                    type="primary"

                    htmlType="submit"

                    icon={
                      <SaveOutlined />
                    }

                    loading={loading}

                    size="large"

                    block

                    style={{
                      height:
                        "52px",
                      borderRadius:
                        "14px",
                      fontWeight:
                        "600",
                      fontSize:
                        "16px"
                    }}
                  >
                    Save Profile
                  </Button>

                </Form.Item>

              </Form>

            </Card>

          </Col>

        </Row>

      )}

    </DashboardLayout>

  );
}

export default WorkerProfile;