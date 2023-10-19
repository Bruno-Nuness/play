import React, { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";
import ReactPlayer from "react-player";

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [activeAudioIndex, setActiveAudioIndex] = useState(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  async function listFiles() {
    try {
      const storageRef = ref(storage, '/images'); // Certifique-se de usar o caminho correto
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

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Verifique se uma tecla numérica foi pressionada (de 1 a 9)
      if (event.key >= '1' && event.key <= '9') {
        const index = parseInt(event.key) - 1; // Converta a tecla pressionada em um índice
        if (index >= 0 && index < fileList.length) {
          if (index === activeAudioIndex) {
            // Pressionar a mesma tecla, pausar/reproduzir
            setIsAudioPlaying(!isAudioPlaying);
          } else {
            // Pressionar uma tecla diferente, reproduzir a nova faixa
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
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
