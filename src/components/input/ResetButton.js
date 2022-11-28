import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keyCodes } from "../../utils/helpers/helperObjects";
import {
  resetAllValues,
  updateBoxData,
  updateNetUnitCost,
} from "../main/mainSlice";

const ResetButton = ({ id, columnIndex }) => {
  const dispatch = useDispatch();
  const qKeyCode = keyCodes.q;

  const handleReset = () => {
    dispatch(resetAllValues({}));
    dispatch(updateBoxData({}));
    dispatch(updateNetUnitCost({}));
  };

  const handleClick =(e)=>{
    e.preventDefault();
    handleReset();
  }

  const keyDownHandler = (e)=>{
    if(e.ctrlKey && e.keyCode === qKeyCode){
      //window.alert("reset")
      handleReset();
    }
   }


  useEffect(()=>{
   document.addEventListener("keydown", keyDownHandler);
   return () => {
    document.removeEventListener("keydown", keyDownHandler);
  };
  })


  return (
    <button className="reset-btn btn" onClick={handleClick}>
      Reset
    </button>
  );
};

export default ResetButton;
