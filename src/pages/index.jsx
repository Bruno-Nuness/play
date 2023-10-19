import React, { useEffect, useState, useRef } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase";

export default function Home() {
  const [fileList, setFileList] = useState([]);
  const [audioElements, setAudioElements] = useState([]);

  async function listFiles() {
    try {
      const storageRef = ref(storage, '/images'); // Corrija o caminho para '/images'
      const files = await listAll(storageRef);

      const filesArray = [];

      for (const item of files.items) {
        const url = await getDownloadURL(item);
        filesArray.push({ name: item.name, downloadURL: url });
      }

      setFileList(filesArray);
    } catch (error) {
      console.error("Erro ao listar arquivos: " + error);
    }
  }

  useEffect(() => {
    listFiles();
  }, []);

  useEffect(() => {
    // Quando a lista de arquivos é atualizada, criamos elementos de áudio
    const audioEls = fileList.map(() => new Audio());
    setAudioElements(audioEls);
  }, [fileList]);

  useEffect(() => {
    // Manipuladores de eventos para controlar a reprodução com teclas
    const handleKeyDown = (event) => {
      const key = event.key;
      if (/^[0-9]$/.test(key)) {
        const index = parseInt(key) - 1; // Converta a tecla para um índice de 0 a 9

        if (index >= 0 && index < fileList.length) {
          const audio = audioElements[index];
          audio.paused ? audio.play() : audio.pause();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fileList, audioElements]);

  return (
    <div>
      <h2>Arquivos de Áudio:</h2>
      <ul>
        {fileList.map((file, index) => (
          <li key={index}>
            <div>
              <span>Nome do arquivo: {file.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
