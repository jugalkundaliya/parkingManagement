import React from "react";
import { Button, Form } from "react-bootstrap";
import Layout from "../../components/Layout";
import { useForm } from "react-hook-form";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
function Login(props) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await authService.login(data);
      navigate("/parking", { replace: true });
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.response.data,
        icon: "error",
        confirmButtonColor: "var(--bs-primary)",
      });
    }
  };
  return (
    <Layout>
      <div className="d-flex align-items-center justify-content-center">
        <Form
          className="col-xl-3 col-lg-4 col-md-6 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Form.Group className="mb-3 mt-4">
            <Form.Label className="pb-0">User Name: </Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter User Name"
              {...register("userName", { required: true })}
            />
          </Form.Group>
          {errors?.userName?.type === "required" && (
            <div className="alert alert-danger">This field is required</div>
          )}
          <Form.Group className="mb-3 mt-4">
            <Form.Label className="pb-0">Password: </Form.Label>
            <Form.Control
              className=" mb-3"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
          </Form.Group>
          {errors?.password?.type === "required" && (
            <div className="alert alert-danger">This field is required</div>
          )}
          <div className="d-flex mt-3">
            <Button variant="primary" type="submit" className="ms-auto">
              LOGIN
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default Login;
