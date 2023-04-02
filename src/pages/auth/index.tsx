// create a auth page

import {
  Link,
  useLocation,
  useNavigate,
  useRouteData,
  useSearchParams,
} from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, onMount, Show } from "solid-js";
import { createStore } from "solid-js/store";
import Loading from "../../components/Sinpie/Loading";
import { AuthForm } from "../../types";
import { loginUser, registerUser } from "../../utils/auth";

const AuthPage = () => {
  const [query, setQuery] = useSearchParams();
  const [register, setRegister] = createSignal(false);
  const [error, setError] = createSignal("");
  const [submitStatus, setSubmitStatus] = createSignal(0);
  const navigator = useNavigate();
  createEffect(() => {
    if(query.register=="true") document.title = "Register";
    else document.title = "Login";
    setRegister(query.register == "true");
  });
  const [form, setForm] = createStore<AuthForm>({
    email: "",
    password: "",
    name: "",
  });
  const [confirmPass, setConfirmPass] = createSignal("");
  const onFormSubmit = async (e: Event) => {
    e.preventDefault();
    if (!form.email || !form.password || (register() && !form.name)) {
      setError("Please enter valid details");
      return;
    }
    if (register() && form.password != confirmPass()) {
      setError("Passwords do not match");
      return;
    }
    setSubmitStatus(1);
    try {
      if (register()) {
        await registerUser(form.name, form.email, form.password);
      } else {
        await loginUser(form.email, form.password);
      }
    } catch (err) {
      setError(err?.message ?? "Unknown error occured!");
      setSubmitStatus(0);
      return;
    }
    navigator('/', { replace: true });
    if(window.refreshUser) {window.refreshUser();}
  };
  return (
    <main 
    class="flex items-center my-10">
      <Card class="d-flex justify-center mx-auto w-5/6 md:w-3/6 xl:w-2/6  p-2 my-4">
        <Card.Header class="text-center m-2  text-2xl font-bold bg-transparent">
          Sinpie {register() ? "Register" : "Login"}
        <Card.Subtitle
        class="text-center m-2 text-sm"
        > Hey, enter your details to 
        {register() ? " register" : " login"}
        {" "} into sinpie account</Card.Subtitle>
        </Card.Header>
        <Card.Body>
          {error().length > 0 && <Alert>{error()}</Alert>}
          <Form onSubmit={onFormSubmit}>
            <Show when={register()}>
              <Form.Group
                as={Row}
                class="mb-3 flex-col"
                controlId="formPlaintextName"
                
              >
                <Form.Label >
                  Name
                </Form.Label>
                <Col >
                  <Form.Control
                    value={form.name}
                    onChange={(e) => setForm({ name: e.currentTarget.value })}
                    placeholder="Ash"
                  />
                </Col>
              </Form.Group>
            </Show>
            <Form.Group as={Row} class="mb-3 flex-col" controlId="formPlaintexMail">
              <Form.Label >
                Email
              </Form.Label>
              <Col >
                <Form.Control
                  value={form.email}
                  onChange={(e) => setForm({ email: e.currentTarget.value })}
                  type="email"
                  placeholder="ash@mail.com"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} class="mb-3 flex-col" controlId="formPlaintextPassword">
              <Form.Label >
                Password
              </Form.Label>
              <Col >
                <Form.Control
                  value={form.password}
                  onChange={(e) => setForm({ password: e.currentTarget.value })}
                  type="password"
                  placeholder="***"
                />
              </Col>
            </Form.Group>
            {register() && (
              <Form.Group
                as={Row}
                class="mb-3 flex-col"
                controlId="formPlaintextConfirmPassword"
              >
                <Form.Label >
                  Confirm Passowrd
                </Form.Label>
                <Col >
                  <Form.Control
                    value={confirmPass()}
                    onChange={(e) => setConfirmPass(e.currentTarget.value)}
                    type="password"
                    placeholder="***"
                    autocomplete="off"
                  />
                </Col>
              </Form.Group>
            )}
            <button disabled={submitStatus()==1} class="bg-t-red-500 rounded-md disabled:bg-t-red-400 disabled:text-gray-500 w-full p-2 my-3 text-white" type="submit">
              Submit
            </button>
          </Form>
        </Card.Body>
        <Card.Footer class="bg-transparent text-sm hover:cursor-pointer">
          <Show when={register()}>
            Already a member?{" "}
            <a
              onClick={() => setQuery({ register: false })}
              class="font-semibold"
            >
              Sign In
            </a>
          </Show>
          <Show when={!register()}>
            Not a member?{" "}
            <a
              onClick={() => setQuery({ register: true })}
              class="font-semibold"
            >
              Sign Up
            </a>
          </Show>
        </Card.Footer>
      </Card>
    </main>
  );
};
export default AuthPage;
