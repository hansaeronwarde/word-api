import { Request, Response } from 'express';
import { wordController } from '../controller/wordController';
import WordPairModel from '../models/WordPairModel';

jest.mock('../models/WordPairModel');

describe('wordController', () => {
    it('should handle empty input', () => {
        const req = { query: {} } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        wordController(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith({ error: 'Input is empty!' });
        expect(WordPairModel).not.toHaveBeenCalled();
    });

    it('should save word pair to database and return transformed word', () => {
        const req = { query: { word: 'fOoBar25' } } as unknown as Request;
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        } as unknown as Response;

        wordController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith({ transformed: '52RAbOoF' });

        expect(WordPairModel).toHaveBeenCalledWith({ word: 'fOoBar25', mirroredWord: '52RAbOoF' });
        expect(WordPairModel.prototype.save).toHaveBeenCalled();
    });
});
