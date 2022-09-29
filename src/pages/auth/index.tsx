// create a auth page

import {
  Link,
  useLocation,
  useNavigate,
  useRouteData,
  useSearchParams,
} from "@solidjs/router";
import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import { createEffect, createSignal, Show } from "solid-js";
import { createStore } from "solid-js/store";
import { AuthForm } from "../../types";
import { loginUser, registerUser } from "../../utils/auth";

const AuthPage = () => {
  const [query, setQuery] = useSearchParams();
  const [register, setRegister] = createSignal(false);
  const [error, setError] = createSignal("");
  const [submitStatus, setSubmitStatus] = createSignal(0);
  const navigator = useNavigate();
  createEffect(() => {
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
      setError("not valid form");
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
    <main>
      <Card class="d-flex justify-center mx-auto w-3/6  p-2 my-4">
        <Card.Header class="text-center m-2 font-bold bg-transparent">
          {register() ? "Register" : "Sign In"}
        </Card.Header>
        <Card.Body>
          {error().length > 0 && <Alert>{error()}</Alert>}
          <Form onSubmit={onFormSubmit}>
            <Show when={register()}>
              <Form.Group
                as={Row}
                class="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Name
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    value={form.name}
                    onChange={(e) => setForm({ name: e.currentTarget.value })}
                    placeholder="Ash"
                  />
                </Col>
              </Form.Group>
            </Show>
            <Form.Group as={Row} class="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  value={form.email}
                  onChange={(e) => setForm({ email: e.currentTarget.value })}
                  type="email"
                  placeholder="ash@mail.com"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} class="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
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
                class="mb-3"
                controlId="formPlaintextPassword"
              >
                <Form.Label column sm="2">
                  Confirm Passowrd
                </Form.Label>
                <Col sm="10">
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
            <Button disabled={submitStatus()==1} variant="success" class="bg-slate-700" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer class="bg-transparent text-sm">
          <Show when={register()}>
            Already have an account?{" "}
            <a
              onClick={() => setQuery({ register: false })}
              class="font-semibold"
            >
              Sign In
            </a>
          </Show>
          <Show when={!register()}>
            Don't have an account?{" "}
            <a
              onClick={() => setQuery({ register: true })}
              class="font-semibold"
            >
              Register
            </a>
          </Show>
        </Card.Footer>
      </Card>
    </main>
  );
};
export default AuthPage;
