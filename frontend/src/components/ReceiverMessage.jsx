import React from "react";
import dp from "../../public/download.jpeg";
import { useRef } from "react";
import { useEffect } from "react";

function ReceiverMessage(props) {
  const scroll = useRef()
    useEffect(() => {
      if (scroll.current) {
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [props.message,props.image]);
  return (
    <div
      ref={scroll}
      className="gap-[10px] mt-[10px] flex flex-col shadow-gray-400 shadow-lg w-fit max-w-[500px] px-[10px] py-[5px] bg-[rgb(56,205,255)] relative left-0 text-white text-[19px] rounded-tl-none rounded-2xl "
    >
      {props.image && (
        <img src={props.image} alt="" className="w-[100px] rounded-lg" />
      )}
      <span>{props.message}</span>
    </div>
  );
}

export default ReceiverMessage;
