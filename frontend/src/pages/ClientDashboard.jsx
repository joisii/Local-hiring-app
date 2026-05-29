import { useEffect, useState } from "react";

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Spin,
  Empty,
  Divider,
  Space,
  Flex
} from "antd";

import {
  PlusOutlined,
  ReloadOutlined,
  FileTextOutlined,
  AppstoreOutlined
} from "@ant-design/icons";

import API from "../services/api";

import DashboardLayout from "../layouts/DashboardLayout";

import ReviewForm from "../components/ReviewForm";
import JobCard from "../components/JobCard";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

function ClientDashboard() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [posting, setPosting] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      budget: ""
    });

  // Fetch Jobs
  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res =
        await API.get(
          "/jobs/client/my-jobs"
        );

      // attach reviews to every job
      const jobsWithReviews =
        await Promise.all(

          res.data.data.map(
            async (job) => {

              const reviewRes =
                await API.get(
                  `/reviews/job/${job._id}`
                );

              return {
                ...job,
                review: reviewRes.data.data
              };
            }
          )
        );

      setJobs(jobsWithReviews);

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Failed to fetch jobs"
      );

    } finally {

      setLoading(false);

    }
  };

  // Handle Input
  const handleChange = (
    name,
    value
  ) => {

    setFormData({
      ...formData,
      [name]: value
    });

  };

  // Submit Job
  const handleSubmit = async () => {

    try {

      setPosting(true);

      await API.post(
        "/jobs",
        formData
      );

      toast.success(
        "Job posted successfully"
      );

      setFormData({
        title: "",
        description: "",
        budget: ""
      });

      fetchJobs();

    } catch (error) {

      toast.error(
        error.response?.data?.message
        || "Posting failed"
      );

    } finally {

      setPosting(false);

    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (

    <DashboardLayout
      title="Client Dashboard"
    >

      {/* HERO SECTION */}
      <Card
        variant={false}
        style={{
          marginBottom: "30px",
          borderRadius: "24px",
          background:
            "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)",
          color: "#fff",
          overflow: "hidden"
        }}
      >

        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap={20}
        >

          <div>

            <Space
              orientation="vertical"
              size={6}
            >

              <Title
                level={2}
                style={{
                  color: "#fff",
                  margin: 0
                }}
              >
                Welcome Back 👋
              </Title>

              <Text
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "15px"
                }}
              >
                Manage jobs, monitor workers,
                and grow your hiring workflow.
              </Text>

            </Space>

          </div>

          <Card
            style={{
              borderRadius: "18px",
              minWidth: "180px",
              textAlign: "center",
              border: "none"
            }}
          >

            <Space orientation="vertical">

              <AppstoreOutlined
                style={{
                  fontSize: "28px",
                  color: "#1677ff"
                }}
              />

              <Title
                level={3}
                style={{
                  margin: 0
                }}
              >
                {jobs.length}
              </Title>

              <Text type="secondary">
                Total Jobs
              </Text>

            </Space>

          </Card>

        </Flex>

      </Card>

      {/* POST JOB FORM */}
      <Card
        variant={false}
        style={{
          marginBottom: "35px",
          borderRadius: "22px",
          boxShadow:
            "0 6px 20px rgba(0,0,0,0.06)"
        }}
      >

        <Space
          orientation="vertical"
          size={4}
          style={{
            marginBottom: "25px"
          }}
        >

          <Title
            level={3}
            style={{
              margin: 0
            }}
          >
            Post a New Job
          </Title>

          <Text type="secondary">
            Fill in the details carefully.
            Workers can only save you if
            your requirements make sense.
          </Text>

        </Space>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >

          <Row gutter={[20, 0]}>

            {/* Job Title */}
            <Col xs={24}>

              <Form.Item
                label="Job Title"
                required
              >

                <Input
                  size="large"

                  placeholder="Enter job title"

                  value={formData.title}

                  onChange={(e) =>
                    handleChange(
                      "title",
                      e.target.value
                    )
                  }
                />

              </Form.Item>

            </Col>

            {/* Description */}
            <Col xs={24}>

              <Form.Item
                label="Description"
                required
              >

                <TextArea
                  rows={5}

                  placeholder="Describe the job clearly"

                  value={
                    formData.description
                  }

                  onChange={(e) =>
                    handleChange(
                      "description",
                      e.target.value
                    )
                  }

                  style={{
                    resize: "none"
                  }}
                />

              </Form.Item>

            </Col>

            {/* Budget */}
            <Col xs={24} md={12}>

              <Form.Item
                label="Budget (₹)"
                required
              >

                <InputNumber
                  size="large"

                  style={{
                    width: "100%"
                  }}

                  placeholder="Enter budget"

                  min={1}

                  value={formData.budget}

                  onChange={(value) =>
                    handleChange(
                      "budget",
                      value
                    )
                  }
                />

              </Form.Item>

            </Col>

            {/* Submit */}
            <Col
              xs={24}
              md={12}
              style={{
                display: "flex",
                alignItems: "end"
              }}
            >

              <Form.Item
                style={{
                  width: "100%"
                }}
              >

                <Button
                  type="primary"

                  htmlType="submit"

                  icon={<PlusOutlined />}

                  loading={posting}

                  size="large"

                  block

                  style={{
                    height: "48px",
                    borderRadius: "12px",
                    fontWeight: "600"
                  }}
                >
                  Post Job
                </Button>

              </Form.Item>

            </Col>

          </Row>

        </Form>

      </Card>

      {/* JOB HEADER */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        style={{
          marginBottom: "24px"
        }}
      >

        <Col xs={24} md={12}>

          <Space align="center">

            <div
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "12px",
                background: "#1677ff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >

              <FileTextOutlined
                style={{
                  fontSize: "22px",
                  color: "#fff"
                }}
              />

            </div>

            <div>

              <Title
                level={3}
                style={{
                  margin: 0
                }}
              >
                My Jobs
              </Title>

              <Text type="secondary">
                Track and manage all jobs
              </Text>

            </div>

          </Space>

        </Col>

        <Col xs={24} md={12}>

          <Flex
            justify="flex-end"
          >

            <Button
              icon={<ReloadOutlined />}
              onClick={fetchJobs}
              size="large"
              style={{
                borderRadius: "12px"
              }}
            >
              Refresh
            </Button>

          </Flex>

        </Col>

      </Row>

      {/* LOADING */}
      {loading ? (

        <Card
          variant={false}
          style={{
            borderRadius: "20px",
            padding: "50px",
            textAlign: "center"
          }}
        >

          <Spin size="large" />

          <Paragraph
            type="secondary"
            style={{
              marginTop: "18px"
            }}
          >
            Loading jobs...
          </Paragraph>

        </Card>

      ) : jobs.length === 0 ? (

        <Card
          bordered={false}
          style={{
            borderRadius: "20px",
            padding: "40px"
          }}
        >

          <Empty
            description="No jobs found yet"
          />

        </Card>

      ) : (

        <Row gutter={[24, 24]}>

          {jobs.map((job) => (

            <Col
              xs={24}
              sm={24}
              md={12}
              xl={8}
              key={job._id}
            >

              <div
                style={{
                  transition: "0.3s"
                }}
              >

                <JobCard
                  job={job}
                  showReviewButton={true}
                />

              </div>

            </Col>

          ))}

        </Row>

      )}

    </DashboardLayout>

  );
}

export default ClientDashboard;