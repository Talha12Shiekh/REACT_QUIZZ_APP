import React from "react";
import "./quixBox.css";
import { createPortal } from "react-dom";

const SecondModal = ({ children, isOpen }) => {
  if (!isOpen) return;
  return createPortal(
    <div className="modal">{children}</div>,
    document.getElementById("modal")
  );
};

export default SecondModal;
