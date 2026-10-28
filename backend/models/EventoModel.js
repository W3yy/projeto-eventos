
let eventos = [];
let proximoId = 1;

const camposAtualizaveis = [
  'titulo',
  'descricao',
  'categoria',
  'data_evento',
  'horario',
  'local',
  'organizador',
  'imagem_url',
  'status'
];

export async function listar({
  busca = '',
  categoria = '',
  status = '',
  pagina = 1,
  limite = 10
} = {}) {
  const termo = String(busca).toLowerCase();

  let resultado = eventos.filter((evento) => {
    const correspondeBusca =
      !termo ||
      [evento.titulo, evento.descricao, evento.local, evento.organizador]
        .some((valor) => String(valor || '').toLowerCase().includes(termo));

    const correspondeCategoria =
      !categoria || evento.categoria === categoria;

    const correspondeStatus =
      !status || evento.status === status;

    return correspondeBusca && correspondeCategoria && correspondeStatus;
  });

  resultado.sort((a, b) =>
    String(a.data_evento).localeCompare(String(b.data_evento))
  );

  const total = resultado.length;
  const paginaAtual = Math.max(1, Number(pagina) || 1);
  const limiteAtual = Math.max(1, Number(limite) || 10);
  const inicio = (paginaAtual - 1) * limiteAtual;

  resultado = resultado.slice(inicio, inicio + limiteAtual);

  return { eventos: resultado, total };
}

export async function buscarPorId(id) {
  return eventos.find((evento) => evento.id === Number(id)) || null;
}

export async function criar(dados) {
  const evento = {
    id: proximoId++,
    titulo: dados.titulo,
    descricao: dados.descricao,
    categoria: dados.categoria,
    data_evento: dados.data_evento,
    horario: dados.horario || null,
    local: dados.local,
    organizador: dados.organizador || null,
    imagem_url: dados.imagem_url || null,
    status: dados.status || 'agendado',
    criado_em: new Date().toISOString()
  };

  eventos.push(evento);

  return evento;
}

export async function atualizar(id, dados) {
  const indice = eventos.findIndex(
    (evento) => evento.id === Number(id)
  );

  if (indice === -1) return null;

  const atualizados = Object.fromEntries(
    Object.entries(dados).filter(([chave]) =>
      camposAtualizaveis.includes(chave)
    )
  );

  eventos[indice] = {
    ...eventos[indice],
    ...atualizados
  };

  return eventos[indice];
}

export async function excluir(id) {
  const indice = eventos.findIndex(
    (evento) => evento.id === Number(id)
  );

  if (indice === -1) return false;

  eventos.splice(indice, 1);

  return true;
}
