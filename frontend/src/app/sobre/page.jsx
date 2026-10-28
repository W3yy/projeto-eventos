
import Link from "next/link";

export default function Sobre() {
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
            ＋ Publicar evento
          </Link>
        </nav>

        <Link className="mobile-menu" href="/">
          ←
        </Link>
      </header>

      <section className="page-hero">
        <div className="eyebrow">SOBRE O NATURA</div>

        <h1>
          Curiosidade move
          <br />
          <em
            style={{
              color: "#d9f36a",
              fontFamily: "Georgia",
              fontWeight: 400,
            }}
          >
            o mundo.
          </em>
        </h1>

        <p>
          Um espaço para aproximar pessoas das Ciências da Natureza por
          meio de experiências, encontros e descobertas.
        </p>
      </section>

      <main className="section">
        <div className="about-grid">
          <div className="about-art">✳</div>

          <div className="about-copy">
            <div className="eyebrow dark-eyebrow">
              NOSSO PROPÓSITO
            </div>

            <h2
              style={{
                fontFamily: "Manrope",
                fontSize: 38,
                lineHeight: 1.15,
                letterSpacing: "-1.5px",
              }}
            >
              A ciência não acontece só nos livros.
            </h2>

            <p>
              Ela acontece quando olhamos para o céu, investigamos a vida
              ao nosso redor, fazemos perguntas e compartilhamos ideias.
              O Natura reúne eventos de Biologia, Física, Química,
              Astronomia, Meio Ambiente e outras áreas para transformar
              curiosidade em participação.
            </p>

            <p>
              Queremos tornar as experiências científicas mais fáceis de
              descobrir e divulgar, conectando organizadores, estudantes
              e pessoas curiosas.
            </p>

            <Link href="/eventos" className="button button-dark">
              Descobrir eventos ↗
            </Link>
          </div>
        </div>
      </main>

      <section className="publish-strip">
        <div>
          <span className="eyebrow">FAÇA PARTE</span>

          <h2>
            Compartilhe sua
            <br />
            paixão pela ciência.
          </h2>
        </div>

        <Link href="/admin" className="button button-light">
          Publicar um evento ↗
        </Link>
      </section>

      <footer className="footer">
        <Link href="/" className="brand footer-brand">
          <span className="brand-icon">✳</span>
          <span>
            NATURA
            <small>CIÊNCIA EM MOVIMENTO</small>
          </span>
        </Link>

        <div>
          <Link href="/eventos">Eventos</Link>
          <Link href="/admin">Publicar</Link>
        </div>

        <small>© 2026 Natura. Feito para explorar.</small>
      </footer>
    </>
  );
}
