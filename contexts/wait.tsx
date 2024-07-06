import { usePageLoading } from "@/hooks/usePageLoading";
import { FunctionComponent, useState } from "react";
import { createContext } from "react";

const WaitContext = createContext({
    isWaiting: false,
    isPageLoading: false,
    showWaiting: function (msg: string) {},
    hideWaiting: function () {},
});
type OverlayProps = React.HTMLAttributes<HTMLButtonElement> & {
    // isPageLoading: boolean;
};

function OverlayProvider({ children }: OverlayProps) {
    const [isWaiting, setIsWaiting] = useState(false);
    const [waitMsg, setWaitMsg] = useState("");
    const { isPageLoading } = usePageLoading();
    const waitData = {
        isWaiting,
        waitMsg,
        isPageLoading,
        showWaiting: (msg: string) => {
            setIsWaiting(true);
            setWaitMsg(msg);
        },
        hideWaiting: () => {
            setIsWaiting(false);
        },
    };
    return (
        <WaitContext.Provider value={waitData}>{children}</WaitContext.Provider>
    );
}
export { OverlayProvider };
export default WaitContext;
