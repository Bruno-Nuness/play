import React, { useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL, listAll, deleteObject, updateMetadata } from "firebase/storage";
import { storage } from "../../firebase";

import ReactPlayer from "react-player";
import { Loading } from "@/components/loading";
import { UpdateModal } from "@/components/modalUpdate";
import { HomeContainer } from "@/styles/home";
import { globalStyle } from "@/styles/global";
import { Header } from "@/components/header";




globalStyle()
export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(null);

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
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao listar arquivos: " + error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    listFiles();
  }, []);

  const handleDelete = async (index) => {
    try {
      const fileToDelete = fileList[index];
      const storageRef = ref(storage, `/images/${fileToDelete.name}`);

      await deleteObject(storageRef);
      const updatedFileList = [...fileList];
      updatedFileList.splice(index, 1);
      setFileList(updatedFileList);
    } catch (error) {
      console.error("Erro ao excluir o arquivo: " + error);
    }
  };

  const openUpdateModal = (index) => {
    setUpdateIndex(index);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setUpdateIndex(null);
  };

  const updateFileName = async (newName) => {
    try {
      const fileToUpdate = fileList[updateIndex];
      const storageRef = ref(storage, `/images/${fileToUpdate.name}`);
      
      // Atualize o metadado do arquivo para refletir o novo nome
      await updateMetadata(storageRef, { customMetadata: { name: newName } });

      // Atualize o nome na lista
      const updatedFileList = [...fileList];
      updatedFileList[updateIndex].name = newName;
      setFileList(updatedFileList);

      // Feche o modal
      closeUpdateModal();
    } catch (error) {
      console.error("Erro na atualização do nome do arquivo: " + error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= '1' && event.key <= '9') {
        const index = parseInt(event.key) - 1;
        if (index >= 0 && index < fileList.length) {
          if (index === activeAudioIndex) {
            setIsAudioPlaying(!isAudioPlaying);
          } else {
            setActiveAudioIndex(index);
            setIsAudioPlaying(true);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fileList, activeAudioIndex, isAudioPlaying]);

  return (
    <>
    <Header></Header>
    <HomeContainer>
      <h2>Arquivos de Áudio:</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <ul>
          {fileList.map((file, index) => (
            <li key={index}>
              <div>
                <span>Nome do arquivo: {file.name}</span>
                <ReactPlayer
                  url={file.downloadURL}
                  controls={true}
                height={'20%'}
                width={'80%'}
                  playing={index === activeAudioIndex && isAudioPlaying}
                />
                <div className="buttons-box">

                <button onClick={() => handleDelete(index)}>Excluir</button>
                <button onClick={() => openUpdateModal(index)}>Atualizar</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      1
      {isUpdateModalOpen && (
        <UpdateModal
          value={fileList[updateIndex].name}
          onValueChange={updateFileName}
          onConfirm={closeUpdateModal}
          onClose={closeUpdateModal}
        />
      )}
    </HomeContainer>
    </>
  );
}
