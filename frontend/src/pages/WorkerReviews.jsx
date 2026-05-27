import {
  useContext,
  useEffect,
  useState
} from "react";

import {
  Card,
  Typography,
  Rate,
  Avatar,
  Space,
  Empty,
  Spin,
  Row,
  Col,
  Statistic
} from "antd";

import {
  UserOutlined,
  StarFilled
} from "@ant-design/icons";

import DashboardLayout
from "../layouts/DashboardLayout";

import API from "../services/api";

import { AuthContext }
from "../context/AuthContext";

const {
  Title,
  Text,
  Paragraph
} = Typography;

function WorkerReviews() {

  const { user } =
    useContext(AuthContext);

  const [reviews, setReviews] =
    useState([]);

  const [averageRating,
    setAverageRating] =
    useState(0);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    fetchReviews();

  }, []);

  const fetchReviews = async () => {

    try {

      const res =
        await API.get(
          `/reviews/worker/${user._id}`
        );

      setReviews(
        res.data.data.reviews
      );

      setAverageRating(
        res.data.data.averageRating
      );

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  return (

    <DashboardLayout
      title="Worker Reviews"
    >

      {/* Stats Section */}
      <Row
        gutter={[16, 16]}
        style={{
          marginBottom: "30px"
        }}
      >

        <Col xs={24} md={12}>

          <Card
            bordered={false}
            style={{
              borderRadius: "16px"
            }}
          >

            <Statistic
              title="Average Rating"

              value={averageRating}

              precision={1}

              prefix={
                <StarFilled />
              }
            />

            <Rate
              disabled

              allowHalf

              value={averageRating}

              style={{
                marginTop: "10px"
              }}
            />

          </Card>

        </Col>

        <Col xs={24} md={12}>

          <Card
            bordered={false}
            style={{
              borderRadius: "16px"
            }}
          >

            <Statistic
              title="Total Reviews"

              value={reviews.length}
            />

          </Card>

        </Col>

      </Row>

      {/* Loading */}
      {loading ? (

        <div
          style={{
            textAlign: "center",
            marginTop: "50px"
          }}
        >

          <Spin size="large" />

        </div>

      ) : reviews.length === 0 ? (

        /* Empty State */
        <Empty
          description="No reviews yet"
        />

      ) : (

        /* Review List */
        <Space
          direction="vertical"
          size="large"
          style={{
            width: "100%"
          }}
        >

          {reviews.map((review) => (

            <Card
              key={review._id}

              hoverable

              style={{
                borderRadius: "16px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)"
              }}
            >

              <Space
                align="start"
                size="middle"
              >

                {/* Avatar */}
                <Avatar
                  size={50}

                  icon={
                    <UserOutlined />
                  }
                />

                {/* Review Content */}
                <div>

                  <Title
                    level={5}
                    style={{
                      marginBottom: "5px"
                    }}
                  >
                    {review.client.name}
                  </Title>

                  <Rate
                    disabled

                    value={review.rating}

                    style={{
                      fontSize: "18px",
                      marginBottom: "10px"
                    }}
                  />

                  <Paragraph
                    type="secondary"
                    style={{
                      marginBottom: 0
                    }}
                  >
                    {review.comment}
                  </Paragraph>

                </div>

              </Space>

            </Card>

          ))}

        </Space>

      )}

    </DashboardLayout>
  );
}

export default WorkerReviews;