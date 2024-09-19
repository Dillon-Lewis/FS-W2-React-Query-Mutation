import React, {useState} from 'react'
import { Spinner, Alert, Card , Button} from "react-bootstrap";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Form, Container } from 'react-bootstrap';




const AddPost = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [info, setInfo] =useState(null);

    const addPost = async () => {
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        title: title,
        body: body,
        userId: Date.now(),
    });
    

    return response.data;

    };

    const { mutate, isLoading, isError, error } = useMutation({
        mutationFn: addPost,
        onSuccess: (data) => {
            console.log(data);
            setInfo(data);
        },
    });

    if (isLoading) {
        return <Spinner animation="grow" />;
      }
    
      if (isError) {
        return <Alert>{error.message}</Alert>;
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        mutate();
      };

  return (
    <Container>
        {info && (
            <Card key={info.userId} style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{info.title}</Card.Title>
              <Card.Text>{info.body}</Card.Text>
            </Card.Body>
          </Card>
        )}
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNewPost">
                <Form.Label>Lets Make A Post: </Form.Label>
                <Form.Control value={title} type="text" placeholder="New post title here" autoComplete='off' onChange={(event)=> setTitle(event.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formNewPost">
                <Form.Label>What Would you like to say? </Form.Label>
                <Form.Control value={body} type="text" placeholder="your thoughts here" autoComplete='off' onChange={(event)=> setBody(event.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
    </Container>
  )

}

export default AddPost