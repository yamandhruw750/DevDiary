import config from "../config/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount() {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        email: "email@example.com",
        password: "<Password>",
      });
      if (user) {
        //call another method
        this.loginAccount();
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  }

  async loginAccount() {
    try {
      return await this.account.createEmailPasswordSession({
        email: "email@example.com",
        password: "password",
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service:: getCurrentUser :: error", error);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  }
}

const authService = new AuthService();

export default authService;
