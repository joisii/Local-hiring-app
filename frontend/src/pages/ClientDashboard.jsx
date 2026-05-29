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
  Space
} from "antd";

import {
  PlusOutlined,
  ReloadOutlined,
  FileTextOutlined
} from "@ant-design/icons";

import API from "../services/api";

import DashboardLayout
from "../layouts/DashboardLayout";

import ReviewForm from "../components/ReviewForm";

import JobCard from "../components/JobCard";

import toast from "react-hot-toast";

import { Link } from "react-router-dom";

const { Title, Text } = Typography;
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

      {/* Post Job Card */}
      <Card
        style={{
          marginBottom: "30px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)"
        }}
      >

        <Space
          orientation="vertical"
          size="small"
          style={{
            marginBottom: "20px"
          }}
        >

          <Title
            level={3}
            style={{
              marginBottom: 0
            }}
          >
            Post a New Job
          </Title>

          <Text type="secondary">
            Create job listings for workers
          </Text>

        </Space>

        <Form
          layout="vertical"
          onFinish={handleSubmit}
        >

          {/* Title */}
          <Form.Item
            label="Job Title"
            required
          >

            <Input
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

          {/* Description */}
          <Form.Item
            label="Description"
            required
          >

            <TextArea
              rows={4}

              placeholder="Describe the job"

              value={
                formData.description
              }

              onChange={(e) =>
                handleChange(
                  "description",
                  e.target.value
                )
              }
            />

          </Form.Item>

          {/* Budget */}
          <Form.Item
            label="Budget (₹)"
            required
          >

            <InputNumber
              style={{
                width: "100%"
              }}

              placeholder="Enter budget"

              value={formData.budget}

              onChange={(value) =>
                handleChange(
                  "budget",
                  value
                )
              }
            />

          </Form.Item>

          {/* Submit */}
          <Form.Item>

            <Button
              type="primary"

              htmlType="submit"

              icon={<PlusOutlined />}

              loading={posting}

              size="large"
            >
              Post Job
            </Button>

          </Form.Item>

        </Form>

      </Card>

      {/* Jobs Section */}
      <Divider />

      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: "20px"
        }}
      >

        <Col>

          <Space
            align="center"
          >

            <FileTextOutlined
              style={{
                fontSize: "22px"
              }}
            />

            <Title
              level={3}
              style={{
                margin: 0
              }}
            >
              My Jobs
            </Title>

          </Space>

        </Col>

        <Col>

          <Button
            icon={<ReloadOutlined />}

            onClick={fetchJobs}
          >
            Refresh
          </Button>

        </Col>

      </Row>

      {/* Loading */}
      {loading ? (

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "60px"
          }}
        >

          <Spin size="large" />

        </div>

      ) : jobs.length === 0 ? (

        <Card
          style={{
            borderRadius: "16px"
          }}
        >

          <Empty
            description="No jobs found"
          />

        </Card>

      ) : (

        <Row gutter={[20, 20]}>

          {jobs.map((job) => (

            <Col
              xs={24}
              md={12}
              lg={8}

              key={job._id}
            >

              <div key={job._id}>

<JobCard
  job={job}
  showReviewButton={true}
/>

  <hr />
</div>

            </Col>

          ))}

        </Row>

      )}

    </DashboardLayout>

  );
}

export default ClientDashboard;