/**
 * Melhorias:
 * - Tratar erros de cadastro (usuario ja existente, CPF invalido)
 * - Nao exibir erros usando Alert, utilizar algum componente
 * - Confirmar se a pessoa quer cadastrar um ponto de foco antes de cadastrar
 * - Confirmar se o usuário quer realmente fazer logout (sair)
 * - Salvar o token do usuario no localstorage
 * - Colocar a logo aedeswatch no login e register
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
