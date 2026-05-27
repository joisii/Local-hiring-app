import {
  Card,
  Typography,
  Button,
  Tag,
  Space,
  Divider,
  Avatar
} from "antd";

import {
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  DollarOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } =
  Typography;

function JobCard({
  job,
  onAccept
}) {

  return (

    <Card
      hoverable

      style={{
        borderRadius: "16px",
        height: "100%",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      {/* Job Title */}
      <Title
        level={4}
        style={{
          marginBottom: "10px"
        }}
      >
        {job.title}
      </Title>

      {/* Description */}
      <Paragraph
        type="secondary"
      >
        {job.description}
      </Paragraph>

      {/* Budget */}
      <Space
        style={{
          marginBottom: "12px"
        }}
      >

        <DollarOutlined />

        <Text strong>
          Budget:
        </Text>

        <Text>
          ₹{job.budget}
        </Text>

      </Space>

      <br />

      {/* Status */}
      <Tag
        color={
          job.status === "pending"
            ? "orange"
            : "green"
        }
      >
        {job.status.toUpperCase()}
      </Tag>

      {/* Worker Details */}
      {job.worker && (
        <>

          <Divider />

          <Space
            orientation="vertical"
            size="small"
          >

            <Space>

              <Avatar
                icon={<UserOutlined />}
              />

              <div>

                <Text strong>
                  Accepted By
                </Text>

                <br />

                <Text>
                  {job.worker.name}
                </Text>

              </div>

            </Space>

            <Space>

              <MailOutlined />

              <Text>
                {job.worker.email}
              </Text>

            </Space>

          </Space>

        </>
      )}

      {/* Accept Button */}
      {onAccept &&
        job.status === "pending" && (

        <Button
          type="primary"

          icon={
            <CheckCircleOutlined />
          }

          onClick={() =>
            onAccept(job._id)
          }

          style={{
            marginTop: "20px"
          }}

          block
        >
          Accept Job
        </Button>

      )}

    </Card>

  );
}

export default JobCard;