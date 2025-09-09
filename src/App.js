import MouseTracker from "./components/MouseTracker";
import SearchBox from "./components/SerachBox";
import EventBus from "./EventBus";
import ToastProvider from "./ToastProvider";

const App = () => {
  const addToast = () => {
    EventBus.emit("showToast", { message: "Toast added", type: "success" });
  };
  const deleteToast = () => {
    EventBus.emit("showToast", { message: "Toast Deleted", type: "error" });
  };
  const updateToast = () => {
    EventBus.emit("showToast", { message: "Update Toast", type: "info" });
  };
  return (
    <>
      <SearchBox />
      <MouseTracker />
      <ToastProvider />
      <button onClick={addToast}>Add Toast</button>
      <button onClick={updateToast}>Update Toast</button>
      <button onClick={deleteToast}>Delete Toast</button>
    </>
  );
};
export default App;
