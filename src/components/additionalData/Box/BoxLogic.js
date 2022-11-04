import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
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
        <div key={"box-logic" + i} className="additional-data-text-container">
          <p>
            size: <br className="mobile-text-break" />
            <span className="colored-text">{boxSizeKey.slice(8)}</span>
          </p>
          <p>
            cost pb: <br className="mobile-text-break" />
            <span className="colored-text">
              {currentBoxDataObj[boxSizeKey].boxPrice}
            </span>
          </p>
          <p>
            count: <br className="mobile-text-break" />
            <span className="colored-text">
             {formatToFourthDecimalPlace(currentBoxDataObj[boxSizeKey].boxCount)}
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
