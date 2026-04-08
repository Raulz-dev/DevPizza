import React from "react";
import { EmployeeForm } from "./EmployeeForm";

interface EmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export const EmployeeModal: React.FC<EmployeeModalProps> = ({ isOpen, onClose, onAdd }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-[420px] relative animate-fadeIn">
        <button onClick={onClose} className="absolute right-4 top-3 text-red-600 hover:text-red-800 text-lg font-bold">
          ✕
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-red-700 mb-4 text-center">Cadastrar Funcionário</h2>
          <EmployeeForm onAdd={onAdd} onClose={onClose} />
        </div>
      </div>
    </div>
  );
};
