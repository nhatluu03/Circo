import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/scss/base.scss";
import "boxicons";
import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
// Pages
import Artworks from "./pages/artworks/Artworks";
import Marketplace from "./pages/marketplace/Marketplace";
import ProfileShowcasingArtworks from "./pages/profileShowcasingArtworks/ProfileShowcasingArtworks";
import OrderHistory from "./pages/orderHistory/OrderHistory";
import OrderDashboard from "./pages/orderDashboard/OrderDashboard";
import OrderDetails from "./pages/orderDetails/OrderDetails";
import ClientInfo from "./pages/clientInfo/ClientInfo";
// import Artwork from "./pages/artwork/Artwork";
import Challenges from "./pages/challenges/Challenges";
import Challenge from "./pages/challenge/Challenge";
import Talents from "./pages/talents/Talents";
import Feedbacks from "./pages/feedbacks/Feedbacks";
import Search from "./pages/search/Search";

// import Messenger from "./pages/messenger/Messenger";
import Commissions from "./pages/commissions/Commissions";
import Store from "./pages/store/Store";
import Layout from "./Layout";
import Pay from "./pages/pay/Pay";
import Checkout from "./pages/checkout/Checkout";
import Coupons from "./pages/coupons/coupons";

// import Success from "./pages/success/Success";

function App() {
  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout showSidebar={true} userRole={'talent'}></Layout>,
      children: [
        {
          path: "/talents/:id",
          element: <ProfileShowcasingArtworks />,
        },
        {
          path: "/talents/:id/commissions",
          element: <Commissions />,
        },
        {
          path: "/talents/:id/store",
          element: <Store />,
        },
        {
          path: "/talents/:id/order-dashboard",
          element: <OrderDashboard />,
        },
        {
          path: "/talents/:id/order-dashboard/:orderId",
          element: <OrderDetails />,
        },
        {
          path: "/talents/:id/feedbacks",
          element: <Feedbacks />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout showSidebar={true} userRole={'client'}></Layout>,
      children: [
        {
          path: "/clients/:id",
          element: <ClientInfo />,
        },
        {
          path: "/clients/:id/order-history",
          element: <OrderHistory />,
        },
        {
          path: "/clients/:id/coupons",
          element: <Coupons />,
        },
      ],
    },
    {
      path: "/",
      element: <Layout showFilterBar={true}></Layout>,
      children: [
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/checkout/pay",
          element: <Pay />,
        },
      ],
    },

    {
      path: "/",
      element: <Layout showFilterBar={true}></Layout>,
      children: [
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/artworks",
          element: <Artworks />,
        },
        {
          path: "/marketplace",
          element: <Marketplace />,
        },
        {
          path: "/talents",
          element: <Talents />,
        },
        // {
        //   path: "/artworks/:id",
        //   element: <Artwork />,
        // },
        // {
        //   path: "/challenges",
        //   element: <Challenges />,
        // },
        // {
        //   path: "/challenges/:id",
        //   element: <Challenge />,
        // },
        // {
        //   path: "/talents/:id",
        //   element: <Talent />,
        // },
        // {
        //   path: "/talents/:id/commissions",
        //   element: <Commissions />,
        // },
      ],
    },
  ]);


  // return <RouterProvider router={router} />;
  return (
    <QueryClientProvider client={queryClient}  contextSharing={true}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
// // import { getTodos, postTodo } from '../my-api'

// import { useState } from "react";

// const mockToDoData = [
//   {
//     id: 1,
//     title: "Task 01",
//   },
//   {
//     id: 2,
//     title: "Task 02",
//   },
// ];

// // Create a client
// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     // Provide the client to your App
//     <QueryClientProvider client={queryClient}>
//       <Todos />
//     </QueryClientProvider>
//   );
// }

// function Todos() {
//   const [tasks, setTasks] = useState([]);

//   function getTodos() {
//     console.log("Getting all todos");
//     console.log(tasks)
//     return Promise.resolve(mockToDoData);
//   }

//   async function postTodo(todo) {
//     console.log("Posting new todo; ", todo.title);
//     // Simulate an asynchronous operation (e.g., an API call)
//     await new Promise((resolve) => setTimeout(resolve, 100));
//     setTasks((prevTodos) => [todo, ...prevTodos]);
//     console.log(todos)
//   }
  

//   // Access the client
//   const queryClient = useQueryClient();

//   // Queries
//   const {data: todos, isLoading} = useQuery({ queryKey: ["todos"], queryFn: getTodos });

//   // Mutations
//   const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       // Invalidate and refetch
//       queryClient.invalidateQueries({ queryKey: ["todos"] });
//     },
//   });

//   if (isLoading) {
//     return <div> Loading ... </div>
//   }

//   return (
//     <div>
//       <ul>
//         {todos?.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>

//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: "Do Laundry",
//           });
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   );
// }

// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "react-query";
// // import { getTodos, postTodo } from '../my-api'

// import { useState } from "react";

// const mockToDoData = [
//   // {
//   //   id: 1,
//   //   title: "Task 01",
//   // },
//   // {
//   //   id: 2,
//   //   title: "Task 02",
//   // },
// ];

// // Create a client
// const queryClient = new QueryClient();

// export default function App() {
//   return (
//     // Provide the client to your App
//     <QueryClientProvider client={queryClient}>
//       <Todos />
//     </QueryClientProvider>
//   );
// }

// function Todos() {
//   const [todos, setTodos] = useState([]);

//   function getTodos() {
//     console.log("Getting all todos");
//     console.log(todos) 
//     return todos;
//   }

//   async function postTodo(todo) {
//     console.log("Posting new todo; ", todo.title);
//     // await new Promise((resolve) => setTimeout(resolve, 100));
//     setTodos((prevTodos) => {
//       const newTodos = [todo, ...prevTodos];
//       console.log(prevTodos)
//       console.log(newTodos);
//       return newTodos;
//     });
//     console.log(todos)
//   }
  

//   const queryClient = useQueryClient();
//   const {data} = useQuery("todos", getTodos);
//   const mutation = useMutation({
//     mutationFn: postTodo,
//     onSuccess: () => {
//       queryClient.invalidateQueries(["todos"]);
//     },
//   });

//   console.log(data) 

//   return (
//     <div>
//       <ul>
//         {data?.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>

//       <button
//         onClick={() => {
//           mutation.mutate({
//             id: Date.now(),
//             title: "Do Laundry",
//           });
//         }}
//       >
//         Add Todo
//       </button>
//     </div>
//   );
// }

