import {
  useEffect,
  useState,
  useContext
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  Spin,
  Empty,
  Statistic,
  Divider,
  Grid
} from "antd";

import {
  UserOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
SolutionOutlined,
  ThunderboltOutlined
} from "@ant-design/icons";

import API from "../services/api";

import DashboardLayout
from "../layouts/DashboardLayout";

import JobCard
from "../components/JobCard";

import {
  AuthContext
} from "../context/AuthContext";

import toast from "react-hot-toast";

const {
  Title,
  Text,
  Paragraph
} = Typography;

const { useBreakpoint } = Grid;

function WorkerDashboard() {

  const navigate =
    useNavigate();

  const { user } =
    useContext(AuthContext);

  const screens =
    useBreakpoint();

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // fetch jobs
  const fetchJobs = async () => {

    try {

      setLoading(true);

      const res =
        await API.get("/jobs");

      const jobsWithReviews =
        await Promise.all(

          res.data.data.map(
            async (job) => {

              try {

                const reviewRes =
                  await API.get(
                    `/reviews/job/${job._id}`
                  );

                return {
                  ...job,
                  review:
                    reviewRes.data
                      .data
                };

              } catch {

                return {
                  ...job,
                  review: null
                };
              }
            }
          )
        );

      setJobs(jobsWithReviews);

    } catch (error) {

      toast.error(
        error.response?.data
          ?.message ||
        "Failed to fetch jobs"
      );

    } finally {

      setLoading(false);

    }
  };

  // accept job
  const handleAcceptJob =
    async (jobId) => {

      try {

        await API.put(
          `/jobs/${jobId}/accept`
        );

        toast.success(
          "Job accepted"
        );

        fetchJobs();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Accept failed"
        );
      }
    };

  // update status
  const handleStatusUpdate =
    async (
      jobId,
      status
    ) => {

      try {

        await API.put(
          `/jobs/${jobId}/status`,
          {
            status
          }
        );

        toast.success(
          `Job marked as ${status}`
        );

        fetchJobs();

      } catch (error) {

        toast.error(
          error.response?.data
            ?.message ||
          "Update failed"
        );
      }
    };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (

    <DashboardLayout
      title="Worker Dashboard"
    >

      {/* HERO SECTION */}
      <Card
        variant={false}
        style={{
          marginBottom: "30px",
          borderRadius: "28px",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)",
          boxShadow:
            "0 10px 30px rgba(22,119,255,0.25)"
        }}
      >

        <Row
          gutter={[30, 30]}
          align="middle"
        >

          {/* LEFT */}
          <Col
            xs={24}
            lg={16}
          >

            <Space
              orientation="vertical"
              size="middle"
            >

              <div>

                <Title
                  level={2}
                  style={{
                    color: "#fff",
                    marginBottom:
                      "10px"
                  }}
                >
                  Welcome Back,
                  {` ${user?.name}`}
                </Title>

                <Paragraph
                  style={{
                    color:
                      "rgba(255,255,255,0.85)",
                    fontSize:
                      "16px",
                    lineHeight:
                      1.8,
                    maxWidth:
                      "650px"
                  }}
                >
                  Manage jobs,
                  update work
                  progress, and
                  maintain your
                  professional
                  profile from one
                  centralized
                  dashboard.
                </Paragraph>

              </div>

              <Space
                wrap
                size="middle"
              >

                <Button
                  size="large"

                  icon={
                    <UserOutlined />
                  }

                  onClick={() =>
                    navigate(
                      "/worker-profile"
                    )
                  }

                  style={{
                    height: "46px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "600"
                  }}
                >
                  Manage Profile
                </Button>

                <Button
                  size="large"

                  icon={
                    <ReloadOutlined />
                  }

                  onClick={
                    fetchJobs
                  }

                  style={{
                    height: "46px",
                    borderRadius:
                      "12px",
                    fontWeight:
                      "600"
                  }}
                >
                  Refresh Jobs
                </Button>

              </Space>

            </Space>

          </Col>

          {/* RIGHT */}
          <Col
            xs={24}
            lg={8}
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

             <Statistic
  title="Available Jobs"
  value={jobs.length}
  prefix={<SolutionOutlined />}
/>

            </Card>

          </Col>

        </Row>

      </Card>

      {/* SECTION HEADER */}
      <Row
        justify="space-between"
        align="middle"
        gutter={[20, 20]}
        style={{
          marginBottom: "25px"
        }}
      >

        <Col>

          <Space
            align="center"
          >

            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius:
                  "14px",
                background:
                  "#1677ff",
                display: "flex",
                justifyContent:
                  "center",
                alignItems:
                  "center"
              }}
            >

              <ThunderboltOutlined
                style={{
                  fontSize:
                    "24px",
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
                Available Jobs
              </Title>

              <Text type="secondary">
                Browse and manage
                active jobs
              </Text>

            </div>

          </Space>

        </Col>

      </Row>

      <Divider />

      {/* LOADING */}
      {loading ? (

        <Card
variant={false}
          style={{
            borderRadius: "22px",
            padding: "50px",
            textAlign: "center"
          }}
        >

          <Spin size="large" />

          <Paragraph
            type="secondary"
            style={{
              marginTop: "20px"
            }}
          >
            Loading available
            jobs...
          </Paragraph>

        </Card>

      ) : jobs.length === 0 ? (

        /* EMPTY STATE */
        <Card
          variant={false}
          style={{
            borderRadius: "24px",
            padding: "40px"
          }}
        >

          <Empty
            description="No jobs available right now"
          />

        </Card>

      ) : (

        /* JOB LIST */
        <Row gutter={[24, 24]}>

          {jobs.map((job) => (

            <Col
              xs={24}
              md={12}
              xl={8}
              key={job._id}
            >

              <div
                style={{
                  transition:
                    "0.3s"
                }}
              >

                <JobCard
                  job={job}

                  onAccept={
                    handleAcceptJob
                  }

                  onStatusUpdate={
                    handleStatusUpdate
                  }

                  currentUser={
                    user
                  }

                  showReviewButton={
                    false
                  }
                />

              </div>

            </Col>

          ))}

        </Row>

      )}

    </DashboardLayout>

  );
}

export default WorkerDashboard;