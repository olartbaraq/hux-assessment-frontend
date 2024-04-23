import { useEffect } from "react";

const useRefetchOnPageReload = (refetch: any) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refetch();
      }
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refetch]);
};

export default useRefetchOnPageReload;
