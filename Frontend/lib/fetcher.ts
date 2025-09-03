const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface FetcherOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export async function fetcher<T>(
  endpoint: string,
  options: FetcherOptions = {}
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  // Build URL with params
  const url = new URL(endpoint, BASE_URL);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }

  // Add default headers
  const headers = new Headers(fetchOptions.headers);
  if (!headers.has('Content-Type') && fetchOptions.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(url.toString(), {
    ...fetchOptions,
    headers,
    credentials: 'include', // Include cookies for auth
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `HTTP ${response.status}`);
  }

  // Handle empty responses
  const text = await response.text();
  if (!text) return {} as T;

  try {
    return JSON.parse(text);
  } catch {
    return text as unknown as T;
  }
}