import * as React from "react";

export type ProtectedRouteProps = {
    user: string | null;
    redirectPath?: string;
    children?: React.ReactNode;
}