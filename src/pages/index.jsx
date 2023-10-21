import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  getDownloadURL,
  listAll,
  deleteObject,
  updateMetadata,
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
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = useState(null);

  useEffect(() => {
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

    listFiles();
  }, []);
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

  const handleDelete = async (index) => {
    openDeleteModal(index);
  };
  const handleAudioPlayPause = (index) => {
    if (activeAudioIndex === index) {
      // Se o índice pressionado for igual ao índice ativo
      setIsAudioPlaying((prevIsAudioPlaying) => !prevIsAudioPlaying); // Alternar reprodução/pausa
    } else {
      // Caso contrário, defina o novo índice e comece a reprodução
      setActiveAudioIndex(index);
      setIsAudioPlaying(true);
    }
  };
  const openDeleteModal = (index) => {
    setDeleteItemIndex(index);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const index = deleteItemIndex;

    if (index !== null) {
      const fileToDelete = fileList[index];
      const storageRef = ref(storage, `/images/${fileToDelete.name}`);
      await deleteObject(storageRef);

      const updatedFileList = [...fileList];
      updatedFileList.splice(index, 1);
      setFileList(updatedFileList);
    }

    setIsDeleteModalOpen(false);
  };

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleSaveOrder = async () => {
    const storageRef = ref(storage, "/images");
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      console.log(file);
      await updateMetadata(ref(storageRef, file.name), {
        customMetadata: { order: i },
      });
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    // Restaure a ordem original
    setIsEditing(false);
    setFileList([...fileList]);
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("text/plain");
    const updatedList = [...fileList];
    const [draggedItem] = updatedList.splice(draggedIndex, 1);
    updatedList.splice(index, 0, draggedItem);
    setFileList(updatedList);
  };

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
              <li
                key={index}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
                draggable={isEditing}
              >
                <div>
                  <span>Precione a tecla: {index + 1}</span>
                  <span>Nome do arquivo: {file.name}</span>
                  <ReactPlayer
                    url={file.downloadURL}
                    controls={true}
                    height={"20%"}
                    width={"80%"}
                    playing={index === activeAudioIndex && isAudioPlaying}
                    onEnded={() => {
                      if (index === activeAudioIndex && isAudioPlaying) {
                        setActiveAudioIndex(null);
                        setIsAudioPlaying(false);
                        setTimeout(() => {
                          setActiveAudioIndex(index);
                          setIsAudioPlaying(true);
                        }, 100);
                      }
                    }}
                    loop 
                  />

                  <button
                    id="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {isEditing ? (
          <div className="buttons-box">
            <button id="save" onClick={handleSaveOrder}>
              Salvar Ordem
            </button>
            <button onClick={handleCancelEdit}>Cancelar</button>
          </div>
        ) : (
          <button className="edit-button" onClick={handleStartEditing}>
            Editar Ordem
          </button>
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