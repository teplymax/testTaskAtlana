import { RootState } from "./../redux/reducers/rootReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
