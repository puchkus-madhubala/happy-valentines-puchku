export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

export interface ValentineDay {
  id: number;
  name: string;
  date: string;
  icon: string;
  theme: Theme;
  title: string;
  message: string;
  interactiveElement: string;
}

export interface AuthConfig {
  username: string;
  secretAnswer: string;
  secretQuestion: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}
