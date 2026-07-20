import { useCallback, useEffect, useState } from "react";
import notificationApi from "../api/notificationApi";

const POLL_MS = 30_000;

/** Real notifications, backed by /api/notifications. Polls every 30s so the bell stays fresh without a socket. */
export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const data = await notificationApi.getAll();
      setNotifications(data || []);
      setUnreadCount((data || []).filter((n) => !n.read).length);
    } catch {
      // Silently keep whatever we last had — a bell icon shouldn't throw errors at the user.
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch + poll on mount
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  const markRead = useCallback(async (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
    try {
      await notificationApi.markRead(id);
    } catch {
      load();
    }
  }, [load]);

  const markAllRead = useCallback(async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
    try {
      await notificationApi.markAllRead();
    } catch {
      load();
    }
  }, [load]);

  return { notifications, unreadCount, loading, markRead, markAllRead, refresh: load };
}
