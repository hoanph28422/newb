import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { addProduct, deleteProduct, getAllProduct, updateProduct } from './api/product'
import AddProductPage from './pages/admin/AddProduct'
import Dashboard from './pages/admin/Dashboard'
import ProductManagementPage from './pages/ProductManagement'
import UpdateProductPage from './pages/admin/UpdateProduct'
import HomePage from './pages/HomePage'
import AdminLayout from './pages/layouts/AdminLayout'
import ProductPage from './pages/Product'
import ProductDetailPage from './pages/ProductDetail'
import { IProduct } from './types/product'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { IUser } from './types/user'
import AddCategoryPage from './pages/admin/AddCategory'
import Category from './pages/admin/Category'
import {adduser} from './api/user'
import { addCategory } from './api/category'
import { ICategory } from './types/category'

function App() {
  const [users, setUser]= useState<IUser[]>([])
  useEffect(()=>{
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
    };
    const onHandleAddU = (users: IUser) => {
      adduser(users)
    }
  })
  const [categories, setCategory] = useState<IUser[]>([])
  useEffect(() => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUser((prevState) => ({ ...prevState, [name]: value }));
    };
    const onHandleAddC = (categories: ICategory) => {
      addCategory(categories)
    }
  })
  const [products, setProduct] = useState<IProduct[]>([])
  useEffect(() => {
    getAllProduct().then(({ data }) => setProduct(data))
  }, [])
  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() => setProduct(products.filter(product => product.id !== id)))
  }
  const onHandleAdd = (product: IProduct) => {
    addProduct(product)
  }
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product)
  }
  return (
    <div className="App">
      <Routes>
        <Route path='/'>
          <Route index element={<HomePage />} />
          <Route path='products' element={<ProductPage products={products} onRemove={onHandleRemove} />} />
          <Route path='products/:id' element={<ProductDetailPage products={products} />} />
          {/* <Route path='signin' element={<Signin />} />
          <Route path='signup' element={<Signup />} /> */}
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          
          <Route path='products'>
            <Route index element={<ProductManagementPage products={products} onRemove={onHandleRemove} />} />
            <Route path='add' element={<AddProductPage onAdd={onHandleAdd} />} />
            
            <Route path=':id/update' element={<UpdateProductPage onUpdate={onHandleUpdate} products={products} />} />
          </Route>
        </Route>
      </Routes>

    </div >
  )
}

export default App
