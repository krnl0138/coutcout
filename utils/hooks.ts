import { useEffect, useRef, useState } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/**
 * Attach click listener on document on mount, fires cb when clicked not on itself.
 * One should attach returned ref to a component.
 * NB one may need to use 'e.stopPropagation()' on a parent element to allow
 * closing a dropdown menu, for example. Otherwise it will be considered as
 * a part of the document.
 */
export const useOutsideClick = (cb: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        cb();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [cb]);

  return ref;
};

export const useShowErrors = (errors: string[]) => {
  const [showErrors, setShowErrors] = useState(true);
  const handleShowErrors = (bool: boolean) => setShowErrors(bool);
  useEffect(() => {
    if (errors.length === 0) return;
    setTimeout(() => setShowErrors(false), 3000);
  }, [errors]);
  return { showErrors, handleShowErrors };
};
