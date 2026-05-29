import { useContext, useState } from "react";

import {
  Layout,
  Menu,
  Button,
  Typography,
  Space,
  Avatar,
  Drawer,
  Grid
} from "antd";

import {
  DashboardOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuOutlined
} from "@ant-design/icons";

import {
  useNavigate,
  Link,
  useLocation
} from "react-router-dom";

import { AuthContext }
from "../context/AuthContext";

const { Header, Content } = Layout;

const { Text, Title } = Typography;

const { useBreakpoint } = Grid;

function DashboardLayout({
  title,
  children
}) {

  const { user, logout } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  const screens = useBreakpoint();

  const [drawerOpen, setDrawerOpen] =
    useState(false);

  const handleLogout = () => {

    logout();

    navigate("/");

  };

  // WORKER MENU
  const workerMenuItems = [
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
  ];

  return (

    <Layout
      style={{
        minHeight: "100vh",
        background: "#f5f7fb"
      }}
    >

      {/* HEADER */}
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "#001529",
          height: "72px",
          padding: 0,
          display: "flex",
          justifyContent: "center",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.12)"
        }}
      >

        {/* MAIN HEADER CONTAINER */}
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            height: "100%",
            padding:
              screens.xs
                ? "0 16px"
                : "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between"
          }}
        >

          {/* LEFT SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: screens.xs
                ? "12px"
                : "24px",
              minWidth: 0
            }}
          >

            {/* MOBILE MENU */}
            {!screens.md &&
              user?.role === "worker" && (

                <Button
                  type="text"

                  icon={
                    <MenuOutlined
                      style={{
                        color: "#fff",
                        fontSize: "20px"
                      }}
                    />
                  }

                  onClick={() =>
                    setDrawerOpen(true)
                  }
                />

              )}

            {/* TITLE */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center"
              }}
            >

              <Title
                level={4}
                ellipsis
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize:
                    screens.xs
                      ? "18px"
                      : "20px",
                  lineHeight: 1.2
                }}
              >
                {title}
              </Title>

              {!screens.xs && (

                <Text
                  style={{
                    color:
                      "rgba(255,255,255,0.65)",
                    fontSize: "12px"
                  }}
                >
                  Dashboard Panel
                </Text>

              )}

            </div>

            {/* DESKTOP MENU */}
            {screens.md &&
              user?.role === "worker" && (

                <Menu
                  mode="horizontal"

                  selectedKeys={[
                    location.pathname
                  ]}

                  theme="dark"

                  items={workerMenuItems}

                  style={{
                    background:
                      "transparent",
                    borderBottom:
                      "none"
                  }}
                />

              )}

          </div>

          {/* RIGHT SIDE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: screens.xs
                ? "10px"
                : "16px"
            }}
          >

            {/* USER INFO */}
            <Space align="center">

              <Avatar
                icon={<UserOutlined />}
              />

              {!screens.sm ? null : (

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",
                    lineHeight: 1.1
                  }}
                >

                  <Text
                    style={{
                      color: "#fff",
                      fontWeight: 500
                    }}
                  >
                    {user?.name}
                  </Text>

                  <Text
                    style={{
                      color:
                        "rgba(255,255,255,0.6)",
                      fontSize: "12px",
                      textTransform:
                        "capitalize"
                    }}
                  >
                    {user?.role}
                  </Text>

                </div>

              )}

            </Space>

            {/* LOGOUT */}
            <Button
              danger

              icon={<LogoutOutlined />}

              onClick={handleLogout}

              style={{
                borderRadius: "10px",
                fontWeight: 500
              }}
            >
              {screens.sm && "Logout"}
            </Button>

          </div>

        </div>

      </Header>

      {/* MOBILE DRAWER */}
      <Drawer
        title="Navigation"

        placement="left"

        open={drawerOpen}

        onClose={() =>
          setDrawerOpen(false)
        }

        styles={{
          body: {
            padding: 0
          }
        }}
      >

        <Menu
          mode="inline"

          selectedKeys={[
            location.pathname
          ]}

          items={workerMenuItems}

          style={{
            borderRight: "none"
          }}

          onClick={() =>
            setDrawerOpen(false)
          }
        />

      </Drawer>

      {/* CONTENT */}
      <Content
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >

        {/* MAIN CONTENT CONTAINER */}
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            padding:
              screens.xs
                ? "18px"
                : "28px"
          }}
        >

          {children}

        </div>

      </Content>

    </Layout>

  );
}

export default DashboardLayout;