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
    xs: { span: 8 },
    sm: { span: 8 },
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
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailHandler} />

        <label>Name</label>
        <input type="text" value={name} onChange={onNameHandler} />

        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordHandler} />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button>회원 가입</button>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
