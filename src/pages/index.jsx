import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage } from "../../firebase";
import ReactPlayer from "react-player";
import { Loading } from "@/components/loading";
import { HomeContainer } from "@/styles/home";
import { globalStyle } from "@/styles/global";
import { Header } from "@/components/header";
import { DeleteModal } from "@/components/modalDelete";

globalStyle();

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);

  async function listFiles() {
    try {
      const storageRef = ref(storage, "/images");
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
    // Abra o modal de exclusão
    openDeleteModal(index);
  };

  const openDeleteModal = (index) => {
    setDeleteItemIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    const index = deleteItemIndex;
    if (index !== null) {
      const fileToDelete = fileList[index];
      const storageRef = ref(storage, `/images/${fileToDelete.name}`);
      deleteObject(storageRef);

      const updatedFileList = [...fileList];
      updatedFileList.splice(index, 1);
      setFileList(updatedFileList);
    }

    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key >= "1" && event.key <= "9") {
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
      <Header />
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
                    height={"20%"}
                    width={"80%"}
                    playing={index === activeAudioIndex && isAudioPlaying}
                  />
                  <div className="buttons-box">
                    <button onClick={() => handleDelete(index)}>Excluir</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isDeleteModalOpen && (
          <DeleteModal
            
            onConfirm={confirmDelete}
            onClose={() => setIsDeleteModalOpen(false)}
          />
        )}
      </HomeContainer>
    </>
  );
}
