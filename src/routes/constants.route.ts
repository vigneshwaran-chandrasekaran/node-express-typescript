import express from 'express';
import { getConstants } from '../controllers/constant.controller';

const router = express.Router();

router.get('/', [], getConstants);

export default router;
