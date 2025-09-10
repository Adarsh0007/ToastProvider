import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";

const SearchBox = () => {
  const [text, setText] = useState("");
  const debouncedText = useDebounce(text, 3000);
  console.log("Without Debounced Text", text);
  useEffect(() => {
    if (debouncedText) {
      console.log("Debounced Text", debouncedText);
    }
  }, [debouncedText]);
  return <input value={text} onChange={(e) => setText(e.target.value)} />;
};

export default SearchBox;
