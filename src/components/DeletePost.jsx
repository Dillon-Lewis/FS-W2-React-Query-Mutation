import React, { useState } from 'react'
import axios from 'axios'
import { useMutation } from '@tanstack/react-query';

export const DeletePost = () => {

    const [post, setPost] = useState('')

    const deletePost = () => {

        const response = axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)

        return response.data
    };

    const { mutate, isLoading, isError, error, isSuccess } = useMutation({
        mutationFn: deletePost,
        onSuccess: (data) => {
          console.log(data);
        },
    });

    if (isLoading) {
        return <Spinner animation="grow" />;
      }
    
      if (isError) {
        return <Alert>{error.message}</Alert>;
      }

      if (isSuccess) {
        return <Alert>Updated Successfully</Alert>;
      }

    const deleteData = () => {
        mutate()
    }

    return deleteData
}
