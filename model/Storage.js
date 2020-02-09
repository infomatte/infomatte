const mongoose = require('mongoose');

const pdfSchema = mongoose.Schema({
  register_id: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  file: {
    type: Buffer
  },
  email: {
    type: String
  },
  yearofJoining: {
    type: Number
  },
  autherized: {
    type: String
  },
  branch: {
    type: String
  },
}, {
  timestamps: true
})


module.exports = mongoose.model("Storage", pdfSchema)