import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import GetPosts from "./components/getPosts";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";
import { DeletePost } from "./components/DeletePost";
function App() {

const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
     <GetPosts />
     < br />
     <AddPost />
     <DeletePost />
     


    </QueryClientProvider>
  )
}

export default App
