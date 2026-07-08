import {type ReactNode} from "react";
import type {ModalProps} from "../../models/ModalProps";

const ModalComponent = ({
                            modalData,
                            children,
                            sendConfirm
                        }: {
    modalData: ModalProps;
    children?: ReactNode;
    sendConfirm: (confirmed?: boolean) => void;
}) => {
    return (
        <dialog id="modalComponent" className="d-modal">
            <div className="d-modal-box w-11/12 max-w-5xl rounded-lg">
                <h3 className="font-medium text-gray-800 text-xl mb-4">{modalData.title}</h3>
                {modalData?.description && (
                    <p className="py-4">{modalData.description}</p>
                )}
                {children}
                <div className="d-modal-action">
                    <form className="flex gap-4">
                        <button
                            className="d-btn rounded-sm bg-gray-50 border-gray-50"
                            type="button"
                            onClick={() => {
                                sendConfirm(false);
                                document.getElementById("modalComponent")?.close();
                            }}
                        >
                            Chiudi
                        </button>
                        <button
                            className="d-btn rounded-sm bg-blue-600 text-white border-blue-600"
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
