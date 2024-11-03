'use client'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mutate } from "swr"

interface IProps {
    showModalCreate: boolean;
    setShowModalCreate: (value: boolean) => void;
}
function CreateModal(props: IProps) {
    const { showModalCreate, setShowModalCreate } = props;

    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [content, setContent] = useState<string>('');

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
        fetch("http://localhost:8000/blogs",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ title: title, author, content })
            })
            .then(res => res.json())
            .then(res => {
                if (res) {
                    toast.success('Create success');
                    handleCloseModal();
                    mutate("http://localhost:8000/blogs") //chi la goi lai api de cap nhat du lieu len giao dienz sau thi add du lieu
                }
            })
    }

    const handleCloseModal = () => {
        setTitle('');
        setAuthor('');
        setContent('');
        setShowModalCreate(false);
    }
    return (
        <>
            <Modal
                show={showModalCreate}
                onHide={() => handleCloseModal()}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add A Blog</Modal.Title>
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

export default CreateModal;