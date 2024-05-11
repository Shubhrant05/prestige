import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdateListing from './pages/UpdateListing';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Listing from './pages/Listing';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster/>
      <Router>
        <Header />
        <Routes className="overflow-y-auto">
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/listing/:listingId' element={<Listing />} />
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing/>}/>
            <Route path='/update-listing/:id' element={<UpdateListing/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
