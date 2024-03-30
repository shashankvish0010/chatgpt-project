import express from "express";
const users = require('../models/users')
const router = express.Router();

interface promptType {
    prompt_name: String;
    prompt: String;
}

router.post('/save/prompt/:userid', async (req, res) => {
    const { prompt_name, prompt } = req.body;
    const { userid } = req.params;
    if (!userid) {
        res.json({ success: false, message: "Please login to access." });
    } else {
        if (!prompt_name || !prompt) {
            res.json({ success: false, message: "Provide valid name and prompt." });
        } else {
            const user = await users.findOne({ _id: userid });
            if (user) {
                const chatIndex = await user.prompts.findIndex((prompt: promptType) => prompt.prompt_name === prompt_name);
                if (chatIndex !== -1) {
                    res.json({ success: false, message: "Prompt name already exists." });
                } else {
                    await user.prompts.push({ prompt_name, prompt });
                    const result = await user.save();
                    if (result) {
                        res.json({ success: true, message: "Prompt saved." });
                    }
                }
            }
        }
    }
})

module.exports = router;