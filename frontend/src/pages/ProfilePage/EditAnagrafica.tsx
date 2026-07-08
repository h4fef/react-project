import type { UserModel } from "../../models/UserModel.ts";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { editProfile } from "../../services/AuthService";
import { notyf } from "../../components/toastr/Notyf.ts";
import { useAuth } from "../../context/AuthCtxt.tsx";
import Flatpickr from "react-flatpickr";
const EditAnagrafica = ({
  userData,
  canSubmit,
}: {
  userData: UserModel;
  canSubmit?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>();
  const { refreshUser } = useAuth();
  const onEdit: SubmitHandler<UserModel> = async (data) => {
    try {
      const response = await editProfile(data);
      if (response?.status == 200) {
        notyf.success("Profilo modificato con successo!");
        await refreshUser();
      }
    } catch (e: any) {
      const error = e?.response?.data;
      notyf.error(error.message);
    }
  };
  // submit programmatically
  useEffect(() => {
    if (canSubmit) {
      handleSubmit(onEdit)();
    }
  }, [canSubmit, handleSubmit]);

  // nome, cognome, data nascita, telefono, indirizzo, citta
  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onEdit)}>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="w-96">
            <label
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditName"
            >
              Nome
            </label>
            <input
              type="text"
              defaultValue={userData!.name}
              className="input"
              id="inputEditName"
              {...(register("name"), { required: true })}
            />
            {errors.name && (
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
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditSurname"
            >
              Cognome
            </label>
            <input
              type="text"
              defaultValue={userData!.surname}
              className="input"
              id="inputEditSurname"
              {...(register("surname"), { required: true })}
            />
            {errors.surname && (
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
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditDate"
            >
              Data di Nascita
            </label>
            <input
              type="text"
              defaultValue={userData!.birthDate}
              className="input"
              id="inputEditDate"
              {...(register("birthDate"), { required: true })}
            />
            {/* <Flatpickr
              data-enable-time
              value={userData!.birthDate}
              onChange={([date]) => {
                console.log(date);
              }}
            /> */}
            {errors.birthDate && (
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
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditTelefono"
            >
              Telefono/Cellulare
            </label>
            <input
              type="text"
              defaultValue={userData!.phone}
              className="input"
              id="inputEditTelefono"
              {...register("phone")}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col">
          <div className="w-96">
            <label
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditAddress"
            >
              Indirizzo
            </label>
            <input
              type="search"
              defaultValue={userData!.address}
              className="input"
              id="inputEditAddress"
              {...register("address")}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="w-96">
            <label
              className="label-text text-base! text-gray-700"
              htmlFor="inputEditCity"
            >
              Città
            </label>
            <input
              type="text"
              defaultValue={userData!.city}
              className="input"
              id="inputEditCity"
              {...register("city")}
              readOnly
            />
          </div>
        </div>
      </div>
    </form>
  );
};
export default EditAnagrafica;
