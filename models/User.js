import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      unique: [true, 'Email Already Exists'],
      required: [true, 'Email Is Required'],
    },
    password: {
      type: String,
      required: [true, 'Password Is Required'],
    },
    username: {
      type: String,
      required: [true, 'Username Is Required'],
    },
    name: {
      type: String,
      required: [true, 'Name Is Required'],
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;
