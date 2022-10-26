import { useSelector } from "react-redux";
import { selectBoxConfiguration } from "../../main/mainSlice";
import { selectQuantity } from "../../main/mainSlice";

const BoxLogic = ({ id, columnIndex }) => {
  const quantitiesArr = useSelector(selectQuantity);
  const boxDataObj = useSelector(selectBoxConfiguration);
  const currentQty = quantitiesArr[columnIndex];
  const currentBoxDataObj =
    boxDataObj["orderQty_" + currentQty] &&
    boxDataObj["orderQty_" + currentQty];
  const currentBoxSizesArr =
    currentBoxDataObj &&
    Object.keys(currentBoxDataObj).filter(
      (key) => key !== "totalBoxCost" && key !== "totalBoxCount"
    );


  const currentBoxData =
    currentBoxSizesArr &&
    currentBoxSizesArr.map((boxSizeKey, i) => {
      return (
        <div key={"box-logic" + i} className="additional-data-text-container mobile-text">
          <p>
            <span>size: </span>
            <span className="colored-text mobile-text">{boxSizeKey.slice(8)}</span>
          </p>
          <p>
            <span>cost pb: </span>
            <span className="colored-text">
              {currentBoxDataObj[boxSizeKey].boxPrice}
            </span>
          </p>
          <p>
            <span>count: </span>
            <span className="colored-text">
             {currentBoxDataObj[boxSizeKey].boxCount}
            </span>
          </p>
        </div>
      );
    });
  return (
    <div className="grid-child box-logic" id={id}>
      {currentBoxData}   
    </div>
  );
};

export default BoxLogic;
