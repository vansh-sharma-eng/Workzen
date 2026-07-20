import { useCallback, useEffect, useState } from "react";
import { readTable, writeTable, subscribeTable } from "./localDb";

/**
 * Shared, live-updating table backed by localStorage. Any component using
 * the same `key` (in any role's dashboard) sees the same rows and stays in
 * sync when another role adds/edits/deletes something.
 *
 * @returns [rows, setRows] — setRows both updates local state and persists.
 */
export function useLocalTable(key, fallback = []) {
  const [rows, setRowsState] = useState(() => readTable(key, fallback));

  useEffect(() => {
    return subscribeTable(key, () => setRowsState(readTable(key, fallback)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const setRows = useCallback(
    (updater) => {
      setRowsState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        writeTable(key, next);
        return next;
      });
    },
    [key]
  );

  return [rows, setRows];
}
