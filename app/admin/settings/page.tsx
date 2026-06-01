"use client";

import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

interface Settings {
  whatsapp: string;
  phone: string;
  address: string;
  instagram: string;
  facebook: string;
}

interface AdminCreds {
  username: string;
  newPassword: string;
  confirmPassword: string;
}

function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-medium text-ink/60 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Settings>({
    whatsapp: "", phone: "", address: "", instagram: "", facebook: "",
  });
  const [adminCreds, setAdminCreds] = useState<AdminCreds>({
    username: "", newPassword: "", confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingCreds, setSavingCreds] = useState(false);
  const [saved, setSaved] = useState(false);
  const [credsSaved, setCredsSaved] = useState(false);
  const [credsError, setCredsError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/settings").then((r) => r.json()),
      fetch("/api/admin-settings").then((r) => r.json()),
    ])
      .then(([settingsData, credsData]) => {
        setSettings((p) => ({ ...p, ...settingsData }));
        setAdminCreds((p) => ({ ...p, username: credsData.username || "" }));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveCreds = async (e: React.FormEvent) => {
    e.preventDefault();
    setCredsError("");

    // Validation
    if (!adminCreds.username.trim()) {
      setCredsError("Username is required");
      return;
    }

    if (adminCreds.newPassword && adminCreds.newPassword.length < 6) {
      setCredsError("Password must be at least 6 characters");
      return;
    }

    if (adminCreds.newPassword !== adminCreds.confirmPassword) {
      setCredsError("Passwords do not match");
      return;
    }

    setSavingCreds(true);
    try {
      const payload: Record<string, string> = { username: adminCreds.username };
      if (adminCreds.newPassword) {
        payload.password = adminCreds.newPassword;
      }

      const res = await fetch("/api/admin-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        setCredsError(data.error || "Failed to update credentials");
        return;
      }

      setCredsSaved(true);
      setAdminCreds((p) => ({ ...p, newPassword: "", confirmPassword: "" }));
      setTimeout(() => setCredsSaved(false), 3000);
    } catch (err) {
      setCredsError("Failed to update credentials");
    } finally {
      setSavingCreds(false);
    }
  };

  const inputCls = "w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/15 transition-all";

  if (loading) {
    return (
      <div className="p-6 md:p-8">
        <div className="mb-6">
          <p className="text-ink/60 text-xs font-medium uppercase tracking-widest mb-1">Configuration</p>
          <h1 className="text-2xl font-bold text-ink">Settings</h1>
          <p className="text-slate-500 text-sm mt-1">Loading settings...</p>
        </div>
        <div className="max-w-lg bg-surface-2 border border-ink/6 rounded-2xl h-80 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-6">
        <p className="text-ink/60 text-xs font-medium uppercase tracking-widest mb-1">Configuration</p>
        <h1 className="text-2xl font-bold text-ink">Settings</h1>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact */}
        <div className="bg-surface-2 border border-ink/6 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">Contact Information</h2>
          <div className="space-y-4">
            <Field label="WhatsApp Number (with country code)" id="whatsapp">
              <input
                id="whatsapp"
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings((p) => ({ ...p, whatsapp: e.target.value }))}
                className={inputCls}
                placeholder="2348012345678"
              />
            </Field>
            <Field label="Display Phone Number" id="phone">
              <input
                id="phone"
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings((p) => ({ ...p, phone: e.target.value }))}
                className={inputCls}
                placeholder="+234 801 234 5678"
              />
            </Field>
            <Field label="Address" id="address">
              <input
                id="address"
                type="text"
                value={settings.address}
                onChange={(e) => setSettings((p) => ({ ...p, address: e.target.value }))}
                className={inputCls}
                placeholder="15 Admiralty Way, Lekki Phase 1, Lagos"
              />
            </Field>
          </div>
        </div>

        {/* Social */}
        <div className="bg-surface-2 border border-ink/6 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">Social Media</h2>
          <div className="space-y-4">
            <Field label="Instagram Handle" id="instagram">
              <input
                id="instagram"
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings((p) => ({ ...p, instagram: e.target.value }))}
                className={inputCls}
                placeholder="@jmkauto"
              />
            </Field>
            <Field label="Facebook URL" id="facebook">
              <input
                id="facebook"
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings((p) => ({ ...p, facebook: e.target.value }))}
                className={inputCls}
                placeholder="https://facebook.com/jmkauto"
              />
            </Field>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-3 bg-gold hover:bg-yellow-500 text-dark text-sm font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-gold/20"
          >
            {saving ? "Saving…" : "Save Settings"}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Saved successfully
            </span>
          )}
        </div>
      </form>

      {/* Admin Credentials Form */}
      <form onSubmit={handleSaveCreds} className="space-y-6 mt-8">
        <div className="bg-surface-2 border border-ink/6 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-ink mb-4">Admin Credentials</h2>
          {credsError && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {credsError}
            </div>
          )}
          <div className="space-y-4">
            <Field label="Username" id="username">
              <input
                id="username"
                type="text"
                value={adminCreds.username}
                onChange={(e) => setAdminCreds((p) => ({ ...p, username: e.target.value }))}
                className={inputCls}
                placeholder="admin"
              />
            </Field>
            <Field label="New Password (leave empty to keep current)" id="newPassword">
              <input
                id="newPassword"
                type="password"
                value={adminCreds.newPassword}
                onChange={(e) => setAdminCreds((p) => ({ ...p, newPassword: e.target.value }))}
                className={inputCls}
                placeholder="••••••••"
              />
            </Field>
            {adminCreds.newPassword && (
              <Field label="Confirm Password" id="confirmPassword">
                <input
                  id="confirmPassword"
                  type="password"
                  value={adminCreds.confirmPassword}
                  onChange={(e) => setAdminCreds((p) => ({ ...p, confirmPassword: e.target.value }))}
                  className={inputCls}
                  placeholder="••••••••"
                />
              </Field>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={savingCreds}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50 shadow-lg shadow-blue-600/20"
          >
            {savingCreds ? "Saving…" : "Update Credentials"}
          </button>
          {credsSaved && (
            <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
              <CheckCircle className="w-4 h-4" />
              Credentials updated successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
