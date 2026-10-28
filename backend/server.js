
import { carregarAmbiente } from './config/ambiente.js';

const config = carregarAmbiente();

const { app } = await import('./app.js');
const porta = config.porta || 3001;

app.listen(porta, () => {
  console.log(`Natura — Eventos de Ciências rodando em http://localhost:${porta}`);
});
