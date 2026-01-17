export interface User {
  id: string;
  username: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UsernameValidation {
  available: boolean;
  message: string;
}

export interface SearchedUser {
  message: string;
  searchedUser: {
    id: string;
    email: string;
    username: string;
  } | null;
  loading: boolean;
  error: string | null;
}

export interface ReceiverDetails {
  id: string;
  username: string;
  email: string;
}

export interface ConversationData {
  id: string;
  receiver:
    | {
        id: string;
        username: string;
      }
    | undefined;

  lastMessage: string | null;
  lastMessageAt: string;
}
