import { BrowserRouter,Route,Routes} from 'react-router-dom';
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Profile from './Pages/Profile';
import Rigister from './Pages/Rigister';
import Landing from './Pages/Landing';
import ProductForm from './compontens/product/ProductForm';
import ProductDetail from './compontens/product/ProductDetail';
import EditProduct from './compontens/product/EditProduct';
import Forgot from './Pages/Forgot';
import Reset from './Pages/Reset';


axios.defaults.withCredentials = true;


function App() {
  return (
    <BrowserRouter>
    <ToastContainer theme="dark" />
   <Routes>
    <Route path='/' element={<Landing /> } />
    <Route path='/register' element={<Rigister />} />
    <Route path='/pr' element={<Profile />} />
    <Route path='/add' element={<ProductForm />} />
    <Route path='/product-detail/:id' element={<ProductDetail />} />
   
    <Route path='/edit-product/:id' element={<EditProduct />} />
    
    <Route path="/forgot" element={<Forgot />} />
    <Route path="/resetpassword/:resetToken" element={<Reset />} />
   </Routes>
  </BrowserRouter>


  );
}

export default App;
