import { criarPool } from '../config/database.js';

const pool = criarPool();
const campos = 'id, titulo, descricao, categoria, data_evento, horario, local, organizador, imagem_url, status, criado_em';

export async function listar({ busca = '', categoria = '', status = '', pagina = 1, limite = 10 } = {}) {
  const filtros = [];
  const valores = [];
  if (busca) {
    filtros.push('(titulo LIKE ? OR descricao LIKE ? OR local LIKE ? OR organizador LIKE ?)');
    valores.push(...Array(4).fill(`%${busca}%`));
  }
  if (categoria) { filtros.push('categoria = ?'); valores.push(categoria); }
  if (status) { filtros.push('status = ?'); valores.push(status); }
  const where = filtros.length ? `WHERE ${filtros.join(' AND ')}` : '';
  const [totalRows] = await pool.execute(`SELECT COUNT(*) AS total FROM eventos_ciencias ${where}`, valores);
  const offset = (pagina - 1) * limite;
  const [eventos] = await pool.execute(`SELECT ${campos} FROM eventos_ciencias ${where} ORDER BY data_evento ASC LIMIT ? OFFSET ?`, [...valores, limite, offset]);
  return { eventos, total: totalRows[0].total };
}

export async function buscarPorId(id) {
  const [rows] = await pool.execute(`SELECT ${campos} FROM eventos_ciencias WHERE id = ?`, [id]);
  return rows[0] || null;
}

export async function criar(dados) {
  const { titulo, descricao, categoria, data_evento, horario = null, local, organizador = null, imagem_url = null, status = 'agendado' } = dados;
  const [result] = await pool.execute(
    'INSERT INTO eventos_ciencias (titulo, descricao, categoria, data_evento, horario, local, organizador, imagem_url, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [titulo, descricao, categoria, data_evento, horario, local, organizador, imagem_url, status]
  );
  return buscarPorId(result.insertId);
}

export async function atualizar(id, dados) {
  const atual = await buscarPorId(id);
  if (!atual) return null;
  const camposAtualizaveis = ['titulo', 'descricao', 'categoria', 'data_evento', 'horario', 'local', 'organizador', 'imagem_url', 'status'];
  const atualizados = { ...atual, ...Object.fromEntries(Object.entries(dados).filter(([chave]) => camposAtualizaveis.includes(chave))) };
  await pool.execute(
    'UPDATE eventos_ciencias SET titulo=?, descricao=?, categoria=?, data_evento=?, horario=?, local=?, organizador=?, imagem_url=?, status=? WHERE id=?',
    [atualizados.titulo, atualizados.descricao, atualizados.categoria, atualizados.data_evento, atualizados.horario || null, atualizados.local, atualizados.organizador || null, atualizados.imagem_url || null, atualizados.status, id]
  );
  return buscarPorId(id);
}

export async function excluir(id) {
  const [result] = await pool.execute('DELETE FROM eventos_ciencias WHERE id = ?', [id]);
  return result.affectedRows > 0;
}
