import Heading from "./Heading";
import Sticky from "./Sticky";
import HeadingTabs from "./HeadingTabs";
import Chart from "./Chart";
function ModelExplainability(){
    return(
        <>
        <Sticky/>
        <Heading showLogin={false} />
        <HeadingTabs showChart={true} />
        <Chart/>
        </>
    )
}
export default ModelExplainability;