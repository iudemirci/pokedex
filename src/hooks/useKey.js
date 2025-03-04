import { useEffect } from "react";

export function useKey(key, cb) {
  useEffect(() => {
    function handle(event) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        cb();
      }
    }
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, [cb, key]);
}
