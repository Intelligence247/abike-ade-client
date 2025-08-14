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
    site: {
      featuredImages(options: {
        params?: { per_page?: number; page?: number };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      roomList(options: {
        params?: { 
          per_page?: number; 
          page?: number;
          search?: string;
          min_price?: number;
          max_price?: number;
          room_type?: string;
          availability?: string;
          amenities?: string[];
          id?: number;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      sendMessage(options: {
        formData: {
          email: string;
          name: string;
          subject: string;
          message: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
    };
    room: {
      book(options: {
        formData: { room_id: number };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      makePayment(options: {
        formData: {
          paystack_public_key: string;
          email: string;
          amount: number;
          reference: string;
        };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      verifyPayment(options: {
        params: { reference: string };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
    };
    rent: {
      history(options: {
        params?: { reference?: string; status?: string };
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
      generateAgreement(options: {
        onSuccess: (data: any) => void;
        onError: (error: any) => void;
      }): Promise<any>;
    };
  }
}
