import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./Lauouts/RootLayout.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import AllProducts from "./components/AllProducts/AllProducts.jsx";
import CreateProduct from "./components/CreateProduct/CreateProduct.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import MyBids from "./components/MyBids/MyBids.jsx";
import MyProducts from "./components/MyProducts/MyProducts.jsx";
import Register from "./components/Register/Register.jsx";
import AUthProvider from "./contexts/AUthProvider.jsx";
import "./index.css";
import ProductDetails from "./components/ProductDetails/ProductDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "AllProducts",
        Component: AllProducts,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "productdetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/products/${params.id}`),
        element: (<PrivateRoute>
          <ProductDetails></ProductDetails>
          </PrivateRoute>),
      },
      {
        path: "myproducts",
        element: (
          <PrivateRoute>
            <MyProducts></MyProducts>
          </PrivateRoute>
        ),
      },
      {
        path: "mybids",
        element: (
          <PrivateRoute>
            <MyBids></MyBids>
          </PrivateRoute>
        ),
      },
      {
        path: "createproduct",
        element: (
          <PrivateRoute>
            <CreateProduct></CreateProduct>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AUthProvider>
      <RouterProvider router={router} />
    </AUthProvider>
  </StrictMode>
);
