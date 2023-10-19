import React, { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";


function Upload() {
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectFile = (files) => {
    if (files && files[0] && files[0].size < 10000000) {
      setImageFile(files[0]);
    } else {
      console.log('Tamanho do arquivo muito grande ou nenhum arquivo selecionado');
    }
  }

  const handleUploadFile = async () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `images/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      
      setIsUploading(true);

      uploadTask.on(
          'state_changed',
          (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
          }
      );
    } else {
      console.log("Arquivo não encontrado");
    }
  }

  const handleRemoveFile = () => {
    setImageFile(undefined);
    setDownloadURL('');
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Fazer Upload de Arquivo</h1>
      <input type="file" onChange={(files) => handleSelectFile(files.target.files)} />
      <button onClick={handleUploadFile}>Upload</button>
      <button onClick={handleRemoveFile}>Remover</button>
      {isUploading && <div style={{ marginTop: '20px' }}>Carregando...</div>}
      {downloadURL && (
        <div style={{ marginTop: '20px' }}>
          <img src={downloadURL} alt={downloadURL} style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
          <p>URL de download: {downloadURL}</p>
        </div>
      )}

    </div>
  );
}

export default Upload;
