import bodyParser from 'body-parser';
import express from 'express';
const cors = require('cors');
import mongoose from 'mongoose';
import BookModel, { checkBookInterface } from './models/book';
const dotenv = require('dotenv');

if (process.env.NODE_ENV !== 'production') dotenv.config();
const port = process.env.PORT || '8000';
const app = express();

const checkBooksBody = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { error, field } = checkBookInterface(req.body);
  if (error)
    return res.status(400).json({
      error: `Body must contain ${field}.`,
    });
  next();
};

app.use(bodyParser.json());
app.use(cors());
app.get('/', (_, res) => res.redirect('/books'));
app
  .route('/books')
  .get((_, res) => {
    BookModel.find()
      .sort([['title', 1]])
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  })
  .post(checkBooksBody, (req, res) => {
    const book = new BookModel({
      title: req.body?.title,
      pages: req.body?.pages,
      published: req.body?.published,
      image: req.body?.image,
      shortDescription: req.body?.shortDescription,
    });
    book
      .save()
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  });

app
  .route('/books/:id')
  .get((req, res) => {
    BookModel.findById({ _id: req.query.id })
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  })
  .patch((req, res) => {
    const update = { ...req.body };
    BookModel.updateOne(
      { _id: req.params.id },
      {
        $set: update,
      }
    )
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  })
  .delete((req, res) => {
    BookModel.deleteOne({ _id: req.params.id })
      .then((result) => res.send(result))
      .catch((err) => {
        res.status(500).send(err.message);
        console.log(err);
      });
  });

const dbURI = `mongodb+srv://SampleUser:${process.env.MONGOPASS}@cluster0.pzedf.mongodb.net/digis-test?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI)
  .then(() =>
    app.listen(port, () =>
      console.log('Server listening on port ' + port + '...')
    )
  )
  .catch((err) => console.log(err));
