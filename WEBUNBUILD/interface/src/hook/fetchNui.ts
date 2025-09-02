import { isEnvBrowser } from "@/utils";

export async function fetchNui<T = unknown>(
  eventName: string,
  data?: unknown,
  mock?: { data: T; delay?: number }
): Promise<T> {
  if (isEnvBrowser()) {
    console.log(eventName, data)
    if (!mock) return await new Promise((resolve) => resolve);
    await new Promise((resolve) => setTimeout(resolve, mock.delay));
    console.log(JSON.stringify(mock.data))
    return mock.data;
  }

  const options = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  const resourceName = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "nui-frame-app";
  const resp = await fetch(`https://${resourceName}/${eventName}`, options);

  return (await resp.json()) as T;
}