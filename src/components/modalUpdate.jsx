import React, { useState } from "react";
import { ModalUpdateContainer } from "@/styles/modalUpdate";
import { ref, updateMetadata } from "firebase/storage";
import { updateFileName } from "../../utils";

export const UpdateModal = ({ value, onConfirm, onClose, storageRef }) => {
  const [newValue, setNewValue] = useState(value);

  const handleUpdateFileName = async () => {
    try {
      await updateFileName(storageRef, newValue);

      // Chame a função onConfirm para fechar o modal
      onConfirm();
    } catch (error) {
      console.error("Erro na atualização do nome do arquivo: " + error);
    }
  };

  return (
    <ModalUpdateContainer>
      <div className="modal-content">
        <h2>Atualizar Nome do Arquivo</h2>
        <input
          type="text"
          placeholder="Novo nome do arquivo"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
  <button onClick={() => updateFileName(storageRef, newValue)}>Confirmar</button>


        <button onClick={onClose}>Cancelar</button>
      </div>
    </ModalUpdateContainer>
  );
};
