const axios = require('axios');

const symptoms = [
  {
    name: 'sneezing',
    displayName: 'Sneezing'
  },
  {
    name: 'sore-throat',
    displayName: 'Sore Throat'
  },
  {
    name: 'weakness',
    displayName: 'Weakness'
  },
  {
    name: 'loss-of-smell',
    displayName: 'Loss of Smell'
  },
  {
    name: 'loss-of-taste',
    displayName: 'Loss of Taste'
  },
  {
    name: 'chest-pain',
    displayName: 'Persistent Chest Pain'
  },
  {
    name: 'shortness-of-breath',
    displayName: 'Shortness of Breath'
  }
];

symptoms.forEach(symptom => {
  axios
    .post(
      'http://covid19-dev.ap-south-1.elasticbeanstalk.com/symptoms',
      symptom
    )
    .then(console.log);
});
