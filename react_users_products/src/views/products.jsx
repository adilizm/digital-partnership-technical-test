import React, { useEffect, useState } from 'react'
import { useAuth } from "../contexts/UserContext"
import { useNavigate } from 'react-router-dom'
import axiosClient from '../axios-client.js'
import { Link } from 'react-router-dom'
import ProductForm from '../components/ProductForm'


function products() {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  const getProducts = () => {
    setLoading(true);
    axiosClient.get('products')
      .then(({ data }) => {
        console.log('data = ' ,data.data)
        setProducts(data.data)
        setLoading(false);
      })
  }

  useEffect(() => {
    getProducts()
  }, [])


  const handelDelete = (product) =>{
    if(!window.confirm('Are you sure you want to delete this product ?')){
      return
    }
    axiosClient.delete(`/products/${product.id}`)
    .then(()=>{
      getProducts() 
    })
    .catch(err => {
      alert('Error Cannot delete this Product , try again ')
    })
  }


  return (
    <div>
    <div style={{ display: 'flex ', justifyContent: 'space-between', alignItems: 'center' }}>
      <h1>Products</h1>
      <Link className='btn-add' to='new'>Add New Product</Link>
    </div>
    <div className='card animated fadeInDown'>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        {loading == true ? <tbody>
          <tr>
              <td colSpan="5" className='text-center'>Loading...</td>
          </tr>
        </tbody> : <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.category.name}</td>
              <td>
              <Link className='btn-edit' to={`/products/${product.slug}`}>Edit</Link> &nbsp;
              <button onClick={()=>handelDelete(product)} className='btn-delete '>Delete</button>
              </td>
            </tr>
          ))}
        </tbody> }
      </table>
    </div>
  </div>
  )
}

export default products