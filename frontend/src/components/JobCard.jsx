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
  PlayCircleOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

function JobCard({
  job,
  onAccept,
  onStatusUpdate,
  currentUser
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

      <Divider />

      {/* buttons */}
      <Space>

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
              success="true"
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

      </Space>

    </Card>
  );
}

export default JobCard;