import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { eventoRouter } from './routes/eventoRoutes.js';

export const app = express();
app.use(helmet());
const origensPermitidas = (process.env.CORS_ORIGENS || 'http://localhost:3000,http://localhost:3001,http://localhost:5500,http://127.0.0.1:5500').split(',').map(o => o.trim());
app.use(cors({ origin(origem, callback) { if (!origem || origensPermitidas.includes(origem)) return callback(null, true); return callback(new Error('Origem não permitida pelo CORS.')); }, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/check', (_req, res) => res.status(200).json({ status: 'ok', mensagem: 'API de Eventos de Ciências da Natureza funcionando.' }));
app.get('/api', (_req, res) => res.json({ nome: 'API de Eventos de Ciências da Natureza', versao: '1.0.0', rotas: { eventos: '/api/eventos', verificacao: '/api/check' } }));
app.use('/api/eventos', eventoRouter);
app.use((req, res) => res.status(404).json({ sucesso: false, erro: `A rota ${req.method} ${req.originalUrl} não existe.` }));
app.use((erro, _req, res, _next) => { console.error('Erro de servidor:', erro.message); res.status(erro.status || 500).json({ sucesso: false, erro: erro.message || 'Falha interna do servidor.' }); });
