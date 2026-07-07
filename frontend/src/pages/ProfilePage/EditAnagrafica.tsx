import type {UserModel} from "../../models/UserModel.ts";
import {type SubmitHandler, useForm} from "react-hook-form";

const EditAnagrafica = ({userData}: { userData: UserModel }) => {
    const {register, handleSubmit} = useForm<UserModel>();
    const onEdit: SubmitHandler<UserModel> = (data) => console.log(data);
    // nome, cognome, data nascita, telefono, indirizzo, citta
    return <form className="flex flex-col gap-6" onSubmit={handleSubmit(onEdit)}>
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
                        {...register("name")}
                    />
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
                        {...register("surname")}
                    />
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
                        type="date"
                        defaultValue={userData!.birthDate}
                        className="input"
                        id="inputEditDate"
                        {...register("birthDate")}
                    />
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
}
export default EditAnagrafica;