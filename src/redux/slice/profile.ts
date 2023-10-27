import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: {},
    membership: {},
    persentaseHarga: 0,
    transaksi: {},
    webstore: {},
  },
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setMembership: (state, action) => {
      state.membership = action.payload;
    },
    setPersentaseHarga: (state, action) => {
      state.persentaseHarga = action.payload;
    },
    setTransaksi: (state, action) => {
      state.transaksi = action.payload;
    },
    setWebstore: (state, action) => {
      state.webstore = action.payload;
    },
  },
});

export const {
  setProfile,
  setMembership,
  setTransaksi,
  setPersentaseHarga,
  setWebstore,
} = profileSlice.actions;

export default profileSlice.reducer;
