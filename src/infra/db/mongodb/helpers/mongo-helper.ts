// @ts-ignore
import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  url: null as string,

  async connect(url: string): Promise<void> {
    this.url = url
    const mongoClient = new MongoClient(url)
    this.client = await mongoClient.connect()
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(name: string): Promise<Collection> {
    if (!this.client) await this.connect(this.url)
    return this.client.db().collection(name)
  }
}
