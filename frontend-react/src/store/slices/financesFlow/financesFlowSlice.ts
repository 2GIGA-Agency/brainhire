import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Для переноса на вкладку "На оплату"
    isPaid: false,
}

export const financesFlowSlice = createSlice({
    name: "financesFlowSlice",
    initialState,
    reducers: {
        toggleIsPaid: (state) => {
            state.isPaid = !state.isPaid;
        }
    }
})

export const { toggleIsPaid } = financesFlowSlice.actions;

export const selectIsPaid = (state: RootState) => state.financesFlow.isPaid;

export default financesFlowSlice.reducer;
