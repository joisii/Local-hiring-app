import {
  Card,
  Typography,
  Tag,
  Button,
  Space,
  Divider
} from "antd";

import {
  UserOutlined,
  MailOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  StarOutlined
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;

function JobCard({
  job,
  onAccept,
  onStatusUpdate,
  currentUser,
  showReviewButton = false
}) {

  // status color
  const getStatusColor = (status) => {

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

  return (

    <Card
      hoverable
      style={{
        marginBottom: "20px",
        borderRadius: "12px"
      }}
    >

      {/* title */}
      <Title level={4}>
        {job.title}
      </Title>

      {/* description */}
      <Paragraph type="secondary">
        {job.description}
      </Paragraph>

      <Divider />

      {/* budget */}
      <Text strong>
        Budget:
      </Text>

      <Text style={{ marginLeft: "8px" }}>
        ₹{job.budget}
      </Text>

      <br />
      <br />

      {/* status */}
      <Text strong>
        Status:
      </Text>

      <Tag
        color={getStatusColor(job.status)}
        style={{ marginLeft: "10px" }}
      >
        {job.status.toUpperCase()}
      </Tag>

      {/* worker details */}
      {job.worker && (
        <>
          <Divider />

          <Space
            orientation="vertical"
            size="small"
          >

            <Text>
              <UserOutlined />{" "}
              <strong>Accepted By:</strong>{" "}
              {job.worker.name}
            </Text>

            <Text>
              <MailOutlined />{" "}
              <strong>Email:</strong>{" "}
              {job.worker.email}
            </Text>

          </Space>
        </>
      )}

      {/* review display */}
      {job.review && (
        <>
          <Divider />

          <div
            style={{
              padding: "12px",
              border: "1px solid #d9f7be",
              background: "#f6ffed",
              borderRadius: "8px"
            }}
          >

            <Text strong>
              ⭐ {job.review.rating}/5
            </Text>

            <br />
            <br />

            <Paragraph italic>
              "{job.review.comment}"
            </Paragraph>

            <Text type="secondary">
              — {job.review.client?.name}
            </Text>

          </div>
        </>
      )}

      <Divider />

      {/* buttons */}
      <Space wrap>

        {/* accept job */}
        {onAccept &&
          job.status === "pending" && (
            <Button
              type="primary"
              onClick={() =>
                onAccept(job._id)
              }
            >
              Accept Job
            </Button>
          )}

        {/* start job */}
        {currentUser?.role === "worker" &&
          job.status === "accepted" && (
            <Button
              type="default"
              icon={<PlayCircleOutlined />}
              onClick={() =>
                onStatusUpdate(
                  job._id,
                  "ongoing"
                )
              }
            >
              Start Job
            </Button>
          )}

        {/* complete job */}
        {currentUser?.role === "worker" &&
          job.status === "ongoing" && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() =>
                onStatusUpdate(
                  job._id,
                  "completed"
                )
              }
            >
              Complete Job
            </Button>
          )}

 {showReviewButton &&
  job.status === "completed" && (

    job.review ? (

      <Button
        disabled
        icon={<StarOutlined />}
      >
        Review Submitted
      </Button>

    ) : (

      <Link to={`/review/${job._id}`}>

        <Button
          type="dashed"
          icon={<StarOutlined />}
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