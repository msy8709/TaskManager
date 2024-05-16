import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";
import { useSelector } from "react-redux";

const store = configureStore({
    reducer
})


const dispatch = useDispatch();


type RootState = ReturnType<typeof store.getState>
const logger = useSelector((state: RootState) => state.logger)
export default store;