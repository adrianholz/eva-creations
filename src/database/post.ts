import mongoose from 'mongoose';

export interface PostDocument extends mongoose.Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Post || mongoose.model<PostDocument>('Post', PostSchema);