import { ModalDeleteContainer } from "@/styles/modalDelete";
import React from "react";

export const DeleteModal = ({ onConfirm, onClose }) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <ModalDeleteContainer>
      <div>
        <h1>{`Deseja excluir a música ?`}</h1>
        <div className="buttons-box">
          <button className="yes" onClick={handleConfirm}>Sim</button>
          <button className="no" onClick={onClose}>Não</button>
        </div>
      </div>
    </ModalDeleteContainer>
  );
};
