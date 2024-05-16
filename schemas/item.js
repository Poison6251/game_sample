import mongoose from 'mongoose';

// Items에 대한 정보를 나타내는 스키마를 정의합니다.
const itemsSchema = new mongoose.Schema({
  itemId: {
    type: Number,
    required: true, 
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
  },
  price: {
    type: Number,
  },
  hp: {
    type: Number,
  },
  attack:{
    type:Number,
  },
});

// 위에서 정의한 스키마를 이용하여 'Items'라는 이름의 모델을 생성합니다.
export default mongoose.model('Items', itemsSchema);