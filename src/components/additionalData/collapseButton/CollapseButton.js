import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../../../assets/styles/collapse.css";
import { selectAdditionalDataCollapsedState, updateAdditionalDataCollapsedState } from "./collapsedSlice";

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
        <FaAngleUp className={`collapsed-btn large ${!additionalDataIsCollapsed ? "hidden" : ""}`} />
        <FaAngleDown className={`expanded-btn large ${additionalDataIsCollapsed ? "hidden" : ""}`} />
      </button>
    </div>
  );
};

export default CollapseButton;
