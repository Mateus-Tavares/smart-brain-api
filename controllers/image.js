const Clarifai = require('clarifai');
const app = new Clarifai.App({
 apiKey: 'b065115f493b4f53944b6e4e815d3dc3'
});

const handleClarifai = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('Problem with Clarifai'));
}

handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable to connect to server.'));
}

module.exports = {
  handleImage,
  handleClarifai
}
