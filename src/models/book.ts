import { Schema, model } from 'mongoose';

interface IBook {
  title: string;
  author: string;
  genre: string;
  published: string;
  pages: string;
  shortDescription: string;
  image: string;
}

export const checkBookInterface = (obj: any) => {
  const required: string[] = [
    'title',
    'author',
    'genre',
    'published',
    'pages',
    'shortDescription',
  ];
  for (let i = 0; i < required.length; i++) {
    if (!obj[required[i]]) return { error: true, field: required[i] };
  }
  return { error: false };
};

export const validateImageLink = (imageLink: string) => {
  const linkRegex = new RegExp(/(https?:\/\/.*\.(?:png|jpe?g|webp|gif))/i);
  return linkRegex.test(imageLink);
};

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
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
