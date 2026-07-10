import { type ReactNode } from "react";
import type { ModalProps } from "../../models/ModalProps";

const ModalComponent = ({
  modalData,
  children,
  sendConfirm,
}: {
  modalData: ModalProps;
  children?: ReactNode;
  sendConfirm: (confirmed?: boolean) => void;
}) => {
  return (
    <dialog id="modalComponent" className="d-modal">
      <div className="d-modal-box w-11/12 max-w-5xl rounded-lg">
        <h3 className="font-medium text-gray-800 text-xl mb-4">
          {modalData.title}
        </h3>
        {modalData?.description && (
          <p className="py-4">{modalData.description}</p>
        )}
        {children}
        <div className="d-modal-action">
          <form className="flex gap-4">
            <button
              className="inline-flex items-center rounded-lg! bg-layer! border! border-gray-100! text-gray-600 hover:bg-layer-hover!"
              type="button"
              onClick={() => {
                sendConfirm(false);
                document.getElementById("modalComponent")?.close();
              }}
            >
              Chiudi
            </button>
            <button
              className="bg-primary-600 text-primary-foreground hover:bg-primary-hover inline-flex items-center rounded-lg!"
              type="button"
              onClick={() => {
                sendConfirm(true);
                document.getElementById("modalComponent")?.close();
              }}
            >
              Salva
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalComponent;
