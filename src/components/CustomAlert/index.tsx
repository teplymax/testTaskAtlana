//----------------------Basic imports------------------
import React from "react";

//---------------------Libraries-----------------------
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//---------------------Hooks----------------------------
import { useTypedSelector } from "../../hooks";

const CustomAlert: React.FC = () => {
  const { message, show } = useTypedSelector((state) => state.alertReducer);

  React.useEffect(() => {
    if (message && message.trim() !== "") toast(message);
  }, [show]);
  return <ToastContainer newestOnTop />;
};

export default CustomAlert;
