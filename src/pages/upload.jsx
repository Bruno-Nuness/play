import React, { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { globalStyle } from "@/styles/global";
import { UploadContainer } from "@/styles/upload";
import { Loading } from "@/components/loading";
import { Header } from "@/components/header";

globalStyle();

function Upload() {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const inputRef = useRef(null);

  const handleSelectFile = (files) => {
    if (files && files[0] && files[0].size < 10000000) {
      setImageFile(files[0]);
      setSelectedFileName(files[0].name);
    } else {
      console.log(
        "Tamanho do arquivo muito grande ou nenhum arquivo selecionado"
      );
    }
  };

  const handleUploadFile = async () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      setIsUploading(true);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Progresso do upload: ${progress}%`);
        },
        (error) => {
          console.error(error);
          setIsUploading(false);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setDownloadURL(url);
          setIsUploading(false);
          setImageFile(null);
          setSelectedFileName(""); // Limpar o nome do arquivo selecionado
        }
      );
    } else {
      console.log("Arquivo não encontrado");
    }
  };

  const handleRemoveFile = () => {
    setImageFile(undefined);
    setDownloadURL("");
    setSelectedFileName(""); // Limpar o nome do arquivo selecionado
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && file.size < 10000000) {
      setImageFile(file);
      setSelectedFileName(file.name);
    } else {
      console.log("Tamanho do arquivo muito grande ou nenhum arquivo selecionado");
    }
  };

  return (
    <>
      <Header />
      <UploadContainer
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <h1>Fazer Upload de Arquivo</h1>
        <label
          htmlFor="files"
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
        >
          {selectedFileName || "Escolha ou arraste um arquivo aqui"}
        </label>
        <input
          type="file"
          id="files"
          onChange={(files) => handleSelectFile(files.target.files)}
          ref={inputRef}
          style={{ display: "none" }}
        />
        <button onClick={handleUploadFile}>Upload</button>
        {isUploading && (
          <div>
            <Loading />
          </div>
        )}
        {downloadURL && (
          <div>
            <p>Upload Realizado com sucesso!</p>
          </div>
        )}
      </UploadContainer>
    </>
  );
}

export default Upload;
