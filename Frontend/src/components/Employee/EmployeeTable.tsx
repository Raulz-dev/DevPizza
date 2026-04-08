import React from "react";
import { Employee } from "../../services/employeeService";

interface Props {
  employees: Employee[];
}

export const EmployeeTable: React.FC<Props> = ({ employees }) => {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Turno</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.cargo}</td>
              <td>{emp.turno}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
