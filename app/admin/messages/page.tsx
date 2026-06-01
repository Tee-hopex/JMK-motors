"use client";

import { useEffect, useState, useCallback } from "react";
import { Trash2, ChevronDown, Mail, MailOpen, Inbox } from "lucide-react";

interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/messages");
      setMessages(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const toggleRead = async (msg: Message) => {
    await fetch(`/api/messages/${msg.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: !msg.read }),
    });
    load();
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setExpanded(null);
    load();
  };

  const handleExpand = async (msg: Message) => {
    const next = expanded === msg.id ? null : msg.id;
    setExpanded(next);
    if (next && !msg.read) {
      await fetch(`/api/messages/${msg.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: true }),
      });
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m));
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      <div className="mb-6">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-1">Management</p>
        <h1 className="text-2xl font-bold text-ink">Messages</h1>
        <p className="text-slate-500 text-sm mt-1">
          {loading ? "Loading messages..." : (
            <>
              {messages.length} total
              {unread > 0 && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-lg bg-purple-500/15 text-purple-400 text-xs font-medium border border-purple-500/20">
                  {unread} unread
                </span>
              )}
            </>
          )}
        </p>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => <div key={i} className="bg-surface-2 border border-ink/6 rounded-xl h-16 animate-pulse" />)}
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-surface-2 border border-ink/6 rounded-2xl py-20 text-center">
          <Inbox className="w-8 h-8 text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 text-sm">No messages yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg) => {
            const isOpen = expanded === msg.id;
            return (
              <div
                key={msg.id}
                className={`bg-[#0f1520] border rounded-xl overflow-hidden transition-all ${
                  !msg.read ? "border-purple-500/25" : isOpen ? "border-ink/12" : "border-ink/6"
                }`}
              >
                <button
                  type="button"
                  className="w-full px-5 py-4 flex items-center gap-3 text-left hover:bg-ink/2 transition-colors"
                  onClick={() => handleExpand(msg)}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {msg.read
                      ? <MailOpen className="w-4 h-4 text-slate-600" />
                      : <Mail className="w-4 h-4 text-purple-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm font-medium truncate ${msg.read ? "text-ink/60" : "text-ink"}`}>
                        {msg.name}
                      </p>
                      {!msg.read && <span className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0" />}
                    </div>
                    <p className="text-slate-500 text-xs truncate mt-0.5">{msg.subject}</p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-slate-600 text-xs hidden sm:block">
                      {new Date(msg.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 border-t border-ink/6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Email</p>
                        <a href={`mailto:${msg.email}`} className="text-ink text-sm hover:text-gold transition-colors">{msg.email}</a>
                      </div>
                      {msg.phone && (
                        <div>
                          <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                          <a href={`tel:${msg.phone}`} className="text-ink text-sm hover:text-gold transition-colors">{msg.phone}</a>
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider mb-2">Message</p>
                        <p className="text-ink text-sm leading-relaxed bg-ink/3 rounded-xl p-4 border border-ink/6">{msg.message}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => toggleRead(msg)}
                        className="text-xs text-ink/60 hover:text-ink transition-colors px-3 py-1.5 rounded-lg hover:bg-ink/6"
                      >
                        Mark as {msg.read ? "unread" : "read"}
                      </button>
                      <a
                        href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                        className="text-xs text-gold hover:text-yellow-400 transition-colors px-3 py-1.5 rounded-lg hover:bg-gold/8"
                      >
                        Reply by email
                      </a>
                      <button
                        type="button"
                        aria-label="Delete message"
                        onClick={() => deleteMessage(msg.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-all ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
