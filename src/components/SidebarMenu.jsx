import React from 'react';

const SidebarMenu = () => {
  return (
    <div className="bg-body-secondary w-25 p-3">
      <ul className="ulMenu nav w-100 gap-1 d-flex flex-column align-items-center justify-content-center rounded">
        <li className="h-25 w-100 p-1 mb-2 mt-3 border-bottom rounded d-flex flex-row align-items-center justify-content-between">
          <h4 className="text-center m-0 fw-medium">Visualizações</h4>
          <i className="bi bi-caret-down-fill fw-medium"></i>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2 mt-5">
          <p className="text-center m-0 fw-medium text-danger">
            <i className="bi bi-fire"></i> Urgentes
          </p>
          <p className="text-center m-0 fw-medium text-danger">1</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2">
          <p className="text-center m-0 fw-medium">
            <i className="bi bi-envelope-check"></i> Emails
          </p>
          <p className="text-center m-0 fw-medium">257</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2">
          <p className="text-center m-0 fw-medium text-success">
            <i className="bi bi-check-circle"></i> Resolvidos
          </p>
          <p className="text-center m-0 fw-medium text-success">15</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2">
          <p className="text-center m-0 fw-medium text-body-secondary">
            <i className="bi bi-arrow-clockwise"></i> Tickets Atualizados
          </p>
          <p className="text-center m-0 fw-medium text-body-secondary">15</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2">
          <p className="text-center m-0 fw-medium text-danger">
            <i className="bi bi-x-lg"></i> Tickets Deletados
          </p>
          <p className="text-center m-0 fw-medium text-danger">0</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-5">
          <p className="text-center m-0 fw-medium">
            <i className="bi bi-slash-circle"></i> Tickets Recusados
          </p>
          <p className="text-center m-0 fw-medium">2</p>
        </li>
        <li className="h-25 w-100 p-0 rounded d-flex flex-row align-items-center justify-content-between mb-2">
          <p className="text-center m-0 fw-medium text-danger-emphasis">
             <i class="bi bi-pin-angle-fill"></i> Tickets Pendentes
          </p>
          <p className="text-center m-0 fw-medium">2</p>
        </li>
        <li className="h-25 w-100 p-1 border-top rounded d-flex flex-row align-items-center justify-content-between mt-4">
          <p className="text-center m-0 fw-medium">Mais</p>
          <i className="bi bi-arrow-right-short fw-medium"></i>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
