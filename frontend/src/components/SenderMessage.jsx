import React from "react";
import dp from '../../public/download.jpeg'
import { useRef } from "react";
import { useEffect } from "react";

function SenderMessage(props) {
  const scroll = useRef()
  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [props.message,props.image]);
  return (
    <div
      ref={scroll}
      className="mt-[10px] gap-[10px] flex flex-col shadow-gray-400 shadow-lg w-fit max-w-[500px] px-[10px] py-[5px] bg-[rgb(23,151,194)] relative right-0 ml-auto text-white text-[19px] rounded-tr-none rounded-2xl "
    >
      {props.image && (
        <img src={props.image} alt="" className="w-[100px] rounded-lg" />
      )}
      <span>{props.message}</span>
    </div>
  );
}

export default SenderMessage;
