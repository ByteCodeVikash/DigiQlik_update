const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFHrJlpu09lo8tBjY2nwEyW4dkTWquIAryTfbPKEBthnqzY014vNZ4IK-EZMOvYd0/exec";

export async function submitToSheets(payload) {
  try {
    const formBody = new URLSearchParams();

    Object.entries(payload).forEach(([key, value]) => {
      formBody.append(key, value ?? "");
    });

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: formBody,
    });

    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      return { success: false, message: text || "Invalid response from server" };
    }
  } catch (error) {
    return {
      success: false,
      message: error?.message || "Failed to fetch",
    };
  }
}
