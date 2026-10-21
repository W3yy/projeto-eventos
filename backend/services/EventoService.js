import * as EventoModel from '../models/EventoModel.js';

const categoriasValidas = ['Biologia', 'Física', 'Química', 'Ciências da Terra', 'Astronomia', 'Meio Ambiente', 'Multidisciplinar'];
const statusValidos = ['agendado', 'em andamento', 'concluido', 'cancelado'];
const obrigatorios = ['titulo', 'descricao', 'categoria', 'data_evento', 'local'];

function validarId(valor) {
  const id = Number(valor);
  if (!Number.isInteger(id) || id <= 0) throw new TypeError('O ID deve ser um número inteiro positivo.');
  return id;
}

function validarDados(dados, parcial = false) {
  if (!dados || typeof dados !== 'object' || Array.isArray(dados)) throw new TypeError('Envie os dados do evento em formato JSON.');
  if (!parcial) {
    const faltando = obrigatorios.filter(campo => typeof dados[campo] !== 'string' || !dados[campo].trim());
    if (faltando.length) throw new TypeError(`Campos obrigatórios: ${faltando.join(', ')}.`);
  }
  for (const campo of ['titulo', 'descricao', 'categoria', 'data_evento', 'local', 'horario', 'organizador', 'imagem_url']) {
    if (campo in dados && dados[campo] !== null && typeof dados[campo] !== 'string') throw new TypeError(`O campo ${campo} deve ser texto.`);
  }
  if (dados.categoria && !categoriasValidas.includes(dados.categoria)) throw new TypeError(`Categoria inválida. Use: ${categoriasValidas.join(', ')}.`);
  if (dados.status && !statusValidos.includes(dados.status)) throw new TypeError(`Status inválido. Use: ${statusValidos.join(', ')}.`);
  if (dados.data_evento && !/^\d{4}-\d{2}-\d{2}$/.test(dados.data_evento)) throw new TypeError('data_evento deve estar no formato AAAA-MM-DD.');
  for (const campo of obrigatorios) if (campo in dados && typeof dados[campo] === 'string') dados[campo] = dados[campo].trim();
}

export async function listar(filtros = {}) {
  const pagina = Number(filtros.pagina ?? 1);
  const limite = Number(filtros.limite ?? 10);
  if (!Number.isInteger(pagina) || pagina < 1) throw new TypeError('pagina deve ser um inteiro positivo.');
  if (!Number.isInteger(limite) || limite < 1 || limite > 100) throw new TypeError('limite deve ser um inteiro entre 1 e 100.');
  if (filtros.status && !statusValidos.includes(filtros.status)) throw new TypeError('Status de filtro inválido.');
  if (filtros.categoria && !categoriasValidas.includes(filtros.categoria)) throw new TypeError('Categoria de filtro inválida.');
  const resultado = await EventoModel.listar({ ...filtros, pagina, limite });
  return { ...resultado, paginacao: { pagina, limite, total: resultado.total, totalPaginas: Math.ceil(resultado.total / limite) } };
}

export async function buscarPorId(valor) {
  const id = validarId(valor);
  const evento = await EventoModel.buscarPorId(id);
  if (!evento) { const erro = new Error(`Evento ${id} não encontrado.`); erro.status = 404; throw erro; }
  return evento;
}

export async function criar(dados) {
  validarDados(dados);
  return EventoModel.criar(dados);
}

export async function atualizar(valor, dados) {
  const id = validarId(valor);
  validarDados(dados, true);
  const evento = await EventoModel.atualizar(id, dados);
  if (!evento) { const erro = new Error(`Evento ${id} não encontrado.`); erro.status = 404; throw erro; }
  return evento;
}

export async function excluir(valor) {
  const id = validarId(valor);
  if (!await EventoModel.excluir(id)) { const erro = new Error(`Evento ${id} não encontrado.`); erro.status = 404; throw erro; }
}
