import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route, Outlet} from 'react-router-dom'
// import AddProduct from '../../Components/AddProduct/AddProduct'
// import ListProduct from '../../Components/ListProduct/ListProduct'
// import ListBill from '../../Components/ListBill/ListBill'
// import ListUser from '../../Components/ListUser/ListUser'

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Outlet /> {/* Đây là nơi các route con sẽ được render */}
    </div>
  )
}

export default Admin