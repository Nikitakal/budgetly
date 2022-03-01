import { useEffect, useState } from "react";

export default function useLocalStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    //We can pass a function to useState so we need to check to account for both scenarios
    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });
  //Whenever the value changes we're going to be updating our local storage with a JSON version of that value
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
