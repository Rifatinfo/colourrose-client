"use client";
import LoginModal from "@/components/auth-form/LoginModal";
import { useLogin } from "@/context/UIContext";


const GlobalLoginModal = () => {
  const { isLoginModalOpen, closeLoginModal } = useLogin();

  return (
    <>
      {isLoginModalOpen && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
        />
      )}
    </>
  );
}


export default GlobalLoginModal;