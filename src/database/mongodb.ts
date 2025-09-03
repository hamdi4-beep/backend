import mongoose from "mongoose"
import { DB_URI } from "../../config/env"

if (!DB_URI)
    throw Error('The DB_URI is absolutely required to connect to the database')

async function connect_to_db() {
    try {
        await mongoose.connect(DB_URI as string)
        console.log('Connected to the database!')
    } catch (err) {
        console.error(err)
    }
}

export default connect_to_db