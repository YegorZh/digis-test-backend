import { Schema, model } from 'mongoose';

interface IBook {
  title: string;
  published: string;
  pages: string;
  image: string;
  shortDescription: string;
}

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    published: {
      type: String,
      required: true,
    },
    pages: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    shortDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const BookModel = model<IBook>('Book', bookSchema);
export default BookModel;
