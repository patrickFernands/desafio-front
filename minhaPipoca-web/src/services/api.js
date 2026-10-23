import { getToken, removeToken } from "./storage";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export class ApiError extends Error {
  constructor(message, status, errors) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

// o AuthContext vai registrar o logout aqui depois
let onUnauthorized = () => {};

export function setUnauthorizedHandler(fn) {
  onUnauthorized = fn;
}

export async function request(path, { method = "GET", body } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";

  const token = await getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch só rejeita quando nem chega no servidor
    throw new ApiError("Não foi possível conectar ao servidor", 0);
  }

  // se não vier JSON, data fica null
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    // senha errada no login também dá 401, por isso a exceção
    if (response.status === 401 && path !== "/auth/login") {
      await removeToken();
      onUnauthorized();
    }
    throw new ApiError(
      data?.message ?? "Resposta inesperada do servidor",
      response.status,
      data?.errors,
    );
  }

  return data;
}
