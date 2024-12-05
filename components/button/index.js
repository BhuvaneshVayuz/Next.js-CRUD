"use client";

import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useDispatch } from "react-redux";

export default function Button({route , name , functionToDispatch , params}){
    const router = useRouter();
    const dispatch = useDispatch()
    const goToRoute = () => router.push(route);
return <>
<button
          onClick={ ()=>{
            if(functionToDispatch){
              let functionTemp = functionToDispatch()
              if(params){
                dispatch(functionTemp(params))
              } else{
                dispatch(functionTemp())
              }
            }else{
              goToRoute()
            }
          }
        }
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Go to {name}
        </button>
</>
}