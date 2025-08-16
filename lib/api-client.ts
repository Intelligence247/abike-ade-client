// API Client class to handle all API interactions
export class ApiClient {
  private static instance: ApiClient;
  private admin: any = null;
  private client: any = null;
  private isInitialized = false;
  private AdminClass: any = null;
  private ClientClass: any = null;

  private constructor() {
    // Don't initialize anything on server side
  }

  private async initializeSDK() {
    console.log('API Client: initializeSDK called');
    
    if (this.isInitialized) {
      console.log('API Client: Already initialized, returning');
      return;
    }
    
    try {
      console.log('API Client: Importing SDK...');
      // Only import on client side
      if (typeof window !== 'undefined') {
        const { Admin, Client } = await import('abikeade-sdk');
        console.log('API Client: SDK imported successfully');
        
        this.AdminClass = Admin;
        this.ClientClass = Client;
        this.admin = new Admin();
        this.client = new Client();
        this.isInitialized = true;
        
        console.log('API Client: SDK instances created, isInitialized =', this.isInitialized);
      }
    } catch (error) {
      console.error('API Client: Failed to initialize SDK:', error);
      throw error;
    }
  }

  // Singleton pattern to ensure only one instance
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Ensure SDK is initialized before use
  private async ensureInitialized() {
    console.log('API Client: ensureInitialized called');
    
    if (typeof window === 'undefined') {
      console.error('API Client: Window is undefined (server-side)');
      throw new Error('API Client can only be used on the client side');
    }
    
    console.log('API Client: isInitialized =', this.isInitialized);
    
    if (!this.isInitialized) {
      console.log('API Client: Initializing SDK...');
      await this.initializeSDK();
    }
    
    console.log('API Client: admin =', !!this.admin, 'client =', !!this.client);
    
    if (!this.admin || !this.client) {
      console.error('API Client: Failed to initialize - admin or client is missing');
      throw new Error('API Client failed to initialize');
    }
    
    console.log('API Client: Initialization successful');
  }

  // OTP methods
  async requestOTP(formData: { email: string }) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.account.requestOTP({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      
      return response;
    } catch (error) {
      throw error;
    }
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
      await this.ensureInitialized();
      
      const response = await this.client.account.createAccount({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
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
      await this.ensureInitialized();
      
      const response = await this.client.account.login({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.ensureInitialized();
      
      console.log('API Client: Logging out...');
      
      // Clear any stored data before logout
      this.clearStoredData();
      
      return new Promise((resolve, reject) => {
        this.client.account.logout({
          onSuccess: (data: any) => {
            console.log('API Client: Logout success callback:', data);
            resolve(data);
          },
          onError: (error: any) => {
            console.error('API Client: Logout error callback:', error);
            reject(new Error(error));
          }
        });
      });
    } catch (error) {
      console.error('API Client: logout error:', error);
      // Still clear stored data even if logout fails
      this.clearStoredData();
      throw error;
    }
  }

  // Clear all stored data (cookies, localStorage, sessionStorage)
  private clearStoredData() {
    try {
      console.log('API Client: Clearing stored data...');
      
      if (typeof window !== 'undefined') {
        // Clear localStorage and sessionStorage
        localStorage.clear();
        sessionStorage.clear();
        
        // Clear cookies by setting them to expire
        const cookies = document.cookie.split(";");
        cookies.forEach(cookie => {
          const eqPos = cookie.indexOf("=");
          const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
          
          // Clear with different path and domain combinations
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
        });
        
        console.log('API Client: Stored data cleared successfully');
      }
    } catch (error) {
      console.error('API Client: Error clearing stored data:', error);
    }
  }

  async forgotPassword(formData: {
    email: string;
  }) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.account.forgotPassword({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
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
      await this.ensureInitialized();
      
      const response = await this.client.account.loginStatus({
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getProfile() {
    try {
      await this.ensureInitialized();
      
      console.log('API Client: Getting profile...');
      const response = await this.client.account.getProfile({
        onSuccess: (data: any) => {
          console.log('API Client: Profile success callback:', data);
        },
        onError: (error: any) => {
          console.log('API Client: Profile error callback (user may not be authenticated):', error);
          // Don't throw error for unauthenticated users, just return null
          return null;
        }
      });
      
      console.log('API Client: Profile response:', response);
      return response;
    } catch (error) {
      console.log('API Client: getProfile error (user may not be authenticated):', error);
      // Return null instead of throwing error for unauthenticated users
      return null;
    }
  }

  async updateProfile(formData: {
    phone_number?: string;
    institution?: string;
    department?: string;
    level?: string;
  }) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.account.updateProfile({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
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
      await this.ensureInitialized();
      
      const response = await this.client.account.changePassword({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async uploadIdentity(formData: FormData) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.account.uploadIdentity({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async uploadAgreement(formData: FormData) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.account.uploadAgreement({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Site methods
  async featuredImages(params?: { per_page?: number; page?: number }) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.site.featuredImages({
        params: params,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Room methods
  async roomList(params?: { 
    per_page?: number; 
    page?: number;
    search?: string;
    sort_by?: string;
    room_id?: number; // For single room
  }) {
    try {
      await this.ensureInitialized();
      
      console.log('API Client: roomList called with params:', params);
      
      const response = await this.client.site.roomList({
        params: params,
        onSuccess: (data: any) => {
          console.log('API Client: Room list success callback:', data);
        },
        onError: (error: any) => {
          console.error('API Client: Room list error callback:', error);
          throw new Error(error);
        }
      });
      
      console.log('API Client: Room list response:', response);
      return response;
    } catch (error) {
      console.error('API Client: roomList error:', error);
      throw error;
    }
  }

  async getRoom(roomId: string | number) {
    try {
      await this.ensureInitialized();
      
      console.log('API Client: Fetching room with ID:', roomId);
      
      // Use the roomList endpoint with room_id parameter for single room
      // When room_id is provided, the API returns the room object directly in data field
      const response = await this.client.site.roomList({
        params: { room_id: roomId },
        onSuccess: (data: any) => {
          console.log('API Client: Room fetch success callback:', data);
        },
        onError: (error: any) => {
          console.error('API Client: Room fetch error callback:', error);
          throw new Error(error);
        }
      });
      
      console.log('API Client: Room API response:', response);
      
      // For single room (with room_id), response.data is the room object directly
      // For list (without room_id), response.data is an array
      if (response.status === 'success' && response.data) {
        console.log('API Client: Room data received:', response.data);
        return response; // Return as is since data is already the room object
      }
      
      return response;
    } catch (error) {
      console.error('API Client: getRoom error:', error);
      throw error;
    }
  }

  // Room booking method
  async bookRoom(formData: { room_id: number }) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.room.book({
        formData: formData,
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Room payment method
  async makeRoomPayment(formData: {
    paystack_public_key: string;
    email: string;
    amount: number;
    reference: string;
  }, callbacks?: {
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
  }) {
    try {
      await this.ensureInitialized();
      
      // Call the makePayment method which should automatically open Paystack modal
      const response = await this.client.room.makePayment({
        formData,
        onSuccess: callbacks?.onSuccess || ((data: any) => console.log('Payment success:', data)),
        onError: callbacks?.onError || ((error: any) => console.error('Payment error:', error))
      });

      return response;
    } catch (error: any) {
      console.error('Payment API error:', error);
      throw error;
    }
  }

  // Payment verification method
  async verifyRoomPayment(reference: string) {
    try {
      await this.ensureInitialized();
      
      const response = await this.client.room.verifyPayment({
        params: { reference },
        onSuccess: (data: any) => {
          // Success callback
        },
        onError: (error: any) => {
          throw new Error(error);
        }
      });
      
      return response;
    } catch (error) {
      throw error;
    }
  }

  async checkLoginStatus() {
    try {
      await this.ensureInitialized();
      
      console.log('API Client: Checking login status...');
      
      const response = await this.client.account.loginStatus({
        onSuccess: (data: any) => {
          console.log('API Client: Login status success callback:', data);
        },
        onError: (error: any) => {
          console.error('API Client: Login status error callback:', error);
          throw new Error(error);
        }
      });
      
      console.log('API Client: Login status response:', response);
      return response;
    } catch (error) {
      console.error('API Client: checkLoginStatus error:', error);
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
