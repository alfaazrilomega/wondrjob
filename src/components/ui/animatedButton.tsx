import React from "react";
import styles from "./AnimatedButton.module.css"; // Menggunakan CSS Modules

// Mendefinisikan tipe untuk props komponen
interface AnimatedButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string; // Menambahkan prop className untuk kustomisasi
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  onClick,
  children,
  className = "",
}) => {
  return (
    // Menggabungkan class dari CSS module dengan className eksternal
    <div className={`${styles.wrapper} ${className}`}>
      <button className={styles.uiBtn} onClick={onClick}>
        <span>{children || "Create New"}</span>
      </button>
    </div>
  );
};

export default AnimatedButton;
