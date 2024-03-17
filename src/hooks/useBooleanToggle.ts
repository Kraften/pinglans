import { useState, useCallback } from "react";

const useBooleanToggle = (initialState: boolean) => {
  const [isToggled, setIsToggled] = useState(initialState);

  const toggle = useCallback(
    () => setIsToggled((state) => !state),
    [setIsToggled]
  );

  return [isToggled, toggle];
};

export default useBooleanToggle;
