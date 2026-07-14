import type { UserModel } from "@/models/UserModel";
import type { Dispatch, SetStateAction } from "react";

export type EditProps = {
    userData: UserModel;
    isEditOpen: boolean;
    canSubmit?: boolean;
    setEditOpen: Dispatch<SetStateAction<boolean>>;

}