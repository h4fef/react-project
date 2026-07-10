import Card from "../../components/card/Card.tsx";
import type { CardProps } from "../../models/CardModel.ts";
import PhUser from "/user.jpg";
import { useAuth } from "../../context/AuthCtxt.tsx";
import ModalComponent from "../../components/modals/ModalComponent.tsx";
import type { ModalProps } from "../../models/ModalProps.ts";
import EditAnagrafica from "./EditAnagrafica.tsx";
import { useState } from "react";
import { formatDate } from "../../services/UtilityService.ts";

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditConfirmed, setEditConfirmed] = useState<boolean>(false);
  const openModal = (id: string) => {
    document.getElementById(id)!.showModal();
  };
  const cardData: CardProps = {
    title: "Profilo",
    actionsTop: [
      {
        title: "Modifica anagrafica",
        type: "info",
        function: () => openModal("modalComponent"),
      },
      {
        title: "Modifica immagine",
        type: "info",
        function: () => {},
      },
      {
        title: "Cambia password",
        type: "info",
        function: () => {},
      },
    ],
  };

  const editAnagraficaModal: ModalProps = {
    title: "Modifica dati anagrafici",
  };

  const handleConfirmed = (isConfirmed: boolean) => {
    setEditConfirmed(isConfirmed);
  };
  return (
    <Card card={cardData}>
      <div className="flex flex-col gap-6 w-fit">
        <div className="flex">
          <div className="d-avatar mb-2">
            <div className="w-32 rounded-full">
              <img src={user!.photo ?? PhUser} alt="Immagine profilo" />
            </div>
          </div>
          <div className="d-badge d-badge-soft d-badge-primary">
            {user!.role}
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
              <label className="input-label text-base! mb-2" htmlFor="inputTel">
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
      <ModalComponent
        modalData={editAnagraficaModal}
        sendConfirm={handleConfirmed}
      >
        <EditAnagrafica userData={user!} canSubmit={isEditConfirmed} />
      </ModalComponent>
    </Card>
  );
};

export default ProfilePage;
