import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Thông tin học sinh
          </span>
        </div>
      </nav>
    );
  }
}
