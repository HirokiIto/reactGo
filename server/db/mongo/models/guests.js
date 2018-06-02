/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const GuestSchema = new mongoose.Schema({
  id: String,
  name: String, // 氏名
  age: Number, // 年齢
  sex: String, // 性別
  address: String, // 住所
  comingFrom: String, // 前日に泊まったとこがあれば
  nationality: String, // 国籍
  passportNumber: String, // パスポート番号
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'GuestSchema' collection in the MongoDB database
export default mongoose.model('Guest', GuestSchema);

