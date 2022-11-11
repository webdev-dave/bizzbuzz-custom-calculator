import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/styles/collapse.css";
import { selectAdditionalDataCollapsedState, updateAdditionalDataCollapsedState } from "./collapseSlice";

const CollapseButton = () => {
  const dispatch = useDispatch();
  const additionalDataIsCollapsed = useSelector(selectAdditionalDataCollapsedState);


  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateAdditionalDataCollapsedState({value: additionalDataIsCollapsed ? false : true}))
  };
  return (
    <div className="btn-container">
      <button onClick={handleClick}>
        {additionalDataIsCollapsed ? <FaAngleUp className="collapsed-btn" /> : <FaAngleDown className="expanded-btn" />}
      </button>
    </div>
  );
};

export default CollapseButton;
