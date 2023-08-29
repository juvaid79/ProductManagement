import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home';
import Login from './pages/login';
import Singup from './pages/singup';
import Publicroute from './Publicroute'
import Privateroute from "./Privateroute";
import Changepass from './pages/Changepass';
import Forget from './pages/Forget';
import Cart from './pages/Cart';
import Order from './pages/Order';


function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Publicroute />}>
						<Route index element={<Singup />} />
						<Route path="/singup" element={<Singup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/forget" element={<Forget />} />
						
					</Route>

					<Route path="/" element={<Privateroute />}>
						<Route index element={<Home />} />
						<Route path="/home" element={<Home />} />
						<Route path="/changepass" element={<Changepass />} />
						<Route path='/cart' element={<Cart/>}/>
						<Route path='/order' element={<Order/>}/>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
