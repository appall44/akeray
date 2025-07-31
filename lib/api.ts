// API utility functions for frontend-backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Request failed' };
      }

      return { data };
    } catch (error) {
      console.error('API request error:', error);
      return { error: 'Network error' };
    }
  }

  // Auth methods
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login-admin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async loginOwner(credentials: { email: string; password: string }) {
    return this.request('/auth/login-owner', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async loginTenant(credentials: { email: string; password: string }) {
    return this.request('/auth/login-tenant', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signupOwner(data: any) {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'ownershipProof' && data[key]) {
        formData.append(key, data[key]);
      } else if (Array.isArray(data[key])) {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, data[key]);
      }
    });

    return fetch(`${this.baseURL}/auth/register-owner`, {
      method: 'POST',
      body: formData,
    }).then(res => res.json());
  }

  async signupTenant(data: any) {
    return this.request('/auth/signup-tenant', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Properties methods
  async getProperties(token: string) {
    return this.request('/properties', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async createProperty(data: any, token: string) {
    const formData = new FormData();
    
    // Handle images
    if (data.images && data.images.length > 0) {
      data.images.forEach((image: File) => {
        formData.append('images', image);
      });
    }

    // Handle other fields
    Object.keys(data).forEach(key => {
      if (key !== 'images') {
        if (Array.isArray(data[key])) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, JSON.stringify(data[key]));
        }
      }
    });

    return fetch(`${this.baseURL}/properties`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }).then(res => res.json());
  }

  async getPropertyStats(token: string) {
    return this.request('/properties/stats/overview', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Users methods
  async getUsers(token: string) {
    return this.request('/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async getPendingRegistrations(token: string) {
    return this.request('/owner/pending-owners', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  async approveOwner(id: number, token: string) {
    return this.request(`/owner/verify-owner/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  // Export methods
  async exportToPDF(endpoint: string, token: string) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('PDF export error:', error);
      throw error;
    }
  }

  async exportToExcel(endpoint: string, token: string) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `export-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Excel export error:', error);
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;