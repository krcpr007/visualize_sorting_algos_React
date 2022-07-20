import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BubbleSort from '../Algos/BubbleSort';
import InsertionSort from '../Algos/InsertionSort'
import MergeSort from '../Algos/MergeSort'
import QuickSort from '../Algos/QuickSort'
import SelectionSort from '../Algos/SelectionSort'
import { AiOutlineReload } from 'react-icons/ai'
import { AiFillPlayCircle } from 'react-icons/ai'
import { MdOutlineChangeCircle } from 'react-icons/md'
function Visuals() {

    const myState = useSelector(state => state.updateProps);
    const dispatch = useDispatch();
    const color = myState.color;
    const range = myState.range;

    const changeValues = () => {

        let new_arr = [...myState.values];
        for (let i = 0; i < new_arr.length; i++)
            document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

        dispatch({
            type: 'CHANGE_VALUES'
        })
    }

    const handlePlayPause = (play) => {
        if (!myState.play) {
            document.getElementById('change-btn').disabled = true;
            document.getElementById('change-btn').style.backgroundColor = 'grey';
            document.getElementById('play-btn').disabled = true;
            document.getElementById('play-btn').style.backgroundColor = 'grey';
        }
        else {
            return;
        }
        dispatch({
            type: 'PLAY_PAUSE',
            _play: play
        })
    }

    useEffect(() => {
        if (!myState.play) {
            document.getElementById('play-btn').disabled = false;
            document.getElementById('play-btn').style.backgroundColor = 'rgb(0, 149, 199)';
            document.getElementById('change-btn').disabled = false;
            document.getElementById('change-btn').style.backgroundColor = 'rgb(0, 149, 199)';
        }
    }, [myState.play]);

    let speed = myState.speed;
    if (myState.algorithm === 'selection')
        speed *= 3;
    else if (myState.algorithm === 'merge')
        speed *= 5;
    else if (myState.algorithm === 'heap')
        speed *= 5;
    else if (myState.algorithm === 'quick')
        speed *= 6;
    return (
        <div className="flex-1 p-1 md:p-5 flex items-center justify-start flex-col bg-[#EEEEEE] md:border-2 border-black">
            <div className="w-full flex items-center justify-center relative md:border-t-2 md:border-l-2 md:border-r-2 border-black">
                {myState.algorithm === 'quick' && <div className="py-[2px] px-[5px] absolute left-0 top-0 border border-gray-400 flex items-center font-medium text-sm "><div className=" h-1 w-5 bg-[#222831] mr-1"></div> Pivot elements</div>}
                {
                    <div className="flex items-end justify-start h-[340px] mb-[40px] border-b border-black relative " style={{ width: `${myState.values.length * 11}px` }}>
                        {
                            myState.values.map((item) => {

                                return (<div className="absolute" key={item[1]} id={item[1]} style={{ transition: `${speed / 1000}s linear all`, transform: `translateX(${item[1] * 11}px)` }}>
                                    <h4 className='text-[#222831] text-[0.4rem]'>{item[0]}</h4>
                                    <div style={{ height: `${item[0] * 3}px`, backgroundColor: color, width: (range < 35 ? '8px' : '6px') }}></div>
                                </div>)
                            })
                        }
                    </div>
                }
            </div>
            <div className="md:-m-5">
                <button id='change-btn' className='mx-5 my-2 px-2 rounded-md border border-black' style={{ backgroundColor: color }} onClick={changeValues}> <MdOutlineChangeCircle className='inline my-1' />change values</button>
                <button id='play-btn' className='mx-5 my-2 px-2 rounded-md border border-black' style={{ backgroundColor: color }} onClick={() => handlePlayPause(true)}> <AiFillPlayCircle className='inline my-1' /> play</button>
                <button id='reload-btn' className='mx-5 my-2 px-2 rounded-md border border-black' style={{ backgroundColor: color }} onClick={() => window.location.reload()}>  <AiOutlineReload className='inline my-1' /> Reload/Stop</button>
            </div>

            <BubbleSort />
            <InsertionSort />
            <MergeSort />
            <QuickSort />
            <SelectionSort />
        </div>
    )
}

export default Visuals;