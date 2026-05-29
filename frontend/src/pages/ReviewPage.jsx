import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  Row,
  Col,
  Typography,
  Card,
  Space,
  Divider,
  Breadcrumb,
  Grid
} from "antd";

import {
  StarOutlined,
  HomeOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";

import DashboardLayout
from "../layouts/DashboardLayout";

import ReviewForm
from "../components/ReviewForm";

const {
  Title,
  Paragraph,
  Text
} = Typography;

const { useBreakpoint } = Grid;

function ReviewPage() {

  const { jobId } =
    useParams();

  const navigate =
    useNavigate();

  const screens =
    useBreakpoint();

  return (

    <DashboardLayout
      title="Submit Review"
    >

      {/* PAGE HEADER */}
      <div
        style={{
          marginBottom: "30px"
        }}
      >

        <Breadcrumb
          items={[
            {
              href:
                "/client-dashboard",
              title: (
                <>
                  <HomeOutlined />
                  <span>
                    Dashboard
                  </span>
                </>
              )
            },
            {
              title:
                "Submit Review"
            }
          ]}
        />

      </div>

      {/* MAIN CONTENT */}
      <Row
        justify="center"
        align="middle"
      >

        <Col
          xs={24}
          sm={24}
          md={22}
          lg={16}
          xl={12}
        >

          {/* HERO CARD */}
         <Card
  style={{
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow:
      "0 10px 35px rgba(0,0,0,0.08)"
  }}
  styles={{
    body: {
      padding: 0
    }
  }}
>

            {/* TOP SECTION */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #1677ff 0%, #4096ff 100%)",
                padding:
                  screens.xs
                    ? "30px 20px"
                    : "45px",
                color: "#fff",
                textAlign:
                  "center"
              }}
            >

              <Space
                orientation="vertical"
                size="middle"
              >

                {/* ICON */}
                <div
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius:
                      "50%",
                    background:
                      "rgba(255,255,255,0.15)",
                    display: "flex",
                    justifyContent:
                      "center",
                    alignItems:
                      "center",
                    margin:
                      "0 auto"
                  }}
                >

                  <StarOutlined
                    style={{
                      fontSize:
                        "36px",
                      color: "#fff"
                    }}
                  />

                </div>

                {/* TITLE */}
                <div>

                  <Title
                    level={2}
                    style={{
                      color: "#fff",
                      marginBottom:
                        "10px"
                    }}
                  >
                    Review Worker
                  </Title>

                  <Paragraph
                    style={{
                      color:
                        "rgba(255,255,255,0.85)",
                      fontSize:
                        "16px",
                      maxWidth:
                        "520px",
                      margin:
                        "0 auto"
                    }}
                  >
                    Share your
                    experience and
                    help maintain
                    service quality
                    across the
                    platform.
                  </Paragraph>

                </div>

              </Space>

            </div>

            {/* REVIEW CONTENT */}
            <div
              style={{
                padding:
                  screens.xs
                    ? "24px"
                    : "40px"
              }}
            >

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
                      Honest Reviews
                      Matter
                    </Text>

                    <br />

                    <Text
                      type="secondary"
                      style={{
                        lineHeight:
                          1.7
                      }}
                    >
                      Your feedback
                      improves trust,
                      worker quality,
                      and overall
                      platform
                      reliability.
                      So please don’t
                      rate people like
                      angry Twitter
                      users reviewing
                      movies.
                    </Text>

                  </div>

                </Space>

              </Card>

              <Divider />

              {/* REVIEW FORM */}
              <ReviewForm
                jobId={jobId}

                onReviewSubmitted={() =>
                  navigate(
                    "/client-dashboard"
                  )
                }
              />

            </div>

          </Card>

        </Col>

      </Row>

    </DashboardLayout>

  );
}

export default ReviewPage;