import Card from "../../components/card/Card.tsx";
import PhUser from "/user.jpg";
import { useAuth } from "../../context/AuthCtxt.tsx";
import EditAnagrafica from "./EditAnagrafica.tsx";
import { useState } from "react";
import { formatDate } from "../../services/UtilityService.ts";
import { ButtonPrimary } from "@/components/buttons/ButtonPrimary.tsx";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditConfirmed, setEditConfirmed] = useState<boolean>(false);
  const [isEditOpen, setEditOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        card={{ title: "Profilo" }}
        actions={
          <>
            <ButtonPrimary
              action="Modifica anagrafica"
              doAction={() => {
                setEditOpen(true);
              }}
              type="button"
            />
            <ButtonPrimary
              action="Modifica immagine"
              doAction={() => console.log("clicked")}
              type="button"
            />
            <ButtonPrimary
              action="Cambia password"
              doAction={() => console.log("clicked")}
              type="button"
            />
          </>
        }
      >
        <div className="flex flex-col gap-6 w-fit">
          <div className="flex">
            <div className="d-avatar mb-2">
              <div className="w-32 rounded-full">
                <img src={user!.photo ?? PhUser} alt="Immagine profilo" />
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                {user!.role}
              </span>
            </div>
          </div>
          <h5 className="w-fit text-lg font-medium text-gray-800">
            Dati anagrafici
          </h5>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputName"
                >
                  Nome
                </label>
                <input
                  type="text"
                  placeholder={user!.name}
                  className="input-field"
                  id="inputName"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputSurname"
                >
                  Cognome
                </label>
                <input
                  type="text"
                  placeholder={user!.surname}
                  className="input-field"
                  id="inputSurname"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputDate"
                >
                  Data di nascita
                </label>
                <input
                  type="text"
                  placeholder={formatDate(user!.birthDate!) ?? "-"}
                  className="input-field"
                  id="inputDate"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputEmail"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder={user!.email}
                  className="input-field"
                  id="inputEmail"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputTel"
                >
                  Telefono/Cellulare
                </label>
                <input
                  type="tel"
                  placeholder={user!.phone ?? "-"}
                  className="input-field"
                  id="inputTel"
                  readOnly
                />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-96">
                <label
                  className="input-label text-base! mb-2"
                  htmlFor="inputAddress"
                >
                  Indirizzo
                </label>
                <input
                  type="text"
                  placeholder={user!.address ?? "-"}
                  className="input-field"
                  id="inputAddress"
                  readOnly
                />
              </div>
            </div>
          </div>
          <div className="w-96">
            <label className="input-label text-base! mb-2" htmlFor="inputCity">
              Città
            </label>
            <input
              type="text"
              placeholder={user!.city ?? "-"}
              className="input-field"
              id="inputCity"
              readOnly
            />
          </div>
        </div>
      </Card>
      <EditAnagrafica
        userData={user!}
        isEditOpen={isEditOpen}
        canSubmit={isEditConfirmed}
        setEditOpen={setEditOpen}
      />
    </>
  );
};

export default ProfilePage;
