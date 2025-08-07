import { Admin, Client } from 'abikeade-sdk';

// Initialize the SDK classes
const admin = new Admin();
const client = new Client();

// API Client class to handle all API interactions
export class ApiClient {
  private static instance: ApiClient;
  private admin: Admin;
  private client: Client;

  private constructor() {
    this.admin = new Admin();
    this.client = new Client();
    console.log('API Client initialized');
  }

  // Singleton pattern to ensure only one instance
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Account methods
  async createAccount(formData: {
    first_name: string;
    last_name: string;
    email: string;
    code: string;
    phone_number: string;
    username: string;
    password: string;
    institution: string;
    department: string;
    level: string;
  }) {
    try {
      const response = await this.client.account.createAccount({
        formData: formData,
        onSuccess: (data: any) => {
          console.log('Account created successfully:', data);
        },
        onError: (error: any) => {
          console.error('Account creation failed:', error);
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async login(formData: {
    username: string;
    password: string;
  }) {
    try {
      console.log('Attempting login with:', formData.username);
      const response = await this.client.account.login({
        formData: formData,
        onSuccess: (data: any) => {
          console.log('Login successful:', data);
        },
        onError: (error: any) => {
          console.error('Login failed:', error);
          throw new Error(error);
        }
      });
      console.log('Login response:', response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(formData: {
    email: string;
  }) {
    try {
      const response = await this.client.account.forgotPassword({
        formData: formData,
        onSuccess: (data: any) => {
          console.log('Password reset email sent:', data);
        },
        onError: (error: any) => {
          console.error('Password reset failed:', error);
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async loginStatus() {
    try {
      console.log('Checking login status...');
      const response = await this.client.account.loginStatus({
        onSuccess: (data: any) => {
          console.log('Login status checked:', data);
        },
        onError: (error: any) => {
          console.error('Login status check failed:', error);
          throw new Error(error);
        }
      });
      console.log('Login status response:', response);
      return response;
    } catch (error) {
      console.error('Login status error:', error);
      throw error;
    }
  }

  async getProfile() {
    try {
      console.log('Fetching profile...');
      const response = await this.client.account.getProfile({
        onSuccess: (data: any) => {
          console.log('Profile fetched successfully:', data);
        },
        onError: (error: any) => {
          console.error('Profile fetch failed:', error);
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(formData: {
    phone_number?: string;
    institution?: string;
    department?: string;
    level?: string;
  }) {
    try {
      const response = await this.client.account.updateProfile({
        formData: formData,
        onSuccess: (data: any) => {
          console.log('Profile updated successfully:', data);
        },
        onError: (error: any) => {
          console.error('Profile update failed:', error);
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(formData: {
    old_password: string;
    new_password: string;
  }) {
    try {
      const response = await this.client.account.changePassword({
        formData: formData,
        onSuccess: (data: any) => {
          console.log('Password changed successfully:', data);
        },
        onError: (error: any) => {
          console.error('Password change failed:', error);
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
}

// Export a singleton instance
export const apiClient = ApiClient.getInstance();

// Export types for better TypeScript support
export interface CreateAccountData {
  first_name: string;
  last_name: string;
  email: string;
  code: string;
  phone_number: string;
  username: string;
  password: string;
  institution: string;
  department: string;
  level: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface UpdateProfileData {
  phone_number?: string;
  institution?: string;
  department?: string;
  level?: string;
}

export interface ChangePasswordData {
  old_password: string;
  new_password: string;
}

export interface UserProfile {
  id: number;
  user: {
    username: string;
  };
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  verified: boolean;
  image: string | null;
  institution: string;
  agreement: string | null;
  uploaded_agreement: string | null;
  department: string;
  level: string;
  identity: string | null;
}

export interface ApiResponse {
  message: string;
  status: 'success' | 'error';
  data?: any;
  authenticated?: boolean;
}
