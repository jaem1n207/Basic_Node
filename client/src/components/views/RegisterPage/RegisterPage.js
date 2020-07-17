import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button, Tooltip, Alert } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemlayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const onEmailHandler = (e) => {
    setemail(e.currentTarget.value);
  };
  const onNameHandler = (e) => {
    setname(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setpassword(e.currentTarget.value);
  };
  const onConfirmPasswordHandler = (e) => {
    setconfirmPassword(e.currentTarget.value);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      console.log("success");
      onSubmitHandler();
    } else {
      console.log("fail");
    }
  };

  const onSubmitHandler = (e) => {
    // e.preventDefault();

    if (password !== confirmPassword) {
      return (
        <Alert
          message="Pssword Error!"
          description="비밀번호가 일치하지 않습니다."
          type="error"
          showIcon
        />
      );
    }

    let body = {
      email: email,
      name: name,
      password: password,
    };

    dispatch(registerUser(body)).then((res) => {
      console.log(res.data);
      if (res.payload.success) {
        setemail("");
        setname("");
        setpassword("");
        props.history.push("/login");
      } else {
        return (
          <Alert
            message="Pssword Error!"
            description="비밀번호는 5자 이상으로 해야 합니다!"
            type="error"
            showIcon
          />
        );
      }
    });
  };

  const onReset = (e) => {
    e.preventDefault();

    setemail("");
    setname("");
    setpassword("");
    setconfirmPassword("");
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
        {...formItemLayout}
        name="register"
        style={{ minWidth: "480px" }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            type="email"
            placeholder="abc123@naver.com"
            value={email}
            onChange={onEmailHandler}
            onKeyDown={pressEnter}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={
            <span>
              Password&nbsp;
              <Tooltip title="Please enter at least 5 characters of password.">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={onPasswordHandler}
            onKeyDown={pressEnter}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="ConfirmPassword"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
            onKeyDown={pressEnter}
          />
        </Form.Item>

        <Form.Item
          name="Name"
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What's your name?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Tom"
            value={name}
            onChange={onNameHandler}
            onKeyDown={pressEnter}
          />
        </Form.Item>

        <Form.Item {...tailFormItemlayout}>
          <Button type="primary" onClick={onSubmitHandler}>
            Sign Up
          </Button>
          <Button onClick={onReset}>Reset</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
