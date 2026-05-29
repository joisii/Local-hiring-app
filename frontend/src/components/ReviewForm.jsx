import { useState } from "react";

import {
  Card,
  Form,
  Input,
  Button,
  Typography,
  Rate,
  Space
} from "antd";

import {
  MessageOutlined,
  SendOutlined
} from "@ant-design/icons";

import API from "../services/api";

import toast from "react-hot-toast";

const { Title, Text } = Typography;
const { TextArea } = Input;

function ReviewForm({
  jobId,
  onReviewSubmitted
}) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      rating: 5,
      comment: ""
    });

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await API.post(
        `/reviews/${jobId}`,
        formData
      );

     toast.success(
  "Review submitted successfully"
);

      setFormData({
        rating: 5,
        comment: ""
      });

      onReviewSubmitted();

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Review failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <Card
      style={{
        marginTop: "20px",
        borderRadius: "14px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)"
      }}
    >

      <Space
        orientation="vertical"
        size="small"
        style={{
          width: "100%",
          marginBottom: "20px"
        }}
      >

        <Title
          level={4}
          style={{
            margin: 0
          }}
        >
          Submit Review
        </Title>

        <Text type="secondary">
          Share your feedback
          about this worker
        </Text>

      </Space>

      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >

        {/* Rating */}
        <Form.Item
          label="Rating"
        >
<Rate
  allowClear={false}

  tooltips={[
    "Terrible",
    "Bad",
    "Average",
    "Good",
    "Excellent"
  ]}

  value={formData.rating}

            onChange={(value) =>
              setFormData({
                ...formData,
                rating: value
              })
            }
          />

        </Form.Item>

        {/* Comment */}
        <Form.Item
  label="Review Comment"
  rules={[
    {
      required: true,
      message:
        "Please enter a review"
    }
  ]}
>

         <TextArea
  rows={5}

  maxLength={300}

  showCount

  placeholder="
    Describe your experience
  "

  value={formData.comment}

  onChange={(e) =>
    setFormData({
      ...formData,
      comment: e.target.value
    })
  }
/>

        </Form.Item>

        {/* Submit */}
        <Form.Item>

          <Button
            type="primary"

            htmlType="submit"

            icon={<SendOutlined />}

            loading={loading}

            size="large"

            block
          >
            Submit Review
          </Button>

        </Form.Item>

      </Form>

    </Card>

  );
}

export default ReviewForm;