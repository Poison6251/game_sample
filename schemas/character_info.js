import mongoose from 'mongoose';

// Items에 대한 정보를 나타내는 스키마를 정의합니다.
const characterInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    unique: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  chestplate: {
    type: Number,
  },
  leggings: {
    type: Number,
  },
  boots: {
    type: Number,
  },
  attack:{
    type:Number,
  },
  hp:{
    type:Number,
  }
});

// 위에서 정의한 스키마를 이용하여 'CharInfo'라는 이름의 모델을 생성합니다.
export default mongoose.model('CharInfo', characterInfoSchema);