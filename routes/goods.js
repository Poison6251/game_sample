import express from 'express';
import Items from '../schemas/item.js';
import CharInfo from '../schemas/character_info.js';
import mongoose from 'mongoose';

// Express.js의 라우터를 생성합니다.
const router = express.Router();

/** 상품 등록 **/
// localhost:4000/api/items POST
router.post('/items', async (req, res) => {
    const { itemId, name, category, price, hp, attack } = req.body;

    const items = await Items.find({ itemId }).exec();
    if (items.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '이미 존재하는 데이터입니다.' });
    }

    const createditems = await Items.create({
        itemId,
        name,
        category,
        price,
        hp,
        attack,
    });

    return res.status(201).json({ items: createditems });
});

router.get('/items/get/:itemId', async (req, res) => {
    const params = req.params;
    const id = parseInt(params.itemId);
    const items = await Items.findOne({ itemId: id });
    if(items){
        return res.status(200).json({ items }).exec(); 
    }
    else{
        return res
            .status(400)
            .json({ success: false, errorMessage: '없는 데이터입니다.' });
    }
});

router.get('/items/get', async (req, res) => {
    const items = await Items.find();
    if(items.length){
        return res.status(200).json({ items }); 
    }
    else{
        return res
            .status(400)
            .json({ success: false, errorMessage: '없는 데이터입니다.' });
    }
});

router.get('/char/get', async (req, res) => {
    const char = await CharInfo.find();
    return res.status(200).json({ char }); 
});

router.post('/char', async (req, res) => {
    const { name,id,chestplate,leggings,boots,attack,hp } = req.body;

    const char = await CharInfo.find({ name }).exec();
    if (char.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: '이미 존재하는 데이터입니다.' });
    }

    const createdchar = await CharInfo.create({
        name,
        id,
        chestplate,
        leggings,
        boots,
        attack,
        hp,
    });

    return res.status(201).json({ name,id });
});

router.post('/char/equip/chestplate/:itemId/:charId',async(req,res) => {
    const params = req.params;
    const id = parseInt(params.itemId);
    const items = await Items.findOne({ itemId: id });
    if(!items){
        return res
            .status(400)
            .json({ success: false, errorMessage: '아이템이 존재하지 않는 데이터입니다.' });
    }

    const charId = parseInt(params.charId);
    const char = await CharInfo.findOne({id: charId});
    if(!char){
        return res
            .status(400)
            .json({ success: false, errorMessage: '캐릭터가 존재하지 않는 데이터입니다.' });
    }

    char.chestplate = id;
    char.hp += items.hp;
    char.attack += items.attack;
    char.save();

    return res.status(200).json({ char }); 
});

export default router;
