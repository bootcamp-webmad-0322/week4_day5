const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: String,
    description: String,
    author: [{                                  // El corchete NO es necesario, solo si es un array de ObjectIDs
      type: Schema.Types.ObjectId,
      ref: 'Author'                             // Nombre del modelo referenciado
    }],
    rating: Number
  },
  { timestamps: true }
)

module.exports = model('Book', bookSchema)