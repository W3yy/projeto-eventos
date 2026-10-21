import { Router } from 'express';
import * as EventoController from '../controllers/EventoController.js';

export const eventoRouter = Router();
eventoRouter.get('/', EventoController.listar);
eventoRouter.get('/:id', EventoController.buscarPorId);
eventoRouter.post('/', EventoController.criar);
eventoRouter.put('/:id', EventoController.atualizar);
eventoRouter.patch('/:id', EventoController.atualizar);
eventoRouter.delete('/:id', EventoController.excluir);
