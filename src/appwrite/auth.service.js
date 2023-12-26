import conf from '../conf/conf';

import { Client, Account, ID } from 'appwrite';

/**
 * Creating a class to enable all appwrite related authentication services in one wrapper
 * We do this to add a layer of abstraction from the rest of the code to our backend service
 * This makes our frontend free of any unneccessary coupling with a particular vendor
 * If for any reason in the future, we need to change the vendor, we can just come and alter this service class.
 * Exporting an instance of this class to maintain singleton concept.
 * We can directly call the methods of the class using the instance that has been exported.
 */
class AuthService {
  client = new Client();
  account;

  // Creating a connection to the backend service (here appwrite)
  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  // Methods to facilitate authentication utilities
  // Method to create a user
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);

      // If the user account is created, we are logging them in directly
      if (userAccount) {
        return this.login(email, password);
      } else {
        // If the account creation was unsuccessful for some reason, we return null/undefined
        // We will handle this in our frontend
        return userAccount;
      }
    } catch (error) {
      console.log('Appwrite service :: createAccount :: error', error);
    }
  }

  // Method to login a user
  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log('Appwrite service :: login :: error', error);
    }

    // If login fails, we return null
    return null;
  }

  // Get the current logged in user data
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('Appwrite service :: getCurrentUser :: error', error);
    }

    // If we cannot fetch the current user data, return null
    return null;
  }

  // Logout the user
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log('Appwrite service :: logout :: error', error);
    }
  }
}

const authService = new AuthService();

export default authService;
