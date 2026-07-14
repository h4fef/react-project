import { useForm, type SubmitHandler } from "react-hook-form";
import type { EditProps } from "./EditProps";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/tailgrids/core/dialog";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary";
import { useAuth } from "@/context/AuthCtxt";
import { notyf } from "@/components/toastr/Notyf";
import { editPsw } from "../../services/AuthService.ts";
import type { ChangePswType } from "./ChangePswType.ts";

export const EditPsw = ({ isEditOpen, setEditOpen, canSubmit }: EditProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePswType>();
  const { refreshUser } = useAuth();
  const onEdit: SubmitHandler<ChangePswType> = async (data) => {
    try {
      const response = await editPsw(data);
      if (response?.status == 200) {
        notyf.success("Password modificata con successo!");
        await refreshUser();
      }
    } catch (e: any) {
      const error = e?.response?.data;
      notyf.error(error.message);
    }
  };
  return (
    <Backdrop isOpen={isEditOpen} onOpenChange={setEditOpen} className="z-80">
      <Dialog className="w-full! max-w-220!">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            Cambia password
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onEdit)}>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <div className="w-96">
                  <label
                    className="input-label text-base! mb-2"
                    htmlFor="currentPsw"
                  >
                    Password attuale
                  </label>
                  <input
                    type="password"
                    className="input-field"
                    id="currentPsw"
                    {...register("currentPassword", { required: true })}
                  />
                  {errors.currentPassword && (
                    <div className="text-start w-96">
                      <span className="helper-text text-error">
                        Il campo è obbligatorio.
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-96">
                  <label
                    className="input-label text-base! mb-2"
                    htmlFor="newPsw"
                  >
                    Nuova password
                  </label>
                  <input
                    type="password"
                    className="input-field"
                    id="newPsw"
                    {...register("newPassword", { required: true })}
                  />
                  {errors.newPassword && (
                    <div className="text-start w-96">
                      <span className="helper-text text-error">
                        Il campo è obbligatorio.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <div className="w-96">
                  <label
                    className="input-label text-base! mb-2"
                    htmlFor="confirmPsw"
                  >
                    Conferma password
                  </label>
                  <input
                    type="password"
                    className="input-field"
                    id="confirmPsw"
                    {...register("confirmPassword", { required: true })}
                  />
                  {errors.confirmPassword && (
                    <div className="text-start w-96">
                      <span className="helper-text text-error">
                        Il campo è obbligatorio.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose
                type="button"
                appearance="outline"
                className="border border-gray-50 rounded-sm py-2.5 px-2 text-gray-400"
              >
                Chiudi
              </DialogClose>
              <ButtonPrimary type="submit" action="Conferma" />
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Backdrop>
  );
};
