import { useEffect } from "react";
import { useLocation } from "react-router";

declare global {
    interface Window {
        HSStaticMethods?: {
            autoInit: (collection?: string[]) => void;
        };
    }
}

export function useFlyonuiInit() {
    const location = useLocation();
    useEffect(() => {
        const id = setTimeout(() => {
            window.HSStaticMethods?.autoInit();
        }, 0);
        return () => clearTimeout(id);
    }, [location.pathname]);
}