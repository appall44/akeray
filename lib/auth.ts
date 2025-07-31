// Authentication utilities for frontend

export interface User {
  id: number;
  email: string;
  role: 'admin' | 'owner' | 'tenant';
  name?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

class AuthManager {
  private static instance: AuthManager;
  private authState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  static getInstance(): AuthManager {
    if (!AuthManager.instance) {
      AuthManager.instance = new AuthManager();
    }
    return AuthManager.instance;
  }

  setAuth(user: User, token: string) {
    this.authState = {
      user,
      token,
      isAuthenticated: true,
    };
    
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user));
      localStorage.setItem('auth_token', token);
    }
  }

  getAuth(): AuthState {
    // Try to restore from localStorage if not in memory
    if (!this.authState.isAuthenticated && typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('auth_user');
      const storedToken = localStorage.getItem('auth_token');
      
      if (storedUser && storedToken) {
        this.authState = {
          user: JSON.parse(storedUser),
          token: storedToken,
          isAuthenticated: true,
        };
      }
    }
    
    return this.authState;
  }

  clearAuth() {
    this.authState = {
      user: null,
      token: null,
      isAuthenticated: false,
    };
    
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_user');
      localStorage.removeItem('auth_token');
    }
  }

  getToken(): string | null {
    return this.getAuth().token;
  }

  getUser(): User | null {
    return this.getAuth().user;
  }

  isAuthenticated(): boolean {
    return this.getAuth().isAuthenticated;
  }

  hasRole(role: string): boolean {
    const user = this.getUser();
    return user?.role === role;
  }
}

export const authManager = AuthManager.getInstance();
export default authManager;