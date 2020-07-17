import React, { useState, useEffect } from "react";
import { withRouter, NavLink } from "react-router-dom";
import { Layout, Menu } from "antd";
import "components/views/LandingPage/LandingPage.css";

const { Header } = Layout;

function HeaderCom({ onLogoutHandler }) {
  const [isLogin, setisLogin] = useState("");

  /* const checkIsLogin = () => {
    if (userData.isAuth) {
      setisLogin("로그아웃");
    } else {
      setisLogin("로그인");
    }
  }; 

  useEffect(() => {
    checkIsLogin();
  }, []);
  */

  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <NavLink to="/">메인</NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2" onClick={() => onLogoutHandler("/sign", isLogin)}>
          {isLogin}
        </Menu.Item> */}
        <Menu.Item key="2">
          <NavLink to="/login">로그인</NavLink>
        </Menu.Item>
        <Menu.Item key="3" onClick={onLogoutHandler}>
          로그아웃
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/register">회원가입</NavLink>
        </Menu.Item>
      </Menu>
    </Header>
  );
}

export default HeaderCom;
