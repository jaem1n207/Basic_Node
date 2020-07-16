import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
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
        alert("회원가입에 실패하였습니다.");
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
        style={{ minWidth: "375px" }}
        {...formItemLayout}
        onSubmit={onSubmitHandler}
      >
        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input
            id="name"
            placeholder="Input your Name"
            type="text"
            value={name}
            onChange={onNameHandler}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input
            id="email"
            placeholder="Input your Email"
            type="email"
            value={email}
            onChange={onEmailHandler}
          />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            id="password"
            placeholder="Input your Password"
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </Form.Item>

        <Form.Item
          label="ConfirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input
            id="confirmPassword"
            placeholder="Input your Password again"
            type="password"
            value={confirmPassword}
            onChange={onConfirmPasswordHandler}
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
