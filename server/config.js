const PORT = process.env.PORT || 3000;
const ORIGINS = process.env.ORIGINS || '*:*';
const KEY = 'unique';

const databaseMDB = {
    'secret': 'homehomewearehere',
    'databaseURL': 'mongodb+srv://tutor:mm000207@cluster0.nipwz.mongodb.net/tutor-live?retryWrites=true&w=majority'
};

const CHAT_NAMESPACE = '/video-chat';
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

module.exports = {
    PORT,
    ORIGINS,
    databaseMDB,
    KEY
}
