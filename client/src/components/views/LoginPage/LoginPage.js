import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./LoginPage.css";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const onEmailHandler = (e) => {
    setemail(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setpassword(e.currentTarget.value);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
  };

  const onSubmitHandler = (e) => {
    // e.preventDefault();

    let body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        setemail("");
        setpassword("");
        props.history.push("/");
      } else {
        alert("Error");
      }
    });
  };

  const moveRegisterHandler = (e) => {
    e.preventDefault();

    props.history.push("/register");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
            value={email}
            onChange={onEmailHandler}
            onKeyPress={pressEnter}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            value={password}
            onChange={onPasswordHandler}
            placeholder="Password"
            onKeyPress={pressEnter}
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item className="login-form-wrap">
          <Button
            type="primary"
            onClick={onSubmitHandler}
            className="login-form-Submit-button"
          >
            Log in
          </Button>
          <Button
            onClick={moveRegisterHandler}
            className="login-form-Register-button"
          >
            {" "}
            Register Now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
