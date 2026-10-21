const nomesObrigatorios = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];

export function carregarAmbiente(arquivoDeConfiguracao) {
  if (arquivoDeConfiguracao) {
    try { process.loadEnvFile(arquivoDeConfiguracao); }
    catch { throw new Error(`Não foi possível carregar o arquivo de configuração: ${arquivoDeConfiguracao}. Copie .env.example para .env e configure os dados.`); }
  }
  const ausentes = nomesObrigatorios.filter(nome => typeof process.env[nome] !== 'string' || process.env[nome].trim() === '');
  if (ausentes.length) throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
  return { nomeAluno: process.env.NOME_ALUNO, turma: process.env.TURMA, porta: Number(process.env.PORT), ambiente: process.env.NODE_ENV || 'development' };
}
