import MouseTracker from "./components/MouseTracker";
import SearchBox from "./components/SerachBox";
import CheckBoxTree from "./components/ChecBoxTree";
import EventBus from "./EventBus";
import ToastProvider from "./ToastProvider";
import { checkBoxData } from "./data/checkBoxData";
import NestedComment from "./components/NestedComment";
import commentData from "./data/comments.json";

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
      <CheckBoxTree />
      <ToastProvider />
      <button onClick={addToast}>Add Toast</button>
      <button onClick={updateToast}>Update Toast</button>
      <button onClick={deleteToast}>Delete Toast</button>
      <CheckBoxTree data={checkBoxData}/>
      <h1>Nested Comment System</h1>
      <NestedComment comments={commentData} onSubmit={() => {}} onEdit={() => {}} onDelete={() => {}} onUpVote={() => {}} onDownVote={() => {}}/>
    </>
  );
};
export default App;
