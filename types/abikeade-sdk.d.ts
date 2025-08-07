declare module 'abikeade-sdk' {
  export class Admin {
    constructor();
  }
  
  export class Client {
    constructor();
    account: {
      createAccount(options: {
        formData: {
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
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      login(options: {
        formData: {
          username: string;
          password: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      forgotPassword(options: {
        formData: {
          email: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      loginStatus(options: {
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      getProfile(options: {
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      updateProfile(options: {
        formData: {
          phone_number?: string;
          institution?: string;
          department?: string;
          level?: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      changePassword(options: {
        formData: {
          old_password: string;
          new_password: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
    };
  }
}
