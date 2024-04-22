
import { Document, Schema, model } from 'mongoose';

export interface IWordPair extends Document {
    word: string;
    mirroredWord: string;

}

const wordPairSchema: Schema = new Schema({
    word: { type: String, required: true },
    mirroredWord: { type: String, required: true }
});


const WordPairModel = model<IWordPair>('Word', wordPairSchema);
export default WordPairModel;