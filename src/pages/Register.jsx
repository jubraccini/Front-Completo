import { Link, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import logo from "../assets/img/logo.png";
import bg from "../assets/img/gmaps.jpg";

export function Register() {
  const navigate = useNavigate();

  const handleSubmitRegister = async (event) => {
    event.preventDefault();

    const { nome, email, endereco, cpf, senha } = event.target.elements;

    // Validação básica de CPF
    if (cpf.value.length !== 11) {
      alert("CPF inválido. Por favor, digite os 11 dígitos.");
      return;
    }

    try {
      const response = await fetch("https://denguealerta202401-production.up.railway.app/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome.value,
          email: email.value,
          endereco: endereco.value,
          cpf: cpf.value,
          senha: senha.value,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      alert("Cadastro efetuado com sucesso!");
      navigate("/");
    } catch (error) {
      console.error("Erro ao efetuar cadastro:", error);
      alert(`Erro ao efetuar cadastro: ${error.message}`);
    }
  };

  return (
    <>
      <main className="content" style={{ backgroundImage: `url(${bg})` }}>
        <img src={logo} width="120" className="mb-5" alt="Logo" />

        <form onSubmit={handleSubmitRegister}>
          <label>
            Nome:
            <input
              type="text"
              placeholder="Seu nome"
              name="nome"
              className="input mb-5"
              required
            />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              placeholder="Seu e-mail"
              name="email"
              className="input mb-5"
              required
            />
          </label>

          <label>
            Endereço:
            <input
              type="text"
              placeholder="Seu endereço"
              name="endereco"
              className="input mb-5"
              required
            />
          </label>

          <label>
            CPF:
            <input
              type="text"
              placeholder="CPF (somente números)"
              name="cpf"
              className="input mb-5"
              maxLength={11}
              minLength={11}
              required
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="Digite sua senha"
              name="senha"
              className="input mb-5"
              required
            />
          </label>

          <button type="submit" className="btn mb-5">
          Cadastrar
        </button>
      </form>

      <Link to="/" className="btn mb-5">
        Voltar para login
      </Link>
      </main>

      <Footer />
    </>
  );
}
