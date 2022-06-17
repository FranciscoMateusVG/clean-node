// @ts-ignore
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    const mongoClient = new MongoClient(process.env.MONGO_URL)
    this.client = await mongoClient.connect()
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },
  getCollection(name: string): Collection {
    return this.client.db().collection(name)
  }
}
