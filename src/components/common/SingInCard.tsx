import { Link } from "@solidjs/router";
import { Card } from "solid-bootstrap";

export function SingInCard({title}:{title:string}) {
    return (<section class="h-full w-full flex items-center justify-center p-5"><Card class="text-center">
        <Card.Body>
            <Card.Title class="p-2">Sign in to view your {title}</Card.Title>
            <Card.Text class="p-2">
                You need to sign in to view your {title}
            </Card.Text>
            <Link title="Auth" href="/auth" class="btn btn-primary">Sign in</Link>
        </Card.Body>
    </Card></section>);
    }