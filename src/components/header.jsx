import { HeaderContainer } from "@/styles/header";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/"); 
  };

  const handleUploadClick = () => {
    router.push("/upload"); 
  };

  return (
    <HeaderContainer>
      <div>
        <button onClick={handleHomeClick}>Home</button>
        <button onClick={handleUploadClick}>Upload</button>
      </div>
    </HeaderContainer>
  );
};
