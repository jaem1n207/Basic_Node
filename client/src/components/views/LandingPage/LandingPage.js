import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Layout, Breadcrumb, notification, Descriptions } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import "./LandingPage.css";
import Footer from "components/views/Footer/FooterCom";
import Header from "components/views/Header/HeaderCom";

const { Content } = Layout;

function LandingPage(props) {
  /* const onLogoutHandler = (propUrl, isLogin) => {
    if (propUrl === "/sign" && isLogin === "로그아웃") {
      axios.get("/api/users/logout").then((res) => {
        console.log(res.data);
        if (res.data.success) {
          props.history.push("/login");
        } else {
          return (
            <Alert
              message="Error"
              description="로그아웃에 실패하였습니다."
              type="error"
              showIcon
            />
          );
        }
      });
    }
  }; */

  function openErrorNotification() {
    notification.error({
      message: "로그아웃에 실패하였습니다.",
      icon: <FrownOutlined style={{ color: "red" }} />,
      duration: 2,
    });
  }

  const onLogoutHandler = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        props.history.push("/login");
      } else {
        openErrorNotification();
      }
    });
  };

  return (
    <Layout className="layout">
      <Header onLogoutHandler={onLogoutHandler} />
      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-content-wrap">
          <div className="site-layout-content">Happy ^^</div>
        </div>
      </Content>
      <Footer />
    </Layout>
  );
}

export default withRouter(LandingPage);
