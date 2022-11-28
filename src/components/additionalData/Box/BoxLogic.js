import { useSelector } from "react-redux";
import { formatToFourthDecimalPlace } from "../../../utils/helpers/helperFunctions";
import { selectBoxConfiguration } from "../../main/mainSlice";
import { selectQuantities } from "../../main/mainSlice";

const BoxLogic = ({ id, columnIndex }) => {
  const quantitiesArr = useSelector(selectQuantities);
  const qty = quantitiesArr[columnIndex];
  const boxConfigurations = useSelector(selectBoxConfiguration);
  const currentBoxDataObj =
    boxConfigurations["orderQty_" + qty] &&
    boxConfigurations["orderQty_" + qty];

  const boxSizesInUseArr =
    currentBoxDataObj &&
    Object.keys(currentBoxDataObj).filter(
      (key) => key !== "totalBoxesCost" && key !== "totalBoxesCount" && key !== "isSolved"
    );


  const BoxDataInJsxFormat =
  boxSizesInUseArr &&
  boxSizesInUseArr.map((boxSizeKey, i) => {
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
            <span className="desktop">count:</span><span className="mobile">x:</span>&nbsp;
            <br className="box-count mobile-text-break" />
            <span className="colored-text">
              {formatToFourthDecimalPlace(
                currentBoxDataObj[boxSizeKey].boxCount
              )}
            </span>
          </p>
        </div>
      );
    });

  return (
    <div className="grid-child box-logic" id={id}>
      {BoxDataInJsxFormat}
    </div>
  );
};

export default BoxLogic;
