import { useEffect } from "react";

/**
 * Custom hook to detect clicks outside a given element (except a specific element by ID)
 * @param {React.RefObject} ref - The ref of the element to detect outside clicks from
 * @param {string} exceptionId - ID of the element to exclude from outside detection
 * @param {Function} cb - Callback function to run when an outside click is detected
 */
function useOutsideClick(ref, exceptionId, cb) {
  useEffect(() => {
    function handleOutsideClick(event) {
      // If ref is valid and the click is outside the ref and not on the exception element
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        event.target.id !== exceptionId
      ) {
        cb();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
  }, [cb]);
}
export default useOutsideClick;
