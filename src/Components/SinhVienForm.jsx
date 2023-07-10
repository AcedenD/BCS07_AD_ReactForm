import React, { Component } from "react";
import Header from "./Header";
import SinhVienTable from "./SinhVienTable";

import { connect } from "react-redux";

class SinhVienForm extends Component {
  state = {
    sinhVienState: { ...this.props.sinhVien.sinhVien },

    errorState: {
      maSV: "",
      hoTen: "",
      sdt: "",
      email: "",
    },

    isActive: true,

    isActiveCapNhat: false,
  };

  changeActiveButton = () => {
    console.log("current active : " + this.state.isActive);
    const newActive = !this.state.isActive;
    console.log("new active : " + newActive);

    this.setState({
      isActive: newActive,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps.hocSinh.sinhVien.maSV);
    // console.log(this.props.hocSinh.sinhVien.maSV);

    if (
      prevProps.sinhVien.sinhVien.maSV !== this.props.sinhVien.sinhVien.maSV
    ) {
      this.setState({
        sinhVienState: { ...this.props.sinhVien.sinhVien },
      });
    }
  }

  getValuesInput = (event) => {
    let { id, value } = event.target;
    // console.log(id, value);

    let newSinhVienState = { ...this.state.sinhVienState };
    newSinhVienState[id] = value;
    let newErrorState = { ...this.state.errorState };

    // validation
    // let errorMessage = "";
    if (newSinhVienState[id] == "") {
      newErrorState[id] = "Không được bỏ trống";
    } else {
      newErrorState[id] = "";

      switch (id) {
        case "maSV":
          {
            let regex = /^[0-9]{4}$/i;
            if (!regex.test(newSinhVienState[id])) {
              newErrorState[id] = "Mã SV chỉ được nhập 4 chữ số";
            }
          }
          break;
        case "hoTen":
          {
            let regex = /^[a-z A-Z]+$/i;
            if (!regex.test(newSinhVienState[id])) {
              newErrorState[id] = "Họ tên chỉ được nhập chữ";
            }
          }
          break;
        case "sdt":
          {
            let regex = /^[0-9]{10}$/i;
            if (!regex.test(newSinhVienState[id])) {
              newErrorState[id] = "Số điện thoại phải là 10 chữ số";
            }
          }
          break;
        case "email":
          {
            let regex = /^[a-z0-9]+@[a-z]+\.[a-z]+$/i;
            if (!regex.test(newSinhVienState[id])) {
              newErrorState[id] = "Email không hợp lệ (example@gmail.com) ";
            }
          }
          break;
      }
    }

    // if (id == "maSV") {
    //   let regex = /^[0-9]{4}$/i;
    //   if (!regex.test(value)) {
    //     // console.log("Mã SV không hợp lệ");
    //     let errorMessage = "Mã SV chỉ được nhập 4 chữ số";
    //     newErrorState[id] = errorMessage;
    //   }
    // } else if (id == "hoTen") {
    //   let regex = /^[a-z A-Z]+$/i;
    //   if (!regex.test(value)) {
    //     // console.log("Họ tên không hợp lệ");
    //     let errorMessage = "Họ tên chỉ được nhập chữ";
    //     newErrorState[id] = errorMessage;
    //   }
    // } else if (id == "sdt") {
    //   let regex = /^[0-9]{10}$/i;
    //   if (!regex.test(value)) {
    //     // console.log("Số điện thoại không hợp lệ");
    //     let errorMessage = "Số điện thoại phải là 10 chữ số";
    //     newErrorState[id] = errorMessage;
    //   }
    // } else if (id == "email") {
    //   let regex = /^[a-z0-9]+@[a-z]+\.[a-z]+$/i;
    //   if (!regex.test(value)) {
    //     // console.log("Email không hợp lệ");
    //     let errorMessage = "Email không hợp lệ (example@gmail.com)";
    //     newErrorState[id] = errorMessage;
    //   }
    // }

    // let newSinhVienState = { ...this.state.sinhVienState, [id]: value };
    // let newErrorState = { ...this.state.errorState, [id]: errorMessage };
    // console.log(newErrorState);

    let valid = false;
    for (let item in newErrorState) {
      if (
        this.state.errorState[item] !== "" ||
        this.state.sinhVienState[item] == ""
      ) {
        // console.log(this.state.errorState[item]);
        valid = true;
      }
    }

    // console.log(valid);

    this.setState({
      sinhVienState: newSinhVienState,
      errorState: newErrorState,
      isActive: valid,
      isActiveCapNhat: !valid,
    });
  };

  resetFields = () => {
    const newSinhVienState = { maSV: "", hoTen: "", sdt: "", email: "" };
    const newErrorState = { maSV: "", hoTen: "", sdt: "", email: "" };
    this.setState({
      ...this.state,
      sinhVienState: newSinhVienState,
      errorState: newErrorState,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.sinhVienState);
    let sinhVien = { ...this.state.sinhVienState };
    this.props.themSinhVien(sinhVien);
    this.resetFields();
  };
  render() {
    console.log(this.props.sinhVien.isEdit);
    return (
      <div className="container mx-auto">
        <Header />

        <form
          className="p-5 bg-slate-100"
          onSubmit={this.handleSubmit}
          id="SVForm"
        >
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={this.getValuesInput}
                type="text"
                id="maSV"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer 
                disabled:bg-gray-300 "
                placeholder=" "
                required
                value={this.state.sinhVienState.maSV}
                disabled={this.props.sinhVien.isEdit}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Mã SV
              </label>
              <p className="text-red-500">{this.state.errorState.maSV}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={this.getValuesInput}
                type="text"
                id="hoTen"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={this.state.sinhVienState.hoTen}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Họ tên
              </label>
              <p className="text-red-500">{this.state.errorState.hoTen}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={this.getValuesInput}
                type="text"
                name="floating_phone"
                id="sdt"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={this.state.sinhVienState.sdt}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Số điên thoại
              </label>
              <p className="text-red-500">{this.state.errorState.sdt}</p>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <input
                onChange={this.getValuesInput}
                type="text"
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={this.state.sinhVienState.email}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email
              </label>
              <p className="text-red-500">{this.state.errorState.email}</p>
            </div>
          </div>
          <button
            type="sumbit"
            className={`text-white bg-blue-700 hover:bg-blue-800 rounded-lg py-2.5 px-5 mx-2 disabled:cursor-not-allowed`}
            disabled={this.state.isActive}
          >
            Thêm sinh viên
          </button>
          <button
            onClick={() => {
              let sinhVien = { ...this.state.sinhVienState };
              this.props.suaSinhVien(sinhVien);
              this.changeActiveButton();
              this.resetFields();
              this.props.sinhVien.isEdit = false;
            }}
            type="button"
            className={`text-black bg-yellow-300 hover:bg-yellow-400 rounded-lg px-5 py-2.5 text-center disabled:cursor-not-allowed`}
            disabled={!this.state.isActiveCapNhat}
          >
            Cập nhật
          </button>
        </form>
        <div>
          <SinhVienTable changeActive={this.changeActiveButton} />
        </div>
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

    suaSinhVien: (sinhVien) => {
      const action = {
        type: "SUA_SINH_VIEN",
        payload: sinhVien,
      };
      dispatch(action);
    },

    // xoaSinhVien: (sinhVien) => {
    //   const action = {
    //     type: "XOA_SINH_VIEN",
    //     payload: sinhVien,
    //   };
    //   dispatch(action);
    // },
  };
};

export default connect(mapsStateToProps, mapDispatchToProps)(SinhVienForm);
