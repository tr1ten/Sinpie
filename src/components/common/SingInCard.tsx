import { Link } from "@solidjs/router";
import { Card } from "solid-bootstrap";

export function SingInCard({title}:{title:string}) {
    return (<section class="h-full w-full flex items-center justify-center p-5">
        <Card class="text-center p-10">
        <Card.Body>
            <Card.Title class="p-2">
                <h1 class="text-xl font-bold">
                        Oops!
                </h1>
            </Card.Title>
            <p>Seems like 
                you are not logged in.
            </p>
            <Card.Text class="p-2">
                You need to sign in to view your {title}
            </Card.Text>
            <Link title="Auth" href="/auth" class="btn btn-primary m-2">Take me there</Link>
        </Card.Body>
    </Card></section>);
    }