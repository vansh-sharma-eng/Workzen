import { useState } from "react";
import { readTable, writeTable } from "./localDb";

/**
 * Persists a per-user settings object to localStorage, keyed by user id.
 * Falls back to `defaults` (merged with any live fields, e.g. real name/
 * email from the backend) on first load.
 */
export function useUserSettings(userKey, defaults) {
  const key = `wz_settings:${userKey || "guest"}`;
  const [value, setValue] = useState(() => {
    const stored = readTable(key, null);
    return stored ? { ...defaults, ...stored } : defaults;
  });
  const [saved, setSaved] = useState(false);

  const update = (patch) => {
    setValue((prev) => {
      const next = { ...prev, ...patch };
      return next;
    });
    setSaved(false);
  };

  const save = () => {
    writeTable(key, value);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return { value, update, save, saved };
}
