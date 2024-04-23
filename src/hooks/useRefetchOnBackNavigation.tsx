import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRefetchOnBackNavigation = (refetch: any) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      refetch();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [refetch, navigate]);
};

export default useRefetchOnBackNavigation;
