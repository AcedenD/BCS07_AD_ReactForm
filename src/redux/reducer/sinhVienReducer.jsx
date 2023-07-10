const initalState = {
  sinhVienArr: [
    {
      maSV: 1997,
      hoTen: "Aden Dang",
      sdt: "0123456789",
      email: "ad@gmail.com",
    },
  ],
  sinhVien: {
    maSV: "",
    hoTen: "",
    sdt: "",
    email: "",
  },

  isEdit: false,

  appliedFilters: [],

  filteredSinhVien: [
    {
      maSV: 1997,
      hoTen: "Aden Dang",
      sdt: "0123456789",
      email: "ad@gmail.com",
    },
  ],
};

export const sinhVienReducer = (state = initalState, action) => {
  switch (action.type) {
    case "THEM_SINH_VIEN":
      {
        // console.log(action.payload);
        return {
          ...state,
          sinhVienArr: [...state.sinhVienArr, action.payload],
        };
      }
      break;

    case "LAY_SINH_VIEN":
      {
        console.log("dang lay: " + action.payload.maSV);

        const newSinhVien = { ...action.payload };

        const newIsEdit = true;

        return { ...state, sinhVien: newSinhVien, isEdit: newIsEdit };
      }
      break;

    case "SUA_SINH_VIEN":
      {
        console.log("dang sua: " + action.payload.maSV);
        const index = state.sinhVienArr.findIndex(
          (sinhVien) => sinhVien.maSV === action.payload.maSV
        );

        const newSinhVienArr = [...state.sinhVienArr];

        if (index !== -1) {
          newSinhVienArr[index] = action.payload;
        }

        const newSinhVien = { maSV: "", hoTen: "", sdt: "", email: "" };

        const newIsEdit = false;

        return {
          ...state,
          sinhVienArr: newSinhVienArr,
          sinhVien: newSinhVien,
          isEdit: newIsEdit,
        };
      }
      break;
    case "XOA_SINH_VIEN":
      {
        console.log(action.payload.maSV);
        const index = state.sinhVienArr.findIndex(
          (sinhVien) => sinhVien.maSV === action.payload.maSV
        );

        const newSinhVienArr = [...state.sinhVienArr];

        if (index !== -1) {
          newSinhVienArr.splice(index, 1);
        }
        return { ...state, sinhVienArr: newSinhVienArr };
      }
      break;
    case "FILTER_BY_VALUE":
      {
        let newState = { ...state };
        // console.log(newState);
        let value = action.payload;
        // console.log(value);
        let filteredValues = state.sinhVienArr.filter((sinhVien) => {
          //return any sinhVien whose hoTen is the value
          return sinhVien.hoTen.toLowerCase().includes(value);
        });
        // console.log(filteredValues);

        let appliedFilters = [...state.appliedFilters];
        // console.log(appliedFilters);
        //if the value from the input box is not empty
        if (value) {
          //check if the filter already exists in the tracking array
          let index = appliedFilters.indexOf(value);
          console.log(index);
          if (index == -1)
            //if it doesn’t, add it.
            appliedFilters.push(value);

          console.log(appliedFilters);
          //change the filtered sinhVien to reflect the change
          newState.filteredSinhVien = filteredValues;
        } else {
          //if the value is empty, we can assume everything has been erased
          let index = appliedFilters.indexOf(value);
          //in that case, remove the current filter
          appliedFilters.splice(index, 1);
          if (appliedFilters.length == 0) {
            //if there are no filters applied, reset the sinhVien to normal.
            newState.filteredSinhVien = newState.sinhVienArr;
          }
        }
        return newState;
      }
      break;

    default:
      return { ...state };
  }
};
