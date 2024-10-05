import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, Spinner, Alert, Button, Container } from "react-bootstrap";

const GetPosts = () => {
  const fetchPosts = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return response.data;
  };

  const deletePost = async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: true,
    retry: 3,
    staleTime: 5000,
  });

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (id) => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting post:", error);
    },
  });

  if (isLoading) {
    return <Spinner animation="grow" />;
  }

  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <Container>
      <Button className="danger" onClick={refetch}>
        Get Some Posts
      </Button>
      {posts &&
        posts.map((post) => (
          <Card key={post.id} style={{ width: "18rem", margin: "10px" }}>
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
              <Button variant="primary">Edit Text</Button>
              <Button variant="danger" onClick={() => mutation.mutate(post.id)}>
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
    </Container>
  );
};

export default GetPosts;