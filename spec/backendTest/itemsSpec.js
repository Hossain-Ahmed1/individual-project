import Item from "../../backend/models/items.model.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

describe("Testing Item model",  function() {
    beforeAll(async function() {
        const conn = await mongoose.connect(process.env.MONGO_URI)
    })
    afterAll(async function() {
        const conn = await mongoose.disconnect()
    })
    it("testing getting all items", async function() {
        const items = await Item.find({})
        expect(items.length).toBeGreaterThan(0);
    });
    it ("getting one item", async () => {
        const item = await Item.findById('67fd68eb6c2c7544090edec0')
        expect(item.name).toBe('watch')
    })
});
 