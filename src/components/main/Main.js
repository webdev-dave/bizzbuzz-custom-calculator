import AdditionalData from "../additionalData/AdditionalData";
import Input from "../input/Input";
import Results from "../results/Results";
import TestForm from "./testingArea/TestForm";

const Main = () => {
    const testArr = ["","","","",""]
    return (
        <main>
            <Input />
            <Results />
            <AdditionalData/>
            {testArr.map((input, i)=> {
                return <TestForm/>
            })}
            
        </main>
    )
}

export default Main;