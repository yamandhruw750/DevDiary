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

  async createAccount({name, email, password }) {
    try {
      const user = await this.account.create({
        userId: ID.unique(),
        name,
        email,
        password,
      });

      if (!user) {
        throw new Error("User creation failed");
      }

      await this.loginAccount({ email, password });

      const currentUser = await this.getCurrentUser();

      return currentUser;
    } catch (error) {
      console.error("Error creating account:", error);
      throw error;
    }
  }

  async loginAccount({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email: email,
        password: password,
      });
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code !== 401) {
        console.log("Appwrite service:: getCurrentUser :: error", error);
      }
      return null;
    }
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
