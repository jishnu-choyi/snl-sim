import { useState } from "react";
import { createContext } from "react";
import { T_gamePrep, T_snlSimInput, T_snlSimOutput } from "./snlTypes";

const dummyActiveFoldSlug = undefined;
export type T_snlSimContext = {
    isSimRunning: boolean; //Currently 3D edits or camera change is happening
    setIsSimRunning: (value: boolean) => void;
    gamePrep?: T_gamePrep;
    setGamePrep: (value: T_gamePrep | undefined) => void;
    output?: T_snlSimOutput;
    setOutput: (value: T_snlSimOutput | undefined) => void;
    input?: T_snlSimInput;
    setInput: (value: T_snlSimInput | undefined) => void;
};
const defaultValue: T_snlSimContext = {
    isSimRunning: false,
    setIsSimRunning: function (value: boolean) {},
    gamePrep: undefined,
    setGamePrep: function (value: T_gamePrep | undefined) {},
    output: undefined,
    setOutput: function (value: T_snlSimOutput | undefined) {},
    input: undefined,
    setInput: function (value: T_snlSimInput | undefined) {},
};
const SNLSimContext = createContext(defaultValue);
type SNLSimProviderProps = React.HTMLAttributes<HTMLButtonElement> & {};

function SNLSimProvider({ children }: SNLSimProviderProps) {
    const [isSimRunning, setIsSimRunning] = useState(false);
    const [gamePrep, setGamePrep] = useState<T_gamePrep | undefined>(undefined);
    const [output, setOutput] = useState<T_snlSimOutput | undefined>(undefined);
    const [input, setInput] = useState<T_snlSimInput | undefined>(undefined);

    const snlSimData: T_snlSimContext = {
        isSimRunning,
        setIsSimRunning,
        gamePrep,
        setGamePrep,
        output,
        setOutput,
        input,
        setInput,
    };
    return (
        <SNLSimContext.Provider value={snlSimData}>
            {children}
        </SNLSimContext.Provider>
    );
}
export { SNLSimProvider };
export default SNLSimContext;
