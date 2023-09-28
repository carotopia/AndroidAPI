import app from './app.js'
import {connectDB} from './db.js'


connectDB()
app.listen(4002)
console.log('Server on port', 4002);