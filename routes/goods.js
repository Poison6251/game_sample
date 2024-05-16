import express from 'express';
import Items from '../schemas/item.js';
import mongoose from 'mongoose';

// Express.js의 라우터를 생성합니다.
const router = express.Router();

/** 상품 등록 **/
// localhost:3000/api/items POST
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

router.get('/items/:itemId', async (req, res) => {
    const params = req.params;
    const id = params.itemId;
    console.log(id);
    return res.status(200).json({ id });
});

export default router;
