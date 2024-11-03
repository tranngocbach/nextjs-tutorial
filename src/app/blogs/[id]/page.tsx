'use client'

import Link from "next/link";
import { Button, Card } from "react-bootstrap";
import useSWR, { Fetcher } from 'swr'

const ViewDetailBlog = ({ params }: { params: { id: string } }) => {  //ban chat van la prop cua React Route

    const fetcher: Fetcher<IBlog, string> = (url: string) => fetch(url)
        .then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `http://localhost:8000/blogs/${params.id}`,
        fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    }
    );

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <Link href={'/blogs'}>Back</Link>
            <Card className="text-center">
                <Card.Header>Title: {data?.title}</Card.Header>
                <Card.Body>
                     <Card.Text>
                        {data?.content}
                    </Card.Text>
                        <Card.Footer className="text-muted">Author: {data?.author}</Card.Footer>
                </Card.Body>
            </Card>
        </>
    )
}

export default ViewDetailBlog;