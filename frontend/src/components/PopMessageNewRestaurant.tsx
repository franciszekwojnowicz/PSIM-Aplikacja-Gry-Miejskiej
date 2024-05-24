import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  message: string;
}

const PopMessageNewRestaurant: React.FC<ModalProps> = ({
  onClose,
  title,
  message,
}: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="p-2 text-3xl font-medium">{title}</h2>
        <h2 className="text-2xl">{message}</h2>
        <div className="pt-8">
          <button
            className="text-2xl bg-black text-white p-2 rounded-xl hover:bg-blue-800 "
            onClick={onClose}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopMessageNewRestaurant;
