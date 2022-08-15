const express = require('express');
const app = express();
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

// App use
app.use(express.json({ extended: true }))
app.use('/api/auth/', require('./routes/auth.register'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.route'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000;
async function start() {
    try {
        await mongoose.connect(config.get('mongoUrl'), {})
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1)
    }
}
start()

app.listen(PORT, () => {
    console.log(`app has been started on port ${PORT}`);
}) 