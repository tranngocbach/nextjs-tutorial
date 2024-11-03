'use client'

import { Button, Table } from "react-bootstrap"
import CreateModal from "./create.modal";
import { useState } from "react";
import UpdateModal from "./update.modal";
import Link from "next/link";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface IProps {
  blogs: IBlog[];
}

function AppTable(props: IProps) {
  const { blogs } = props;

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);

  const [blog, setBlog] = useState<IBlog | null>(null);

  const handleDelete = (id: number) => {
    if (confirm(`Are you sure you want to delete this blog ${id}?`)) {
      fetch(`http://localhost:8000/blogs/${id}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
          body: JSON.stringify({ id: id })
        })
        .then(res => res.json())
        .then(res => {
          if (res) {
            toast.success('Delete successfully');
            mutate("http://localhost:8000/blogs") //chi la goi lai api de cap nhat du lieu len giao dienz sau thi add du lieu
          }
        })
    }
  }
  return (
    <>
      <div
        className="mb-3"
        style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Blogs</h3>
        <Button variant="secondary"
          onClick={() => setShowModalCreate(true)}
        >Add New</Button>
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td >
                  <Link
                    className="btn btn-primary"
                    href={`/blogs/${item.id}`}>View</Link>
                  <Button variant="warning" className="mx-2"
                    onClick={() => {
                      setBlog(item)
                      setShowModalUpdate(true)
                    }}
                  >Edit</Button>
                  <Button variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >Delete</Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table >
      <UpdateModal
        showModalUpdate={showModalUpdate}
        setShowModalUpdate={setShowModalUpdate}
        blog={blog}
        setBlog={setBlog}
      >
      </UpdateModal>
      <CreateModal
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
    </>

  );
}

export default AppTable;