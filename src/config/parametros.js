module.exports = {
    IP: 'localhost',
    PUERTO: process.env.NODE_ENV == 'development' ? 5555 : 8081, // se cambia a 3112 cuando ya es desarrollo
    URL: `http://${this.IP}:${this.PUERTO}`
}