import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll, updateMetadata } from "firebase/storage";
import { storage } from "../../firebase";
import ReactPlayer from "react-player";
import CustomModal from '@/components/modalUpdate'

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedName, setUpdatedName] = useState("");

  async function listFiles() {
    try {
      const storageRef = ref(storage, '/images');
      const files = await listAll(storageRef);

      const fileArray = [];

      for (const item of files.items) {
        const url = await getDownloadURL(item);
        fileArray.push({ name: item.name, downloadURL: url });
      }

      setFileList(fileArray);
    } catch (error) {
      console.error("Erro ao listar arquivos: " + error);
    }
  }

  useEffect(() => {
    listFiles();
  }, []);

  const openModal = (index) => {
    setIsModalOpen(true);
    setActiveAudioIndex(index);
    setUpdatedName(fileList[index].name);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateName = async () => {
    try {
      const fileToUpdate = fileList[activeAudioIndex];
      const storageRef = ref(storage, `/images/${fileToUpdate.name}`);

      // Atualize o metadado do arquivo para refletir o novo nome
      await updateMetadata(storageRef, { customMetadata: { name: updatedName } });

      console.log(`Nome atualizado para: ${updatedName}`);
      closeModal();
      listFiles(); // Atualize a lista após a atualização
    } catch (error) {
      console.error("Erro na atualização: " + error);
    }
  };

  return (
    <div>
      <h2>Arquivos de Áudio:</h2>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            <div>
              <span>Nome do arquivo: {file.name}</span>
              <ReactPlayer
                url={file.downloadURL}
                controls={true}
                width="100%"
                playing={index === activeAudioIndex && isAudioPlaying}
              />
              <button onClick={() => openModal(index)}>Atualizar</button>
            </div>
          </li>
        ))}
      </ul>
      <CustomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={updateName}
        value={updatedName}
        onChange={(e) => setUpdatedName(e.target.value)}
      />
    </div>
  );
}
