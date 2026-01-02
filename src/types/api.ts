export const BASE_URL = 'https://api.chalsawari.com';

export const ENDPOINTS = {
  login: '/auth/login',
  register: '/auth/register',
  getVehicles: '/vehicles',
  createOrder: '/orders/create',
};


// RESPONSES 
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}

export interface Vehicle {
  id: string;
  type: string;
  plateNumber: string;
  driverId: string;
}

export interface OrderRequest {
  pickupLocation: string;
  dropoffLocation: string;
  vehicleId: string;
}

export interface OrderResponse {
  orderId: string;
  status: 'pending' | 'confirmed' | 'completed';
}

// ERRORS
export interface ApiError {
  statusCode: number;
  message: string;
  details?: string;
}
