import React, { useEffect, useState } from "react";
import EventBus from "./EventBus";
import "./styles.css";
let toasdId = 0;
const ToastProvider = () => {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    EventBus.on("showToast", handleToast);
    return () => EventBus.off("showToast", handleToast);
  }, []);

  const handleToast = (data) => {
    const id = toasdId++;
    setToasts((prev) => [...prev, { ...data, id }]);

    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev?.filter((t) => t.id !== id));
  };
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          {t.message}
          <span>
            <button className="x-btn" onClick={() => removeToast(t.id)}>
              x
            </button>
          </span>
        </div>
      ))}
    </div>
  );
};
export default ToastProvider;
