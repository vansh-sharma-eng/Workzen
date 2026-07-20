// src/Components/Admin/Settings/OfficeLocationMap.jsx
//
// Lets Admin manage a LIST of office locations by clicking/dragging pins on a
// real map, instead of hand-editing lat/lng in a config file. Employees pick
// one of these when punching in; AttendanceService checks their location
// against just the one they picked.

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, Search, LocateFixed, Check, Plus, Trash2, Building2, X } from "lucide-react";
import settingsApi from "../../../api/settingsApi";

// Self-contained pin icons (no external marker-image dependency, unlike Leaflet's default which
// needs image files Vite won't resolve automatically) — a small inline SVG per color.
const pinIcon = (color) =>
  new L.DivIcon({
    className: "",
    html: `<svg width="26" height="36" viewBox="0 0 26 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 0C5.8 0 0 5.8 0 13c0 9.75 13 23 13 23s13-13.25 13-23C26 5.8 20.2 0 13 0z" fill="${color}"/>
      <circle cx="13" cy="13" r="5.5" fill="white"/>
    </svg>`,
    iconSize: [26, 36],
    iconAnchor: [13, 36],
    popupAnchor: [0, -34],
  });
const activeIcon = pinIcon("#ef4444");
const otherIcon = pinIcon("#6b7280");

const RecenterOnChange = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);
  return null;
};

const ClickToPlace = ({ onPick }) => {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const emptyDraft = () => ({ id: null, name: "", position: null, radius: 200 });

const OfficeLocationMap = () => {
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [saved, setSaved] = useState(false);

  // The office currently being added or edited. null = nothing selected (list view only).
  const [draft, setDraft] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const result = await settingsApi.getOfficeLocations();
      setOffices(result || []);
    } catch (err) {
      setError(err.message || "Couldn't load office locations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial fetch on mount
    load();
  }, [load]);

  const mapCenter = useMemo(() => {
    if (draft?.position) return draft.position;
    if (offices.length) return [offices[0].latitude, offices[0].longitude];
    return [37.7749, -122.4194];
  }, [draft, offices]);

  const startAdd = () => {
    setDraft(emptyDraft());
    setError("");
  };

  const startEdit = (office) => {
    setDraft({
      id: office.id,
      name: office.name,
      position: [office.latitude, office.longitude],
      radius: office.radiusMeters,
    });
    setError("");
  };

  const cancelEdit = () => {
    setDraft(null);
    setError("");
  };

  const handlePick = (latlng) => {
    if (!draft) return; // ignore map clicks unless actively adding/editing
    setDraft((d) => ({ ...d, position: latlng }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim() || !draft) return;
    setSearching(true);
    setError("");
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(searchTerm)}`
      );
      const results = await res.json();
      if (!results.length) {
        setError("Couldn't find that address. Try a more specific search.");
        return;
      }
      setDraft((d) => ({ ...d, position: [parseFloat(results[0].lat), parseFloat(results[0].lon)] }));
    } catch {
      setError("Address search failed. You can still click the map directly to place the pin.");
    } finally {
      setSearching(false);
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation || !draft) return;
    setLocating(true);
    setError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDraft((d) => ({ ...d, position: [pos.coords.latitude, pos.coords.longitude] }));
        setLocating(false);
      },
      () => {
        setError("Couldn't get your current location. Check your browser's permission for this site.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleSave = async () => {
    if (!draft?.position) {
      setError("Click the map to place a pin for this office first.");
      return;
    }
    if (!draft.name.trim()) {
      setError("Give this office a name.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const payload = {
        name: draft.name.trim(),
        latitude: draft.position[0],
        longitude: draft.position[1],
        radiusMeters: Number(draft.radius),
      };
      if (draft.id) {
        await settingsApi.updateOfficeLocation(draft.id, payload);
      } else {
        await settingsApi.createOfficeLocation(payload);
      }
      setDraft(null);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
      await load();
    } catch (err) {
      setError(err.message || "Couldn't save this office.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError("");
    try {
      await settingsApi.deleteOfficeLocation(id);
      if (draft?.id === id) setDraft(null);
      await load();
    } catch (err) {
      setError(err.message || "Couldn't remove this office.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="border border-[#1E2235] bg-[#10111C] rounded-md overflow-hidden">
      <div className="flex items-center justify-between gap-4 p-2 border-b border-[#1A2138]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-md bg-indigo-950 flex items-center justify-center">
            <MapPin className="text-indigo-500" size={14} />
          </div>
          <div>
            <h3 className="text-white text-sm font-bold">Office Locations</h3>
            <p className="text-[11px] text-slate-500">
              Employees pick one of these to punch in from — they must be within its radius, unless WFH is approved.
            </p>
          </div>
        </div>

        {!draft && (
          <button
            onClick={startAdd}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition"
          >
            <Plus size={13} /> Add Office
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-md p-3">
            {error}
          </div>
        )}

        {saved && !draft && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-sm">
            <Check size={14} /> Saved
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Office list */}
          <div className="lg:col-span-2 space-y-2">
            {loading ? (
              <p className="text-slate-500 text-sm">Loading…</p>
            ) : offices.length === 0 && !draft ? (
              <p className="text-slate-500 text-sm">No office locations yet — add one to get started.</p>
            ) : (
              offices.map((office) => (
                <div
                  key={office.id}
                  className={`flex items-center justify-between gap-2 rounded-md px-3 py-2.5 border transition cursor-pointer ${
                    draft?.id === office.id
                      ? "bg-indigo-500/10 border-indigo-500/40"
                      : "bg-[#131827] border-transparent hover:border-[#272727]"
                  }`}
                  onClick={() => startEdit(office)}
                >
                  <div className="min-w-0">
                    <p className="text-white text-sm font-medium truncate">{office.name}</p>
                    <p className="text-slate-500 text-xs">{office.radiusMeters}m radius</p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(office.id); }}
                    disabled={deletingId === office.id}
                    className="shrink-0 text-slate-500 hover:text-red-400 transition disabled:opacity-50"
                    title="Remove office"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}

            {draft && (
              <div className="bg-[#131827] border border-indigo-500/40 rounded-md p-3 space-y-3 mt-3">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-semibold">
                    {draft.id ? "Edit Office" : "New Office"}
                  </p>
                  <button onClick={cancelEdit} className="text-slate-500 hover:text-white">
                    <X size={14} />
                  </button>
                </div>

                <div className="relative">
                  <Building2 size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={draft.name}
                    onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
                    placeholder="e.g. HQ - Mumbai"
                    className="w-full bg-[#1b1d24] border border-[#272727] rounded-md pl-8 pr-3 py-2 text-sm text-white outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs block mb-1.5">
                    Allowed radius: <span className="text-white font-semibold">{draft.radius}m</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    value={draft.radius}
                    onChange={(e) => setDraft((d) => ({ ...d, radius: e.target.value }))}
                    className="w-full accent-indigo-500"
                  />
                </div>

                <form onSubmit={handleSearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search an address…"
                      className="w-full bg-[#1b1d24] border border-[#272727] rounded-md pl-8 pr-3 py-2 text-xs text-white outline-none focus:border-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={searching}
                    className="px-3 py-2 rounded-md bg-[#1b1d24] border border-[#272727] text-xs text-white hover:border-indigo-500 transition disabled:opacity-60"
                  >
                    {searching ? "…" : "Go"}
                  </button>
                </form>

                <button
                  type="button"
                  onClick={handleUseMyLocation}
                  disabled={locating}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#1b1d24] border border-[#272727] text-xs text-white hover:border-indigo-500 transition disabled:opacity-60"
                >
                  <LocateFixed size={13} />
                  {locating ? "Locating…" : "Use my location"}
                </button>

                <p className="text-[11px] text-slate-500">
                  Click the map, or drag the red pin, to set the exact spot.
                </p>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="w-full px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition disabled:opacity-60"
                >
                  {saving ? "Saving…" : draft.id ? "Save Changes" : "Add Office"}
                </button>
              </div>
            )}
          </div>

          {/* Map */}
          <div className="lg:col-span-3 rounded-md overflow-hidden border border-[#272727]" style={{ height: 420 }}>
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm bg-[#0d0e15]">
                Loading map…
              </div>
            ) : (
              <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {offices
                  .filter((o) => o.id !== draft?.id)
                  .map((office) => (
                    <Marker key={office.id} position={[office.latitude, office.longitude]} icon={otherIcon} />
                  ))}

                {draft?.position && (
                  <>
                    <Marker
                      position={draft.position}
                      icon={activeIcon}
                      draggable
                      eventHandlers={{
                        dragend: (e) => {
                          const { lat, lng } = e.target.getLatLng();
                          handlePick([lat, lng]);
                        },
                      }}
                    />
                    <Circle
                      center={draft.position}
                      radius={Number(draft.radius) || 0}
                      pathOptions={{ color: "#6366f1", fillColor: "#6366f1", fillOpacity: 0.12 }}
                    />
                  </>
                )}

                <ClickToPlace onPick={handlePick} />
                <RecenterOnChange center={mapCenter} />
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeLocationMap;
