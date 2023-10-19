import { ModalUpdateContainer } from "@/styles/modalUpdate";
import React, { useState } from "react";
import { getStorage, ref, getDownloadURL, listAll, deleteObject, updateMetadata } from "firebase/storage";
import { storage } from "../../firebase";

export const UpdateModal = ({ value, onConfirm, onClose }) => {
  const [newValue, setNewValue] = useState(value);

  const updateFileName = async () => {
    try {
      // Crie uma referência para o arquivo original
      
      const fileRef = ref(storage, `gs://upload-teste-br.appspot.com/images/${value}`);

      // Obtenha a URL de download original (se necessário)
      const downloadURL = await getDownloadURL(fileRef);

      // Crie uma nova referência para o arquivo com o nome atualizado
      const newFileRef = ref(storage, `gs://upload-teste-br.appspot.com/images/${newValue}`);

      // Copie o conteúdo do arquivo original para o novo arquivo
      await updateMetadata(newFileRef, { customMetadata: { name: newValue } });
      await deleteObject(fileRef); // Exclua o arquivo original

      // Chame a função onConfirm para fechar o modal
      onConfirm();

      // Atualize a lista de arquivos após a renomeação
      listFiles();
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
          defaultValue={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button onClick={updateFileName}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </ModalUpdateContainer>
  );
};
