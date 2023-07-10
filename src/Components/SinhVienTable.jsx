import React, { Component } from "react";

import { connect } from "react-redux";

class SinhVienTable extends Component {
  filterByInput = (e) => {
    let input = e.target.value;
    this.props.filterByValue(input);
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log("componentDidUpdate");
    // console.log(prevProps);
    // console.log(this.props);
    // if the prevetProps sinhVienArr is not equal to current sinhVienArr, then run the filterByValue method again
    if (prevProps.sinhVien.sinhVienArr !== this.props.sinhVien.sinhVienArr) {
      // console.log("sinhVienArr changed");
      this.props.filterByValue();
    }
  }

  render() {
    // console.log(this.props);
    console.log("all students:");
    console.log(this.props.sinhVien.sinhVienArr);
    let sinhVien = this.props.sinhVien.filteredSinhVien;
    console.log("filtered students: ");
    console.log(sinhVien);

    return (
      <div className="relative overflow-x-auto">
        {/* filter input box */}
        <div
          className="control flex flex-row border-gray-200 bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 rounded-md py-2"
          style={{ minWidth: "300px" }}
        >
          <label className="label text-center">Filter by name</label>
          <input
            onChange={(e) => {
              //call this method on every change in input
              this.filterByInput(e);
            }}
            style={{ width: "100%" }}
            placeholder="Enter name of student"
            type="text"
            className="py-3 outline-2 bg-slate-500 text-white rounded-md focus:border-transparent focus:outline-none px-4 mr-2"
          />
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Mã SV
              </th>
              <th scope="col" className="px-6 py-3">
                Họ tên
              </th>
              <th scope="col" className="px-6 py-3">
                Số điện thoại
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {sinhVien.map((sinhVien, index) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {sinhVien.maSV}
                  </th>
                  <td className="px-6 py-4">{sinhVien.hoTen}</td>
                  <td className="px-6 py-4">{sinhVien.sdt} </td>
                  <td className="px-6 py-4">{sinhVien.email}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        this.props.xoaSinhVien(sinhVien);
                      }}
                      type="button"
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Xoa
                    </button>

                    <button
                      onClick={() => {
                        // this.props.changeActive();
                        this.props.laySinhVien(sinhVien);
                      }}
                      type="button"
                      className="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                    >
                      Sua
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapsStateToProps = (state) => {
  return {
    sinhVien: state.sinhVien,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    themSinhVien: (sinhVien) => {
      const action = {
        type: "THEM_SINH_VIEN",
        payload: sinhVien,
      };
      dispatch(action);
    },

    laySinhVien: (sinhVien) => {
      const action = {
        type: "LAY_SINH_VIEN",
        payload: sinhVien,
      };
      dispatch(action);
    },

    suaSinhVien: (sinhVien) => {
      const action = {
        type: "SUA_SINH_VIEN",
        payload: sinhVien,
      };
      dispatch(action);
    },

    xoaSinhVien: (sinhVien) => {
      const action = {
        type: "XOA_SINH_VIEN",
        payload: sinhVien,
      };
      dispatch(action);
    },

    filterByValue: (sinhVien) => {
      const action = {
        type: "FILTER_BY_VALUE",
        payload: sinhVien,
      };
      dispatch(action);
    },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(SinhVienTable);
