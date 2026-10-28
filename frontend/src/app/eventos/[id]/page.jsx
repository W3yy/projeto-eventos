
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const pics = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
];

export default function Eventos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const carregarEventos = useCallback(async () => {
    setLoading(true);
    setErr(false);

    try {
      const resposta = await fetch(`${API}/eventos?limite=100`);
      const dados = await resposta.json();

      if (!resposta.ok || !dados.sucesso) {
        throw new Error(dados.erro || "Falha ao carregar eventos.");
      }

      setItems(Array.isArray(dados.dados) ? dados.dados : []);
    } catch {
      setErr(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarEventos();
  }, [carregarEventos]);

  async function excluirEvento(id) {
    const confirmar = window.confirm(
      "Tem certeza de que deseja excluir este evento?"
    );

    if (!confirmar) return;

    setMensagem("");

    try {
      const resposta = await fetch(`${API}/eventos/${id}`, {
        method: "DELETE",
      });

      const dados = await resposta.json();

      if (!resposta.ok || !dados.sucesso) {
        throw new Error(dados.erro || "Não foi possível excluir o evento.");
      }

      setItems((anteriores) =>
        anteriores.filter((evento) => String(evento.id) !== String(id))
      );

      setMensagem("Evento excluído com sucesso.");
    } catch (erro) {
      setMensagem(
        erro.message || "Não foi possível conectar à API."
      );
    }
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
          <Link href="/sobre">Sobre</Link>
          <Link href="/admin" className="nav-cta">
            ＋ Publicar evento
          </Link>
        </nav>

        <Link className="mobile-menu" href="/">
          ←
        </Link>
      </header>

      <section className="page-hero">
        <div className="eyebrow">AGENDA NATURA</div>
        <h1>
          Todos os eventos.
          <br />
          <em
            style={{
              color: "#d9f36a",
              fontFamily: "Georgia",
              fontWeight: 400,
            }}
          >
            Novas possibilidades.
          </em>
        </h1>
        <p>Explore, edite e gerencie os eventos científicos da agenda.</p>
      </section>

      <main className="section events-page">
        {mensagem && (
          <p role="status" className="notice">
            {mensagem}
          </p>
        )}

        {err && (
          <div className="empty-state">
            Não foi possível conectar à API. Confira se o backend está
            rodando e tente novamente.
            <p>
              <button
                type="button"
                className="button button-dark"
                onClick={carregarEventos}
              >
                Tentar novamente
              </button>
            </p>
          </div>
        )}

        <div className="event-grid">
          {loading ? (
            <div className="loading">Carregando eventos...</div>
          ) : (
            !err &&
            items.map((evento, indice) => (
              <article className="event-card" key={evento.id}>
                <Link
                  href={`/eventos/${evento.id}`}
                  className="event-image"
                  style={{
                    backgroundImage: `url('${
                      evento.imagem_url || pics[indice % pics.length]
                    }')`,
                  }}
                >
                  <span className="category-pill">
                    {evento.categoria}
                  </span>
                  <span className="image-arrow">↗</span>
                </Link>

                <div className="event-info">
                  <div className="event-date">
                    ▦ &nbsp;
                    {evento.data_evento
                      ? new Date(
                          `${String(evento.data_evento).slice(0, 10)}T12:00:00`
                        ).toLocaleDateString("pt-BR")
                      : "Data a confirmar"}
                    {evento.horario && ` · ${evento.horario}`}
                  </div>

                  <h3>{evento.titulo}</h3>
                  <p>{evento.descricao}</p>

                  <div className="event-foot">
                    <span>⌖ &nbsp;{evento.local}</span>
                    <Link href={`/eventos/${evento.id}`}>
                      Detalhes ↗
                    </Link>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      marginTop: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <Link
                      href={`/eventos/${evento.id}/editar`}
                      className="button button-dark"
                    >
                      Editar
                    </Link>

                    <button
                      type="button"
                      className="button"
                      onClick={() => excluirEvento(evento.id)}
                      style={{
                        border: "1px solid #b42318",
                        color: "#b42318",
                        background: "transparent",
                        cursor: "pointer",
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {!loading && !err && items.length === 0 && (
          <div className="empty-state">
            Ainda não há eventos cadastrados.
            <p>
              <Link href="/admin" className="text-link">
                Cadastrar primeiro evento ↗
              </Link>
            </p>
          </div>
        )}
      </main>

      <footer className="footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-icon">✳</span>
          <span>
            NATURA
            <small>CIÊNCIA EM MOVIMENTO</small>
          </span>
        </Link>

        <div>
          <Link href="/">Início</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/admin">Publicar</Link>
        </div>

        <small>© 2026 Natura. Feito para explorar.</small>
      </footer>
    </>
  );
}
