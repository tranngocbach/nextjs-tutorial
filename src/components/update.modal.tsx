'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    blog: IBlog | null;
    setBlog: (value: IBlog | null) => void;
    showModalUpdate: boolean;
    setShowModalUpdate: (value: boolean) => void;
}
function UpdateModal(props: IProps) {
    const { showModalUpdate, setShowModalUpdate, blog, setBlog } = props;

    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        if (blog) {
            setId(blog.id);
            setTitle(blog.title);
            setAuthor(blog.author);
            setContent(blog.content);
        }
    }, [blog])

    const handleSubmit = () => {

        if (!title) {
            toast.error('Title is required');
            return;
        }
        if (!author) {
            toast.error('Author is required');
            return;
        }
        if (!content) {
            toast.error('Content is required');
            return;
        }
        fetch(`http://localhost:8000/blogs/${id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PUT",
                body: JSON.stringify({ title: title, author, content })
            })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.warning('Update successfully');
                    handleCloseModal();
                    mutate("http://localhost:8000/blogs") //chi la goi lai api de cap nhat du lieu len giao dienz sau thi add du lieu
                }
            })
    }

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setBlog(null);
        setShowModalUpdate(false);
    }
    return (
        <>
            <Modal
                show={showModalUpdate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update A Blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="..."
                                value={title} onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder="..."
                                value={author} onChange={(e) => setAuthor(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="..."
                                value={content} onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleCloseModal()}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateModal;