import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axiosClient from '../axios-client'
import { Link } from 'react-router-dom'
function ProductForm() {

    const [errors, setErrors] = useState(null)
    const { slug } = useParams();

    const categories_options = [
        { value: 1, text: 'Forniture' },
        { value: 2, text: 'Lighting' },

    ];

    const [selectedCategory, setSelectedCategory] = useState(categories_options[0].value);

    const handleCategoryChange = event => {
        setSelectedCategory(event.target.value);
        setProduct({ ...product, category_id: event.target.value })
    };

    const [product, setProduct] = useState({ id: null, name: undefined, stock: undefined, category_id: categories_options[0].value })
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            setLoading(true)
            axiosClient.get(`/products/${slug}`)
                .then(({ data }) => { setProduct(data.data), console.log('res product  = ', data.data), setSelectedCategory(data.data.category.id), setLoading(false) })
                .catch(err => { console.error('the error  = ', err.message) })
        } else {
            setLoading(false)
        }

    }, [slug])

    // get all categoreis onMount
    /*  useEffect(() => {
        
     },[]) */

    const onSubmit = (e) => {
        e.preventDefault()
        if (product.id) {
            axiosClient.put(`/products/${product.slug}`, {...product,'category_id':selectedCategory})
                .then(res => { navigate('/products') })
                .catch(err => {
                    const response = err.response;
                    /*  if (response && response.status === 422) {
                         if (response.data.errors) {
                             setErrors(response.data.errors)
                         } else {
                             setErrors({
                                 email: [response.data.message]
                             })
                         }
                     } */
                })
        } else {
            console.log('new product =', product)
            axiosClient.post(`/products`, product)
                .then(res => { navigate('/products') })
                .catch(err => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        if (response.data.errors) {
                            setErrors(response.data.errors)
                        } else {
                            setErrors({
                                email: [response.data.message]
                            })
                        }
                    }
                })
        }
    }
    return (
        <>
            {slug && <h1>Update product : {product.name}</h1>}
            {!slug && <h1>New product</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center"> Loading...</div>}
                {errors && <ul className='alert'>
                    {Object.keys(errors).map(key => (
                        <li key={key}>{errors[key][0]}</li>
                    ))}</ul>}

                {!loading &&
                    <form onSubmit={onSubmit}>
                        <input value={product.name} onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} type="text" placeholder="Name" name="" id="" />
                        <input value={product.stock} onChange={(e) => { setProduct({ ...product, stock: e.target.value }) }} type="number" placeholder="Stock" name="" id="" />
                        <select value={selectedCategory} onChange={handleCategoryChange} >
                            {categories_options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.text}
                                </option>
                            ))}
                        </select>
                        <button className="btn">Save</button>
                        <br />
                        <div className="center">
                            <Link className='btn-navigate' to='/'>Back to Products page</Link>
                        </div>
                    </form>}


            </div>
        </>
    )
}

export default ProductForm