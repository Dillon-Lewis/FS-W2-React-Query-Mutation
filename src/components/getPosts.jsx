import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { Card, Spinner, Alert, Button, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import UpdatePost from "./UpdatePost"
import DeletePost from "./DeletePost"

const GetPosts = () => {
    const fetchPosts = async () => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        return response.data
    }



    const { data: posts, isLoading, isError, error, refetch } 
        = useQuery({
            queryKey: ["posts"],
            queryFn: fetchPosts, 
            enabled: false, 
            retry: 3, 
            staleTime: 5000, 
            gcTime: 5000, 
        });

        if (isLoading) {
            return <Spinner animation="grow" />;
          }
        
          if (isError) {
            return <Alert>{error.message}</Alert>;
          }



  return (
    <Container>
        <Button className='Danger' onClick={refetch}>Get Some Posts</Button>
        {posts && posts.map((post) => (
            <Card key={post.id} style={{width: '18rem'}}>
                <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body} </Card.Text>
                    <Button variant="primary">Edit Text</Button>
                    <DeletePost />
                </Card.Body>
            </Card>
        ))}
    </Container>
  )
}

export default GetPosts