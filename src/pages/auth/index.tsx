// create a auth page

import { Link, useLocation, useRouteData, useSearchParams } from "@solidjs/router";
import { Col, Form, Row, Card, Button } from "solid-bootstrap";
import { createEffect, createSignal, Show } from "solid-js";

const AuthPage = () => {
  const [query, setQuery] = useSearchParams();
  const [register,setRegister] = createSignal(false);
  createEffect(()=>{
    console.log("setting register");
    setRegister(query.register=="true");
  });
  
  return (
    <main>
      <Card class="d-flex justify-center mx-auto w-3/6  p-2 my-4">
        <Card.Header class="text-center m-2 font-bold bg-transparent">
          {register() ? "Register" : "Sign In"}
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group as={Row} class="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="ash@mail.com" />
              </Col>
            </Form.Group>

            <Form.Group as={Row} class="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Password
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="***" />
              </Col>
            </Form.Group>
            {register() && <Form.Group as={Row} class="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Confirm Passowrd
              </Form.Label>
              <Col sm="10">
                <Form.Control type="password" placeholder="***" autocomplete="off" />
              </Col>
            </Form.Group>}
            <Button variant="success" class="bg-slate-700" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer class="bg-transparent text-sm">
          <Show when={register()}>
            Already have an account?{" "}
            <a
              onClick={()=> setQuery({register:false})}
              class="font-semibold"
            >
              Sign In
            </a>
          </Show>
          <Show when={!register()}>
            Don't have an account?{" "}
            <a
              onClick={()=> setQuery({register:true})}
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
