import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Admin from "./Pages/Admin/Admin";
import LoginAdmin from "./Pages/LoginAdmin";
import AddProduct from "./Components/AddProduct/AddProduct";
import ListProduct from "./Components/ListProduct/ListProduct";
import ListBill from "./Components/ListBill/ListBill";
import ListUser from "./Components/ListUser/ListUser";
import { AuthProvider } from "./Context/AuthContext"; 

const App = () => {
  return (
    <AuthProvider> {/*Bọc toàn bộ App - chia se trang thai dang nhap */}
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginAdmin />} />
        <Route path="/admin/*" element={<Admin />}>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="listproduct" element={<ListProduct />} />
          <Route path="listbill" element={<ListBill />} />
          <Route path="listuser" element={<ListUser />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
