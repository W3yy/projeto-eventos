"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const API =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

const exemplos = [
    {
        id: "demo1",
        titulo: "Noite de observação astronômica",
        categoria: "Astronomia",
        data_evento: "2026-11-14",
        horario: "19:00",
        local: "Planetário Municipal",
        descricao:
            "Uma experiência guiada para observar planetas, constelações e aprender a reconhecer o céu noturno.",
        status: "agendado",
        imagem_url:
            "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "demo2",
        titulo: "Expedição biodiversidade",
        categoria: "Biologia",
        data_evento: "2026-11-21",
        horario: "08:30",
        local: "Parque Ecológico",
        descricao:
            "Explore ecossistemas locais, identifique espécies e descubra como a biodiversidade mantém o equilíbrio ambiental.",
        status: "agendado",
        imagem_url:
            "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "demo3",
        titulo: "Laboratório de química sustentável",
        categoria: "Química",
        data_evento: "2026-12-05",
        horario: "14:00",
        local: "Centro de Ciências",
        descricao:
            "Experimentos práticos e seguros sobre materiais, reações e soluções para um futuro mais sustentável.",
        status: "agendado",
        imagem_url:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
    },
];

const cats = [
    "Todas",
    "Biologia",
    "Física",
    "Química",
    "Ciências da Terra",
    "Astronomia",
    "Meio Ambiente",
    "Multidisciplinar",
];

function date(v) {
    if (!v) {
        return "Data a confirmar";
    }

    return new Date(v + "T12:00:00").toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

export default function Home() {
    const [eventos, setEventos] = useState(exemplos);
    const [categoria, setCategoria] = useState("Todas");
    const [busca, setBusca] = useState("");
    const [api, setApi] = useState(false);

    useEffect(() => {
        fetch(`${API}/eventos?limite=30`)
            .then((r) => {
                if (!r.ok) {
                    throw Error();
                }

                return r.json();
            })
            .then((j) => {
                if (j.sucesso) {
                    setEventos(j.dados);
                    setApi(true);
                }
            })
            .catch(() => setApi(false));
    }, []);

    const filtrados = useMemo(
        () =>
            eventos.filter(
                (e) =>
                    (categoria === "Todas" || e.categoria === categoria) &&
                    `${e.titulo} ${e.descricao} ${e.local} ${e.categoria}`
                        .toLowerCase()
                        .includes(busca.toLowerCase())
            ),
        [eventos, categoria, busca]
    );

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
                    <a href="#explorar">Explorar eventos</a>

                    <Link href="/sobre">
                        Sobre o projeto
                    </Link>

                    <Link href="/admin" className="nav-cta">
                        ＋ Publicar evento
                    </Link>
                </nav>

                <button
                    className="mobile-menu"
                    onClick={() =>
                        document
                            .querySelector(".mobile-links")
                            .classList.toggle("open")
                    }
                >
                    ☰
                </button>

                <div className="mobile-links">
                    <a href="#explorar">Explorar eventos</a>

                    <Link href="/sobre">
                        Sobre
                    </Link>

                    <Link href="/admin">
                        Publicar evento
                    </Link>
                </div>
            </header>

            <main>
                <section className="hero">
                    <div className="hero-orb orb1" />
                    <div className="hero-orb orb2" />

                    <div className="hero-content">
                        <div className="eyebrow">
                            <span className="live-dot" />
                            CONHECIMENTO QUE CONECTA
                        </div>

                        <h1>
                            O mundo natural
                            <br />
                            é o nosso <em>laboratório.</em>
                        </h1>

                        <p>
                            Encontre encontros, oficinas e experiências
                            que aproximam você das Ciências da Natureza.
                        </p>

                        <div className="hero-actions">
                            <a
                                className="button button-light"
                                href="#explorar"
                            >
                                Explorar eventos <span>↘</span>
                            </a>

                            <Link
                                className="button button-outline"
                                href="/admin"
                            >
                                Divulgar um evento
                            </Link>
                        </div>

                        <div className="hero-note">
                            <div className="avatar-stack">
                                <span>🔬</span>
                                <span>🌿</span>
                                <span>🪐</span>
                            </div>

                            <span>
                                Ciência para curiosos, estudantes e
                                exploradores.
                            </span>
                        </div>
                    </div>

                    <div className="hero-art">
                        <div className="planet planet-main">
                            <div className="planet-shine" />
                        </div>

                        <div className="orbit orbit-a" />
                        <div className="orbit orbit-b" />

                        <span className="float-tag tag-top">
                            ✦ Explore
                        </span>

                        <span className="float-tag tag-bottom">
                            NATUREZA • CIÊNCIA • FUTURO
                        </span>

                        <span className="spark spark-a">✳</span>
                        <span className="spark spark-b">✦</span>
                    </div>

                    <div className="hero-bottom">
                        <span>01 / CURIOSIDADE EM AÇÃO</span>
                        <span>ROLE PARA DESCOBRIR ↓</span>
                    </div>
                </section>

                <section className="ticker">
                    <div>
                        CIÊNCIA PARA TODOS <b>✳</b>
                        EXPERIÊNCIAS REAIS <b>✳</b>
                        NOVAS DESCOBERTAS <b>✳</b>
                        CIÊNCIA PARA TODOS <b>✳</b>
                        EXPERIÊNCIAS REAIS <b>✳</b>
                    </div>
                </section>

                <section
                    className="section events-section"
                    id="explorar"
                >
                    <div className="section-head">
                        <div>
                            <div className="eyebrow dark-eyebrow">
                                AGENDA DE DESCOBERTAS
                            </div>

                            <h2>
                                Tem ciência
                                <br />
                                <em>acontecendo.</em>
                            </h2>
                        </div>

                        <p>
                            Do microscópico ao universo. Escolha seu
                            próximo caminho de descoberta.
                        </p>
                    </div>

                    <div className="search-row">
                        <label className="searchbox">
                            <span>⌕</span>

                            <input
                                value={busca}
                                onChange={(e) =>
                                    setBusca(e.target.value)
                                }
                                placeholder="Busque por tema, evento ou local..."
                            />

                            <kbd>↵</kbd>
                        </label>

                        <span
                            className={`api-status ${
                                api ? "online" : ""
                            }`}
                        >
                            <i />
                            {api
                                ? "API conectada"
                                : "Modo de demonstração"}
                        </span>
                    </div>

                    <div className="filters">
                        {cats.map((c) => (
                            <button
                                key={c}
                                onClick={() => setCategoria(c)}
                                className={
                                    categoria === c ? "active" : ""
                                }
                            >
                                {c}
                            </button>
                        ))}
                    </div>

                    <div className="event-grid">
                        {filtrados.map((e, i) => {
                            const linkEvento = e.id
                                .toString()
                                .startsWith("demo")
                                ? "/eventos"
                                : `/eventos/${e.id}`;

                            return (
                                <article
                                    className="event-card"
                                    key={e.id}
                                >
                                    <Link
                                        href={linkEvento}
                                        className="event-image"
                                        style={{
                                            backgroundImage: `url('${
                                                e.imagem_url ||
                                                exemplos[i % 3]
                                                    .imagem_url
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
                                            {date(e.data_evento)}

                                            {e.horario && (
                                                <span>
                                                    {" "}
                                                    · {e.horario}
                                                </span>
                                            )}
                                        </div>

                                        <h3>{e.titulo}</h3>

                                        <p>{e.descricao}</p>

                                        <div className="event-foot">
                                            <span>
                                                ⌖ &nbsp;{e.local}
                                            </span>

                                            <Link href={linkEvento}>
                                                Ver detalhes ↗
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {!filtrados.length && (
                        <div className="empty-state">
                            Nenhum evento encontrado. Tente outra busca
                            ou categoria.
                        </div>
                    )}

                    <div className="center-action">
                        <Link
                            href="/eventos"
                            className="button button-dark"
                        >
                            Ver agenda completa <span>↗</span>
                        </Link>
                    </div>
                </section>

                <section className="manifesto">
                    <div className="manifesto-symbol">✳</div>

                    <div className="eyebrow">
                        NOSSA IDEIA
                    </div>

                    <h2>
                        Mais perguntas.
                        <br />
                        <em>Mais descobertas.</em>
                    </h2>

                    <p>
                        Acreditamos que a ciência fica ainda mais
                        incrível quando é compartilhada. Conectamos
                        pessoas a experiências que despertam curiosidade
                        e transformam a maneira de ver o mundo.
                    </p>

                    <Link href="/sobre" className="text-link">
                        Conheça o Natura <span>↗</span>
                    </Link>

                    <div className="manifesto-decoration">
                        N
                    </div>
                </section>

                <section className="publish-strip">
                    <div>
                        <span className="eyebrow">
                            VOCÊ ORGANIZA?
                        </span>

                        <h2>
                            Sua próxima descoberta
                            <br />
                            pode começar aqui.
                        </h2>
                    </div>

                    <Link
                        href="/admin"
                        className="button button-light"
                    >
                        Publique seu evento <span>↗</span>
                    </Link>
                </section>
            </main>

            <footer className="footer">
                <Link
                    href="/"
                    className="brand footer-brand"
                >
                    <span className="brand-icon">✳</span>

                    <span>
                        NATURA
                        <small>CIÊNCIA EM MOVIMENTO</small>
                    </span>
                </Link>

                <span>
                    Curiosidade é só o começo.
                </span>

                <div>
                    <Link href="/eventos">
                        Eventos
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
