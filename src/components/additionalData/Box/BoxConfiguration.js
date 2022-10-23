import { useSelector } from "react-redux";
import { selectBoxConfiguration } from "../../main/mainSlice";
import { selectQuantity } from "../../main/mainSlice";

const BoxConfiguration = ({ id, columnIndex }) => {
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
        <div key={"box-size" + i} className="additional-data-text-container">
          <p>
            box size:{" "}
            <span className="colored-text">&nbsp;{boxSizeKey.slice(8)}</span>
          </p>
          <p>
            {" "}
            boxes req:{" "}
            <span className="colored-text">
              &nbsp;{currentBoxDataObj[boxSizeKey].boxCount}
            </span>
          </p>
          <p>
            cost pb:{" "}
            <span className="colored-text">
              &nbsp;&nbsp;{currentBoxDataObj[boxSizeKey].boxPrice}
            </span>
          </p>
        </div>
      );
    });
  return (
    <div className="grid-child box-configuration" id={id}>
      {currentBoxData}   
    </div>
  );
};

export default BoxConfiguration;
