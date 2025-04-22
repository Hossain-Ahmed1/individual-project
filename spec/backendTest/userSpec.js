import User from "../../backend/models/users.model.js";
import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

describe("Testing User model",  function() {
    beforeAll(async function() {
        const conn = await mongoose.connect(process.env.MONGO_URI)
    })
    afterAll(async function() {
        const conn = await mongoose.disconnect()
    })
    it("testing getting all users", async function() {
        const items = await User.find({})
        expect(items.length).toBeGreaterThan(0);
    });
    it ("getting one user", async () => {
        const item = await User.findById('67f66fe8187c9312c61847db')
        expect(item.name).toBe('hossa')
    })
});
 