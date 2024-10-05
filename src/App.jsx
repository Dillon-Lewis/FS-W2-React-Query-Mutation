import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import GetPosts from "./components/getPosts";
import AddPost from "./components/AddPost";
import UpdatePost from "./components/UpdatePost";

function App() {

const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
     <AddPost />
     < br />
     <GetPosts />
     
     
     


    </QueryClientProvider>
  )
}

export default App
