import { useContext } from "react";

import {
  Layout,
  Menu,
  Button,
  Typography,
  Space
} from "antd";

import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import {
  useNavigate,
  Link,
  useLocation
} from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

const { Header, Content } = Layout;
const { Text } = Typography;

function DashboardLayout({
  title,
  children
}) {

  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  return (

    <Layout
      style={{
        minHeight: "100vh"
      }}
    >

      {/* Navbar */}
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >

        {/* Left */}
        <Space size="large">

          <Typography.Title
            level={4}
            style={{
              color: "white",
              margin: 0
            }}
          >
            {title}
          </Typography.Title>

          {user?.role === "worker" && (

            <Menu
              mode="horizontal"

              selectedKeys={[location.pathname]}

              theme="dark"

              style={{
                background: "transparent",
                borderBottom: "none",
                minWidth: "300px"
              }}

              items={[
                {
                  key: "/worker-dashboard",

                  icon: <DashboardOutlined />,

                  label: (
                    <Link to="/worker-dashboard">
                      Dashboard
                    </Link>
                  )
                },

                {
                  key: "/worker-profile",

                  icon: <UserOutlined />,

                  label: (
                    <Link to="/worker-profile">
                      Profile
                    </Link>
                  )
                }
              ]}
            />

          )}

        </Space>

        {/* Right */}
        <Space>

          <Text
            style={{
              color: "white"
            }}
          >
            Welcome, {user?.name}
          </Text>

          <Button
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Space>

      </Header>

      {/* Main Content */}
      <Content
        style={{
          padding: "30px"
        }}
      >

        {children}

      </Content>

    </Layout>

  );
}

export default DashboardLayout;