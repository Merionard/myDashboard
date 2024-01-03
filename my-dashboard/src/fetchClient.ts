type FetchMethod = "GET" | "POST" | "DELETE";
export const client = async <T>(
  url: string,
  method: FetchMethod,
  body?: unknown,
  returnType?: T,
  errorMsg = "Une erreur est survenue"
) => {
  let fetchParam: RequestInit | undefined = undefined;
  if (method === "POST" || method === "DELETE") {
    fetchParam = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  const response = await fetch(url, fetchParam);
  if (!response.ok) {
    const msg = await response.text();
    console.log(msg);
    throw new Error(errorMsg);
  }
  const result = await response.json();
  if (result && returnType) {
    return result as T;
  }
  return null;
};
