"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:3001/api";

const pics = [
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
];

export default function Eventos() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    useEffect(() => {
        fetch(`${API}/eventos?limite=100`)
            .then((r) => r.json())
            .then((j) => {
                if (j.sucesso) {
                    setItems(j.dados);
                } else {
                    setErr(true);
                }
            })
            .catch(() => setErr(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <header className="topbar">
                <Link href="/" className="brand">
                    <span className="brand-icon">
                        ✳
                    </span>

                    <span>
                        NATURA
                        <small>
                            CIÊNCIA EM MOVIMENTO
                        </small>
                    </span>
                </Link>

                <nav>
                    <Link href="/">
                        Início
                    </Link>

                    <Link href="/sobre">
                        Sobre
                    </Link>

                    <Link
                        href="/admin"
                        className="nav-cta"
                    >
                        ＋ Publicar evento
                    </Link>
                </nav>

                <Link
                    className="mobile-menu"
                    href="/"
                >
                    ←
                </Link>
            </header>

            <section className="page-hero">
                <div className="eyebrow">
                    AGENDA NATURA
                </div>

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

                <p>
                    Explore a agenda de experiências científicas,
                    encontros e atividades para alimentar sua
                    curiosidade.
                </p>
            </section>

            <main className="section events-page">
                <div className="event-grid">
                    {loading ? (
                        <div className="loading">
                            Carregando eventos...
                        </div>
                    ) : (
                        items.map((e, i) => (
                            <article
                                className="event-card"
                                key={e.id}
                            >
                                <Link
                                    href={`/eventos/${e.id}`}
                                    className="event-image"
                                    style={{
                                        backgroundImage: `url('${
                                            e.imagem_url ||
                                            pics[i % 3]
                                        }')`,
                                    }}
                                >
                                    <span className="category-pill">
                                        {e.categoria}
                                    </span>

                                    <span className="image-arrow">
                                        ↗
                                    </span>
                                </Link>

                                <div className="event-info">
                                    <div className="event-date">
                                        ▦ &nbsp;

                                        {e.data_evento
                                            ? new Date(
                                                  e.data_evento +
                                                      "T12:00:00"
                                              ).toLocaleDateString(
                                                  "pt-BR"
                                              )
                                            : "Data a confirmar"}

                                        {e.horario &&
                                            ` · ${e.horario}`}
                                    </div>

                                    <h3>
                                        {e.titulo}
                                    </h3>

                                    <p>
                                        {e.descricao}
                                    </p>

                                    <div className="event-foot">
                                        <span>
                                            ⌖ &nbsp;{e.local}
                                        </span>

                                        <Link
                                            href={`/eventos/${e.id}`}
                                        >
                                            Detalhes ↗
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                {!loading && !items.length && (
                    <div className="empty-state">
                        {err
                            ? "Não foi possível conectar à API. Inicie o backend e tente novamente."
                            : "Ainda não há eventos cadastrados."}

                        <p>
                            <Link
                                href="/admin"
                                className="text-link"
                            >
                                Cadastrar primeiro evento ↗
                            </Link>
                        </p>
                    </div>
                )}
            </main>

            <footer className="footer">
                <Link
                    href="/"
                    className="brand footer-brand"
                >
                    <span className="brand-icon">
                        ✳
                    </span>

                    <span>
                        NATURA
                        <small>
                            CIÊNCIA EM MOVIMENTO
                        </small>
                    </span>
                </Link>

                <div>
                    <Link href="/">
                        Início
                    </Link>

                    <Link href="/sobre">
                        Sobre
                    </Link>

                    <Link href="/admin">
                        Publicar
                    </Link>
                </div>

                <small>
                    © 2026 Natura. Feito para explorar.
                </small>
            </footer>
        </>
    );
}
