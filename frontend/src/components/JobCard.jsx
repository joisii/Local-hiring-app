import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Divider,
  Avatar,
  Row,
  Col
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  StarOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  ToolOutlined
} from "@ant-design/icons";

import {
  Link
} from "react-router-dom";

const {
  Title,
  Text,
  Paragraph
} = Typography;

function JobCard({
  job,
  onAccept,
  onStatusUpdate,
  currentUser,
  showReviewButton = false
}) {

  // status color
  const getStatusColor =
    (status) => {

      switch (status) {

        case "pending":
          return "orange";

        case "accepted":
          return "blue";

        case "ongoing":
          return "purple";

        case "completed":
          return "green";

        default:
          return "default";
      }
    };

  // status icon
  const getStatusIcon =
    (status) => {

      switch (status) {

        case "pending":
          return (
            <ClockCircleOutlined />
          );

        case "accepted":
          return (
            <ToolOutlined />
          );

        case "ongoing":
          return (
            <PlayCircleOutlined />
          );

        case "completed":
          return (
            <CheckCircleOutlined />
          );

        default:
          return null;
      }
    };

  return (

    <Card
      hoverable
      variant={false}
      style={{
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow:
          "0 8px 25px rgba(0,0,0,0.06)",
        transition: "0.3s",
        height: "100%"
      }}
      styles={{
        padding: "24px"
      }}
    >

      {/* TOP HEADER */}
      <Row
        justify="space-between"
        align="top"
        gutter={[16, 16]}
      >

        <Col flex="auto">

          <Space
            orientation="vertical"
            size="small"
            style={{
              width: "100%"
            }}
          >

            {/* TITLE */}
            <Title
              level={4}
              style={{
                marginBottom: 0
              }}
            >
              {job.title}
            </Title>

            {/* DESCRIPTION */}
            <Paragraph
              type="secondary"
              ellipsis={{
                rows: 3
              }}
              style={{
                marginBottom: 0,
                lineHeight: 1.7
              }}
            >
              {job.description}
            </Paragraph>

          </Space>

        </Col>

        {/* STATUS */}
        <Col>

          <Tag
            color={
              getStatusColor(
                job.status
              )
            }
            icon={
              getStatusIcon(
                job.status
              )
            }
            style={{
              padding:
                "6px 14px",
              borderRadius:
                "20px",
              fontWeight:
                "600",
              textTransform:
                "capitalize",
              fontSize:
                "13px"
            }}
          >
            {job.status}
          </Tag>

        </Col>

      </Row>

      <Divider />

      {/* JOB DETAILS */}
      <Row
        gutter={[20, 20]}
      >

        {/* BUDGET */}
        <Col xs={24} sm={12}>

          <Card
            variant={false}
            style={{
              background:
                "#f5f7fb",
              borderRadius:
                "18px"
            }}
          >

            <Space>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius:
                    "12px",
                  background:
                    "#1677ff",
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center"
                }}
              >

                <DollarOutlined
                  style={{
                    color:
                      "#fff",
                    fontSize:
                      "18px"
                  }}
                />

              </div>

              <div>

                <Text
                  type="secondary"
                >
                  Budget
                </Text>

                <br />

                <Text
                  strong
                  style={{
                    fontSize:
                      "16px"
                  }}
                >
                  ₹{job.budget}
                </Text>

              </div>

            </Space>

          </Card>

        </Col>

        {/* STATUS BOX */}
        <Col xs={24} sm={12}>

          <Card
            variant={false}
            style={{
              background:
                "#f5f7fb",
              borderRadius:
                "18px"
            }}
          >

            <Space>

              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius:
                    "12px",
                  background:
                    "#52c41a",
                  display: "flex",
                  justifyContent:
                    "center",
                  alignItems:
                    "center"
                }}
              >

                {getStatusIcon(
                  job.status
                )}

              </div>

              <div>

                <Text
                  type="secondary"
                >
                  Job Status
                </Text>

                <br />

                <Text
                  strong
                  style={{
                    textTransform:
                      "capitalize",
                    fontSize:
                      "16px"
                  }}
                >
                  {job.status}
                </Text>

              </div>

            </Space>

          </Card>

        </Col>

      </Row>

      {/* WORKER DETAILS */}
      {job.worker && (

        <>

          <Divider />

          <Card
            variant={false}
            style={{
              background:
                "#fafafa",
              borderRadius:
                "18px"
            }}
          >

            <Space
              align="start"
              size="middle"
            >

              <Avatar
                size={56}
                icon={
                  <UserOutlined />
                }
                style={{
                  background:
                    "#1677ff"
                }}
              />

              <div>

                <Title
                  level={5}
                  style={{
                    marginBottom:
                      "4px"
                  }}
                >
                  Accepted By
                </Title>

                <Text
                  strong
                >
                  <UserOutlined />{" "}
                  {job.worker.name}
                </Text>

                <br />

                <Text
                  type="secondary"
                >
                  <MailOutlined />{" "}
                  {job.worker.email}
                </Text>

              </div>

            </Space>

          </Card>

        </>

      )}

      {/* REVIEW */}
      {job.review && (

        <>

          <Divider />

          <Card
            variant={false}
            style={{
              background:
                "#f6ffed",
              border:
                "1px solid #b7eb8f",
              borderRadius:
                "18px"
            }}
          >

            <Space
              orientation="vertical"
              size="small"
              style={{
                width: "100%"
              }}
            >

              <Space
                align="center"
              >

                <StarOutlined
                  style={{
                    color:
                      "#faad14",
                    fontSize:
                      "20px"
                  }}
                />

                <Text
                  strong
                  style={{
                    fontSize:
                      "18px"
                  }}
                >
                  {job.review.rating}/5
                </Text>

              </Space>

              <Paragraph
                italic
                style={{
                  marginBottom:
                    "8px",
                  lineHeight:
                    1.7
                }}
              >
                "
                {
                  job.review
                    .comment
                }
                "
              </Paragraph>

              <Text
                type="secondary"
              >
                —{" "}
                {
                  job.review
                    .client
                    ?.name
                }
              </Text>

            </Space>

          </Card>

        </>

      )}

      <Divider />

      {/* ACTION BUTTONS */}
      <Space
        wrap
        size="middle"
        style={{
          width: "100%"
        }}
      >

        {/* ACCEPT */}
        {onAccept &&
          job.status ===
            "pending" && (

            <Button
              type="primary"

              size="large"

              onClick={() =>
                onAccept(
                  job._id
                )
              }

              style={{
                borderRadius:
                  "12px",
                fontWeight:
                  "600"
              }}
            >
              Accept Job
            </Button>

          )}

        {/* START */}
        {currentUser?.role ===
          "worker" &&
          job.status ===
            "accepted" && (

            <Button
              type="default"

              size="large"

              icon={
                <PlayCircleOutlined />
              }

              onClick={() =>
                onStatusUpdate(
                  job._id,
                  "ongoing"
                )
              }

              style={{
                borderRadius:
                  "12px",
                fontWeight:
                  "600"
              }}
            >
              Start Job
            </Button>

          )}

        {/* COMPLETE */}
        {currentUser?.role ===
          "worker" &&
          job.status ===
            "ongoing" && (

            <Button
              type="primary"

              size="large"

              icon={
                <CheckCircleOutlined />
              }

              onClick={() =>
                onStatusUpdate(
                  job._id,
                  "completed"
                )
              }

              style={{
                borderRadius:
                  "12px",
                fontWeight:
                  "600"
              }}
            >
              Complete Job
            </Button>

          )}

        {/* REVIEW */}
        {showReviewButton &&
          job.status ===
            "completed" && (

            job.review ? (

              <Button
                disabled
                size="large"
                icon={
                  <StarOutlined />
                }
                style={{
                  borderRadius:
                    "12px",
                  fontWeight:
                    "600"
                }}
              >
                Review Submitted
              </Button>

            ) : (

              <Link
                to={`/review/${job._id}`}
              >

                <Button
                  type="dashed"

                  size="large"

                  icon={
                    <StarOutlined />
                  }

                  style={{
                    borderRadius:
                      "12px",
                    fontWeight:
                      "600"
                  }}
                >
                  Give Review
                </Button>

              </Link>

            )
          )}

      </Space>

    </Card>
  );
}

export default JobCard;