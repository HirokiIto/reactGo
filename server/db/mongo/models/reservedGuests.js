/**
 * Schema Definitions
 *
 */
import mongoose from 'mongoose';

const ReservedGuestSchema = new mongoose.Schema({
  id: String,
  subscriber: String, // 予約者
  reservedDate: Date, // 予約日
  departureDate: Date, // 出発日
  howManyPeople: { type: Number, min: 1 }, // 何名
  roomNumber: { type: Number, default: 0 }, // 部屋番号
  date: { type: Date, default: Date.now }
});

// Compiles the schema into a model, opening (or creating, if
// nonexistent) the 'ReservedGuestSchema' collection in the MongoDB database
export default mongoose.model('ReservedGuest', ReservedGuestSchema);

