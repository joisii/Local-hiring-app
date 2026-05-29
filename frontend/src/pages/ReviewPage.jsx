import { useNavigate, useParams }
from "react-router-dom";

import {
  Row,
  Col,
  Typography
} from "antd";

import DashboardLayout
from "../layouts/DashboardLayout";

import ReviewForm
from "../components/ReviewForm";

const { Title, Paragraph } =
  Typography;

function ReviewPage() {

  const { jobId } = useParams();

  const navigate = useNavigate();

  return (

    <DashboardLayout
      title="Submit Review"
    >

      <Row
        justify="center"
        style={{
          marginTop: "40px"
        }}
      >

        <Col
          xs={24}
          sm={22}
          md={18}
          lg={12}
        >

          <div
            style={{
              textAlign: "center",
              marginBottom: "25px"
            }}
          >

            <Title level={2}>
              Review Worker
            </Title>

            <Paragraph
              type="secondary"
            >
              Share your experience
              and help maintain
              service quality.
            </Paragraph>

          </div>

          <ReviewForm
            jobId={jobId}

            onReviewSubmitted={() =>
              navigate(
                "/client-dashboard"
              )
            }
          />

        </Col>

      </Row>

    </DashboardLayout>
  );
}

export default ReviewPage;