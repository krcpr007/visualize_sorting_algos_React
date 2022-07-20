import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Visuals from './components/Visuals';
function App() {

  return (
    <>
      <Header />
      <div className='md:flex'>
        <Sidebar />
        <Visuals />
      </div>
      <Footer/>
    </>
  );
}

export default App;
