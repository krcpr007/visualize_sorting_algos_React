import React,{useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Sidebar() {

   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   const [max,setMax] = useState(30);

   const handleAlgo = (algo) => {
      dispatch({
         type: 'UPDATE_ALGORITHM',
         algorithm: algo
      })
   }

   const resetColor = () => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
   }

   const handleRange = (range) => {

      let new_arr = [...myState.values];
      for(let i = 0; i < new_arr.length; i++)
      // using translateX for animate the array w.r.t index
         document.getElementById(i).style.transform = `translateX(${i*11}px)`;

      resetColor();
      
      dispatch({
         type: 'UPDATE_RANGE',
         range: range
      })
      dispatch({
         type:'CHANGE_VALUES'
      })
   }

   const handleColor = (color) => {
      dispatch({
         type: 'UPDATE_COLOR',
         color: color
      })
   }
   // handing the speed of animation
   const handleSpeed = (speed) => {
      dispatch({
         type: 'UPDATE_SPEED',
         speed: speed
      })
   }

   useEffect(() => {
      handleRange(30);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]);

   useEffect(() => {
      dispatch({
         type:'UPDATE_COLOR',
         color:document.getElementById('color').value
      })
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[myState.values]);

   const handleWidth = () => {
      if(window.innerWidth>1300)
         setMax(70);
      else if(window.innerWidth>1200)
         setMax(60);
      else if(window.innerWidth>1100)
         setMax(50);
      else if(window.innerWidth>900)
         setMax(45);
      else if(window.innerWidth>800)
         setMax(40);
      else if(window.innerWidth>500)
         setMax(30);
      else
         setMax(20);
   }

   useEffect(() => {
      handleWidth();
      window.addEventListener('resize',handleWidth);
      return () => window.removeEventListener('resize',handleWidth);
   },[]);

  return (
    <div className="text-[#00ADB5] font-medium bg-[#393E46] ">

      <div className="mb-2 ml-2 pt-1">
         <label htmlFor="algo">Algorithm: </label>
         <select name="algo" className='bg-[#EEEEEE] rounded text-[#222831]' id="algo" onChange={(e) => handleAlgo(e.target.value)} disabled = {myState.play? true: false}>
            <option value="bubble">Bubble Sort </option> 
            <option value="merge">Merge Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="heap">Heap Sort</option>
         </select>
      </div>

      <div className="m-2">
         <label htmlFor="range">Range: </label>
         <input type="range" 
         defaultValue={40}
         id = 'slider'
         min={1}
         className = 'h-2 bg-[#222831] rounded-lg appearance-none  cursor-pointer'
         disabled={myState.play? true: false}
         max={max}
         onChange = {(e) => handleRange(e.target.value)}
        />
      </div>

      <div className="m-2">
         <label htmlFor="color">Color: </label>
         <select name="color" id="color" className='bg-[#EEEEEE] rounded text-[#222831]' onChange = {(e) => handleColor(e.target.value)} disabled = {myState.play? true: false}>
            <option value="rgb(0,128,128)" style={{color:'rgb(0,128,128)'}}>Teal</option> 
            <option value='rgb(128,128,0)' style={{color:'rgb(128,128,0)'}}>Olive</option>
            <option value="rgb(255, 112, 112)" style={{color:'red'}}>Red</option>
            <option value="grey" style={{color:'grey'}}>Black</option>
            <option value="rgb(221,217,2)" style={{color:'rgb(221,217,2)'}}>Yellow</option>
         </select>
      </div>

      <div className="m-2">
         <label htmlFor="speed">Speed: </label>
         <select name="speed" className='bg-[#EEEEEE] rounded text-[#222831]' defaultValue={100} id="speed" onChange = {(e) => handleSpeed(e.target.value)} disabled = {myState.play? true: false}>
            <option value={500} >Slow</option> 
            <option value={200} >Medium</option>
            <option value={100} >Fast</option>
            <option value={20} >Super Fast</option>
            <option value={5} >Ultra Fast</option>
         </select>
      </div>
      <div className="m-2">
        <h1 className='text-center mt-5'>Time Complexity</h1>
         <label htmlFor="">Best Case:</label> <br />
        
         <label htmlFor="">Average Case:</label> <br />
         <label htmlFor="">Worst Case:</label>

         <h1 className='text-center'>Space Complexity</h1>

      </div>
   </div>
  )
}

export default Sidebar;
