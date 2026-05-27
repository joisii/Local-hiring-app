import { useEffect, useState } from "react";

import {
  Card,
  Form,
  Input,
  InputNumber,
  Switch,
  Button,
  Typography,
  Space
} from "antd";

import {
  ToolOutlined,
  DollarOutlined,
  SaveOutlined
} from "@ant-design/icons";

import API from "../services/api";

import DashboardLayout
from "../layouts/DashboardLayout";

import toast from "react-hot-toast";

const { Title, Text } = Typography;

function WorkerProfile() {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
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

      const res =
        await API.get("/users/me");

      setFormData({
        skills:
          res.data.data.skills.join(", "),

        pricing:
          res.data.data.pricing,

        availability:
          res.data.data.availability
      });

    } catch {

      toast.error(
        "Failed to load profile"
      );

    }
  };

  const handleSubmit = async () => {

    try {

      setLoading(true);

      await API.put(
        "/users/worker-profile",
        {
          skills: formData.skills
            .split(",")
            .map((s) => s.trim()),

          pricing:
            Number(formData.pricing),

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

      <Card
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          borderRadius: "16px",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.08)"
        }}
      >

        <Space
          orientation="vertical"
          size="small"
          style={{
            width: "100%",
            marginBottom: "25px"
          }}
        >

          <Title
            level={3}
            style={{
              marginBottom: 0
            }}
          >
            Update Profile
          </Title>

          <Text type="secondary">
            Manage your skills,
            pricing and availability
          </Text>

        </Space>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >

          {/* Skills */}
          <Form.Item
            label="Skills"
          >

            <Input
              prefix={<ToolOutlined />}

              placeholder="Electrician, Plumbing"

              value={formData.skills}

              onChange={(e) =>
                setFormData({
                  ...formData,
                  skills: e.target.value
                })
              }
            />

          </Form.Item>

          {/* Pricing */}
          <Form.Item
            label="Pricing (₹)"
          >

            <InputNumber
              prefix={<DollarOutlined />}

              placeholder="Enter pricing"

              style={{
                width: "100%"
              }}

              value={formData.pricing}

              onChange={(value) =>
                setFormData({
                  ...formData,
                  pricing: value
                })
              }
            />

          </Form.Item>

          {/* Availability */}
          <Form.Item
            label="Availability"
          >

            <Switch

              checked={
                formData.availability
              }

              onChange={(checked) =>
                setFormData({
                  ...formData,
                  availability: checked
                })
              }
            />

          </Form.Item>

          {/* Submit */}
          <Form.Item
            style={{
              marginTop: "20px"
            }}
          >

            <Button
              type="primary"

              htmlType="submit"

              icon={<SaveOutlined />}

              loading={loading}

              size="large"

              block
            >
              Save Profile
            </Button>

          </Form.Item>

        </Form>

      </Card>

    </DashboardLayout>

  );
}

export default WorkerProfile;