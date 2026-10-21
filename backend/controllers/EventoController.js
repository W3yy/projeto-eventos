import * as EventoService from '../services/EventoService.js';

function tratarErro(erro, res, next) {
  if (erro instanceof TypeError) return res.status(400).json({ sucesso: false, erro: erro.message });
  if (erro.status === 404 || erro.message.includes('não encontrado')) return res.status(404).json({ sucesso: false, erro: erro.message });
  return next(erro);
}

export async function listar(req, res, next) {
  try {
    const resultado = await EventoService.listar(req.query);
    res.status(200).json({ sucesso: true, dados: resultado.eventos, paginacao: resultado.paginacao });
  } catch (erro) { tratarErro(erro, res, next); }
}
export async function buscarPorId(req, res, next) {
  try { res.json({ sucesso: true, dados: await EventoService.buscarPorId(req.params.id) }); }
  catch (erro) { tratarErro(erro, res, next); }
}
export async function criar(req, res, next) {
  try { res.status(201).json({ sucesso: true, mensagem: 'Evento cadastrado com sucesso.', dados: await EventoService.criar(req.body) }); }
  catch (erro) { tratarErro(erro, res, next); }
}
export async function atualizar(req, res, next) {
  try { res.json({ sucesso: true, mensagem: 'Evento atualizado com sucesso.', dados: await EventoService.atualizar(req.params.id, req.body) }); }
  catch (erro) { tratarErro(erro, res, next); }
}
export async function excluir(req, res, next) {
  try { await EventoService.excluir(req.params.id); res.status(200).json({ sucesso: true, mensagem: 'Evento excluído com sucesso.' }); }
  catch (erro) { tratarErro(erro, res, next); }
}
