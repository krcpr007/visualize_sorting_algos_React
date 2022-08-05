import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

const BubbleSort = () =>{
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();
   // values of array elements
   let values = myState.values.map((item) => item[0]);
   // indexes of array elements
   let ids = myState.values.map((item) => item[1]);
   
   const solve = () => {
      
      for(let i = values.length,timer = 0; i > 0;timer += i-1, i--){
         setTimeout(() => {  // this is setTimeout function it used to schedule innermost for loop ; 
            for(let j = 1; j < i; j++){
               setTimeout(() => { // this is setTimeout function it used to compare too elements ; 
                  document.getElementById(ids[j]).childNodes[1].style.backgroundColor = 'black';
                  document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = 'black';
                  
                  setTimeout(() => { // this is setTimeout function it used to regain the original color  ; 
                     document.getElementById(ids[j]).childNodes[1].style.backgroundColor = myState.color;
                     document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                  },myState.speed-10);
                     
                  if(values[j]<values[j-1]){ //nothing just swapping values
                     let temp = values[j]; 
                     values[j] = values[j-1];
                     values[j-1] = temp;

                     temp = ids[j];   //swapping ids
                     ids[j] = ids[j-1];
                     ids[j-1] = temp;
                     
                     document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
                     
                     document.getElementById(ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;
                        
                  }
               },(j-1)*(myState.speed));
            }
         }
         ,(timer)*(myState.speed))
      }
      
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })

      },(((myState.values.length-1)*(myState.values.length))/2)*myState.speed+50);
   }
   
   useEffect(() => {
      if(myState.algorithm==='bubble'){
         if(myState.play)
            solve();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[myState.play]);

   return <></>;
}

export default BubbleSort;