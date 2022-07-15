import DBClient from "./db.js";
import admin from 'firebase-admin'
import { firebaseData } from '../../../config.js'

class FirebaseClient extends DBClient {
    constructor() {
        super()
    }

    static admin = admin.initializeApp({
        credential: admin.credential.cert(firebaseData),
        databaseURL: "https://basefirebase-b567c-firebase-adminsdk-hnuqn-d153643a45.com"
      });

    async connect() {
        try {
            this.db = admin.firestore()
            this.connected = true
        }
        catch(err) {
            throw new Error(`Error al conectar con Firebase: ${err}`)
        }
    }
    async disconnect() {
        try {
            this.db.terminate()
            this.connected = false
        }
        catch(err) {
            throw new Error(`Error al desconectar con Firebase: ${err}`)
        }
    }
}

export default FirebaseClient