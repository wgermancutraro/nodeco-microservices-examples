const { Schema, model } = require('mongoose');

const cosasSchema = Schema(
  {
    name: String
  },
  { versionKey: false }
);

module.exports = model('Cosa', cosasSchema, 'cosastore');
