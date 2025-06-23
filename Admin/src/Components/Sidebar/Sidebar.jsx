import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import list_bill_icon from '../../assets/bill.png'
import list_user_icon from '../../assets/user.png'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/admin/addproduct'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
          </div>
        </Link>
        <Link to={'/admin/listproduct'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={list_product_icon} alt="" />
            <p>Product List</p>
          </div>
        </Link>
        <Link to={'/admin/listbill'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={list_bill_icon} alt="" />
            <p>Bill List</p>
          </div>
        </Link>
        <Link to={'/admin/listuser'} style={{textDecoration:"none"}}>
          <div className="sidebar-item">
            <img src={list_user_icon} alt="" />
            <p>User List</p>
          </div>
        </Link>
    </div>
  )
}

export default Sidebar