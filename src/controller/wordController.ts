import { Request, Response } from 'express';
import WordPairModel from '../models/WordPairModel';

export const wordController = (req: Request, res: Response): void => {
    const word = req.query.word as string || '';
    let transformedWord = '';

    if (!word) {
        res.status(400).send({ error: 'Input is empty!' });
        return;
    }

    for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (char >= 'a' && char <= 'z') {
            transformedWord += char.toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
            transformedWord += char.toLowerCase();
        } else {
            transformedWord += char;
        }
    }

    transformedWord = transformedWord.split('').reverse().join('');

    const wordPair = new WordPairModel({
        word,
        mirroredWord: transformedWord
    });

    wordPair.save();

    res.status(200).send({ transformed: transformedWord })
}