require('dotenv').config();
const path = require('path');
const express = require('express');

const { Configuration, OpenAIApi } = require("openai");

    // Create server
const app = express()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => { console.log(`Server started on ${PORT}`)})

    // every incoming request will be formatted in JSON
app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => res.sendFile(__dirname, '../', 'build', 'index.html'))

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

const openai = new OpenAIApi(configuration);

app.post('/summarize', async (req, res) => {
    const { prompt } = req.body;

    try { 
        console.log('Incoming request:', req.body);

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ error: 'Prompt is required' });
          }
      
        const wordCount = prompt.trim().split(' ').length;
        if (wordCount < 50 || wordCount > 400) {
        return res.status(400).json({ error: 'Text must be between 50 and 400 words' });
        }

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ 
                role: 'system', 
                content: 'You are a text summarizer.' 
            },{ 
                role: 'user', 
                content: 'Summarize the following text:' 
            },{
                role: 'user',
                content: prompt
            }],
        });

        const response = completion.data.choices[0].message;
        res.json({ content: response.content })

    } catch (error) {
        console.error(error);
    }
})



