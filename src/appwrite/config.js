import config from "../config/conf";
import { Client, Storage, Query, TablesDB, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: config.appwriteDataBaseId,
        tableId: config.appwriteTableId,
        slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
          userId: userId,
        },
      });
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: config.appwriteDataBaseId,
        tableId: config.appwriteTableId,
        slug,
        data: {
          title: title,
          content: content,
          featuredImage: featuredImage,
          status: status,
        },
      });
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: config.appwriteDataBaseId,
        tableId: config.appwriteTableId,
        slug,
      });
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: config.appwriteDataBaseId,
        tableId: config.appwriteTableId,
        slug,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPost :: error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", true)]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: config.appwriteDataBaseId,
        tableId: config.appwriteTableId,
        queries: queries,
      });
    } catch (error) {
      console.log("Appwrite serive :: getPosts :: error", error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        filedId: fileId,
      });
      return true;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
    }
  }

  getFilePreview(fileId) {
    return this.bucket.getFilePreview({
      bucketId: config.appwriteBucketId,
      fileId: fileId,
    });
  }

  getFileDownload(filedId) {
    return this.bucket.getFileDownload({
      bucketId: config.appwriteBucketId,
      fileId: filedId,
    });
  }
}

const service = new Service();
export default service;
