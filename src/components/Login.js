import { Button } from 'react-bootstrap'
import React, { useRef } from 'react'
import { Container, Form } from 'react-bootstrap'
import { v4 as uuidV4, v4 } from 'uuid'

export default function Login({ onIdSubmit }) {

    const idref = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        onIdSubmit(idref.current.value)
    }

    const createNewId = ()=>{
        onIdSubmit(v4())
    }

    return (
        <div>
            <Container>
                <h1>Hellow New User</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Enter your id</Form.Label>
                        <Form.Control type="text" ref={idref} required />
                    </Form.Group>
                    <Button type="submit" className="mb-2">Login</Button>
                    <br />
                    <Button variant="secondary" onClick={createNewId}>Create a new id</Button>
                </Form>
            </Container>
        </div>
    )
}
