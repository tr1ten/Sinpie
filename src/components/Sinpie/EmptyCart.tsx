// Empty card placeholder

import { Col, Form, Row, Card, Button, Alert } from "solid-bootstrap";
import EmptyCartImg from "../../../assets/cartplaceholder.jpg"

export default function EmptyCart() {
    return (
        <Card class="p-4 m-2">
        <Card.Body>
            <Row>
            <Col class="flex flex-col items-center">
                <h2 class="text-lg">Your cart is empty :! </h2>
                <img class="w-3/5 max-w-xl" src={EmptyCartImg} alt="empty cart" />
            </Col>
            </Row>
        </Card.Body>
        </Card>
    );
}