const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../db/firebase/firebase.config.json");
const { formatErrorObject } = require('../../utils/api.utils');
const apiConstants = require('../../utils/constants/api.constants');

const { 
    STATUS: { 
      INTERNAL_ERROR,
      NOT_FOUND
    }
} = apiConstants;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class FirebaseDB {
    constructor(collection) {
        const db = getFirestore();
        this.query = db.collection(`${collection}`);
    }

    async get(id) {
        try {
            const docRef = this.query.doc(`${id}`);
            const doc = await docRef.get();

            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            const docs = querySnapshot.docs;

            return docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async create(data) {
        try {
            const docRef = this.query.doc();

            return await docRef.set(data);
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async update(id, data) {
        try {
            const docRef = this.query.doc(`${id}`);

            return await docRef.update(data);
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }

    async delete(id) {
        try {
            const docRef = this.query.doc(`${id}`);
            
            return await docRef.delete();
        } catch (error) {
            const newError = formatErrorObject(INTERNAL_ERROR.tag, error.message);
            throw new Error(JSON.stringify(newError));
        }
    }
}

module.exports = FirebaseDB;