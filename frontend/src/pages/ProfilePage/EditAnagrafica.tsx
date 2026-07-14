import type { UserModel } from "../../models/UserModel.ts";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, type ChangeEventHandler } from "react";
import { editProfile, searchAddress } from "../../services/AuthService.ts";
import { notyf } from "../../components/toastr/Notyf.ts";
import { useAuth } from "../../context/AuthCtxt.tsx";
import {
  Combobox,
  ComboboxInputWrapper,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxLabel,
} from "@/core/combobox/combobox.tsx";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from "@/components/tailgrids/core/dialog";
import { Button } from "@/components/tailgrids/core/button.tsx";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary.tsx";
const EditAnagrafica = ({
  userData,
  canSubmit,
  isEditOpen,
  setEditOpen,
}: {
  userData: UserModel;
  isEditOpen: boolean;
  canSubmit?: boolean;
  setEditOpen: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UserModel>({
    defaultValues: {
      name: userData.name,
      surname: userData.surname,
      birthDate: userData.birthDate,
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
    },
  });
  const { refreshUser } = useAuth();
  const [inputAddress, setSearchAddress] = useState(userData.address ?? "");
  const [addresses, setAddresses] = useState<any>([]);
  const onEdit: SubmitHandler<UserModel> = async (data) => {
    try {
      console.log(data);
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

  //search address
  const searchAddressApi = async (search: string) => {
    if (search.length < 3) return;
    try {
      const res = await searchAddress(search);
      setAddresses(res.data);
      console.log(res);
    } catch (e: any) {
      const error = e?.response?.data;
      notyf.error(error.message);
    }
  };

  useEffect(() => {
    searchAddressApi(inputAddress);
  }, [inputAddress]);

  // nome, cognome, data nascita, telefono, indirizzo, citta
  return (
    <Backdrop isOpen={isEditOpen} onOpenChange={setEditOpen} className="z-80">
      <Dialog className="w-full! max-w-220!">
        <DialogHeader>
          <DialogTitle className="text-xl text-gray-800">
            Modifica dati anagrafici
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <form className="flex flex-col gap-6" onSubmit={handleSubmit(onEdit)}>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <div className="w-96">
                  <label
                    className="input-label text-base! mb-2"
                    htmlFor="inputEditName"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    defaultValue={userData!.name}
                    className="input-field"
                    id="inputEditName"
                    {...register("name", { required: true })}
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
                    className="input-label text-base! mb-2"
                    htmlFor="inputEditSurname"
                  >
                    Cognome
                  </label>
                  <input
                    type="text"
                    defaultValue={userData!.surname}
                    className="input-field"
                    id="inputEditSurname"
                    {...register("surname", { required: true })}
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
                    className="input-label text-base! mb-2"
                    htmlFor="inputEditDate"
                  >
                    Data di Nascita
                  </label>
                  <input
                    type="date"
                    defaultValue={userData!.birthDate}
                    className="input-field"
                    id="inputEditDate"
                    {...register("birthDate", { required: true })}
                  />
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
                    className="input-label text-base! mb-2"
                    htmlFor="inputEditTelefono"
                  >
                    Telefono/Cellulare
                  </label>
                  <input
                    type="text"
                    defaultValue={userData!.phone}
                    className="input-field"
                    id="inputEditTelefono"
                    {...register("phone")}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <div className="w-96">
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Combobox value={field.value ?? ""}>
                        <ComboboxLabel className="input-label text-base!">
                          Indirizzo
                        </ComboboxLabel>
                        <ComboboxInputWrapper className="border-0!">
                          <ComboboxInput
                            type="search"
                            autoComplete="off"
                            placeholder="Cerca indirizzo"
                            className="input-field"
                            value={inputAddress}
                            onChange={(event) => {
                              const value = event.target.value;
                              setSearchAddress(value);
                              //aggiorna il form durante la scrittura
                              field.onChange(value);
                            }}
                          />
                        </ComboboxInputWrapper>
                        <ComboboxContent>
                          <ComboboxList>
                            {addresses?.map((address, i) => (
                              <ComboboxItem
                                id={`address-${i}`}
                                key={`${address.label}-${i}`}
                                onClick={() => {
                                  //aggiorna campo react hook form
                                  field.onChange(address.label);
                                  //aggiornamento input
                                  setSearchAddress(address.label);
                                  //aggiornamento city
                                  setValue("city", address.city ?? "", {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  });
                                }}
                              >
                                {address.label}
                              </ComboboxItem>
                            ))}
                          </ComboboxList>
                          <ComboboxEmpty>Nessun risultato</ComboboxEmpty>
                        </ComboboxContent>
                      </Combobox>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="w-96">
                  <label
                    className="input-label text-base! mb-2"
                    htmlFor="inputEditCity"
                  >
                    Città
                  </label>
                  <input
                    type="text"
                    defaultValue={userData!.city}
                    className="input-field"
                    id="inputEditCity"
                    {...register("city")}
                    readOnly
                  />
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
export default EditAnagrafica;
