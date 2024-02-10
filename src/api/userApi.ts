import { getBearerToken, jsonOrThrow } from "../utils/apiUtils";
import config from "./config";

const baseURL = config.baseURL;

export type User =
  | {
      id: string;
      avatar: string;
      firstname: string;
      lastname: string;
      username: string;
      email: string;
      password: string;

      isNotOk: false;
    }
  | {
      isNotOk: true;
      isLoading: boolean;
      error: unknown;
    };

export const getUser = async (): Promise<User> => {
  const response = await fetch(`${baseURL}/auth/whoami`, {
    headers: { Authorization: getBearerToken() },
  });
  const json = await jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

type SignUpData = {
  avatar?: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export const signUp = async (data: SignUpData): Promise<User> => {
  const response = await fetch(`${baseURL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

export const signIn = async (
  email: string | undefined,
  password: string | undefined
): Promise<{ token: string }> => {
  if (!email || !password) throw new Error("Email and password are required");

  const response = await fetch(`${baseURL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return jsonOrThrow(response);
};

export const addDeposit = async (amount: number): Promise<User> => {
  const response = await fetch(`${baseURL}/user/deposit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: getBearerToken(),
    },
    body: JSON.stringify({ amount }),
  });
  const json = jsonOrThrow(response);
  return { ...json, isNotOk: false };
};

export const updateProfileAvatar = async (
  avatar: File | null
): Promise<boolean> => {
  if (!avatar) throw new Error("No avatar provided");

  // TODO: wait for backend to fix
  const user = await getUser();
  const userId = !user.isNotOk ? user.id : "";
  //

  const formData = new FormData();
  formData.append("avatarFile", avatar);

  const response = await fetch(`${baseURL}/user/${userId}/avatar`, {
    method: "PATCH",
    headers: {
      // "Content-Type": "multipart/form-data",
      Authorization: getBearerToken(),
    },
    body: formData,
  });
  const json = await jsonOrThrow(response);
  return json;
};
