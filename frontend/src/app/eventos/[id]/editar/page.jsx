
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const categorias = [
  "Biologia",
  "Física",
  "Química",
  "Ciências da Terra",
  "Astronomia",
  "Meio Ambiente",
  "Multidisciplinar",
];

const estados = [
  { value: "agendado", label: "Agendado" },
  { value: "em andamento", label: "Em andamento" },
  { value: "concluido", label: "Concluído" },
  { value: "cancelado", label: "Cancelado" },
];

export default function EditarEvento() {
  const { id } = useParams();
  const router = useRouter();

  const [formulario, setFormulario] = useState({
    titulo: "",
    descricao: "",
    categoria: "Biologia",
    data_evento: "",
    horario: "",
    local: "",
    organizador: "",
    imagem_url: "",
    status: "agendado",
  });

  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!id) return;

    async function carregarEvento() {
      try {
        const resposta = await fetch(`${API}/eventos/${id}`);
        const resultado = await resposta.json();

        if (!resposta.ok || !resultado.sucesso) {
          throw new Error(resultado.erro || "Não foi possível carregar o evento.");
        }

        const evento = resultado.dados;

        setFormulario({
          titulo: evento.titulo || "",
          descricao: evento.descricao || "",
          categoria: evento.categoria || "Biologia",
          data_evento: evento.data_evento
            ? String(evento.data_evento).slice(0, 10)
            : "",
          horario: evento.horario || "",
          local: evento.local || "",
          organizador: evento.organizador || "",
          imagem_url: evento.imagem_url || "",
          status: evento.status || "agendado",
        });
      } catch (error) {
        setErro(error.message || "Erro ao carregar evento.");
      } finally {
        setCarregando(false);
      }
    }

    carregarEvento();
  }, [id]);

  function alterarCampo(event) {
    const { name, value } = event.target;
    setFormulario((anterior) => ({
      ...anterior,
      [name]: value,
    }));
  }

  async function salvarEvento(event) {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      const resposta = await fetch(`${API}/eventos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      const resultado = await resposta.json();

      if (!resposta.ok || !resultado.sucesso) {
        throw new Error(resultado.erro || "Não foi possível atualizar o evento.");
      }

      router.push("/eventos");
      router.refresh();
    } catch (error) {
      setErro(error.message || "Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return <main className="section">Carregando evento...</main>;
  }

  if (erro && !formulario.titulo) {
    return (
      <main className="section">
        <p role="alert">{erro}</p>
        <Link href="/eventos">Voltar para a agenda</Link>
      </main>
    );
  }

  return (
    <>
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-icon">✳</span>
          <span>
            NATURA
            <small>CIÊNCIA EM MOVIMENTO</small>
          </span>
        </Link>

        <nav>
          <Link href="/">Início</Link>
          <Link href="/eventos">Agenda</Link>
          <Link href="/admin" className="nav-cta">
            Publicar evento
          </Link>
        </nav>
      </header>

     <main className="section editar-evento-page">
        <div className="eyebrow">GERENCIAR EVENTO</div>
        <h1>Editar evento</h1>
        <p>Atualize as informações do evento científico.</p>

        {erro && (
          <p role="alert" className="notice">
            {erro}
          </p>
        )}

        <form onSubmit={salvarEvento} className="event-form">
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={alterarCampo}
            required
          />

          <label htmlFor="descricao">Descrição *</label>
          <textarea
            id="descricao"
            name="descricao"
            value={formulario.descricao}
            onChange={alterarCampo}
            rows={5}
            required
          />

          <label htmlFor="categoria">Categoria *</label>
          <select
            id="categoria"
            name="categoria"
            value={formulario.categoria}
            onChange={alterarCampo}
            required
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>

          <label htmlFor="data_evento">Data *</label>
          <input
            id="data_evento"
            name="data_evento"
            type="date"
            value={formulario.data_evento}
            onChange={alterarCampo}
            required
          />

          <label htmlFor="horario">Horário</label>
          <input
            id="horario"
            name="horario"
            type="time"
            value={formulario.horario}
            onChange={alterarCampo}
          />

          <label htmlFor="local">Local *</label>
          <input
            id="local"
            name="local"
            value={formulario.local}
            onChange={alterarCampo}
            required
          />

          <label htmlFor="organizador">Organizador</label>
          <input
            id="organizador"
            name="organizador"
            value={formulario.organizador}
            onChange={alterarCampo}
          />

          <label htmlFor="imagem_url">URL da imagem</label>
          <input
            id="imagem_url"
            name="imagem_url"
            type="url"
            value={formulario.imagem_url}
            onChange={alterarCampo}
            placeholder="https://exemplo.com/imagem.jpg"
          />

          <label htmlFor="status">Status *</label>
          <select
            id="status"
            name="status"
            value={formulario.status}
            onChange={alterarCampo}
            required
          >
            {estados.map((estado) => (
              <option key={estado.value} value={estado.value}>
                {estado.label}
              </option>
            ))}
          </select>

          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 24,
            }}
          >
            <button
              type="submit"
              className="button button-dark"
              disabled={salvando}
            >
              {salvando ? "Salvando..." : "Salvar alterações"}
            </button>

            <Link href="/eventos" className="button">
              Cancelar
            </Link>
          </div>
        </form>
      </main>

      <footer className="footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-icon">✳</span>
          <span>
            NATURA
            <small>CIÊNCIA EM MOVIMENTO</small>
          </span>
        </Link>
        <small>© 2026 Natura. Feito para explorar.</small>
      </footer>
    </>
  );
}
