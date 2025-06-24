import './home.scss';
import Searchbar from '../../components/searchbar/Searchbar';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

function Home() {

  const {currentUser} = useContext(AuthContext)
console.log(currentUser)
  return (
    <div className='homepage'>
       
        <div className="textContainer">
            <div className="wrapper">
          <h1 className='title'>   Find Real State and get your Dream Place </h1> 
             
             <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus, quisquam.</p>
             <Searchbar> </Searchbar>
           
             <div className="boxes"> 
                <div className="box"> 
                    <h1> 16+</h1>
                    <h2> Years of Experience</h2>
                </div>
                <div className="box"> 
                    <h1> 200</h1>
                    <h2> Award Gained</h2>
                </div>
                <div className="box"> 
                    <h1> 1200+</h1>
                    <h2> Property Ready</h2>
                </div>
                </div>
             </div>
             </div>
        <div className="imgContainer"> 
            <img src = "/bg.png" alt="bg"/> 
             </div>
      
    </div>
  );
}

export default Home;
