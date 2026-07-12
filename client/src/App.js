import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// ─── Platform Configuration ───────────────────────────────────────────────────
const PLATFORMS = [
  { label: 'Netflix',      emoji: '🎬', color: '#E50914' },
  { label: 'Prime Video',  emoji: '📦', color: '#00A8E1' },
  { label: 'Disney+',      emoji: '✨', color: '#113CCF' },
  { label: 'Apple TV+',    emoji: '🍎', color: '#A2AAAD' },
  { label: 'HBO Max',      emoji: '🎭', color: '#5822B4' },
  { label: 'Hulu',         emoji: '💚', color: '#1CE783' },
  { label: 'YouTube',      emoji: '▶️', color: '#FF0000' },
  { label: 'Cinema',       emoji: '🎥', color: '#FFD700' },
  { label: 'Other',        emoji: '📺', color: '#94A3B8' },
];

const getPlatform = (name) =>
  PLATFORMS.find((p) => p.label === name) || PLATFORMS[PLATFORMS.length - 1];

// ─── API Helper ───────────────────────────────────────────────────────────────
const API = '/api/watchlists';

// ─── Main App Component ───────────────────────────────────────────────────────
export default function App() {
  const [items, setItems]       = useState([]);
  const [title, setTitle]       = useState('');
  const [platform, setPlatform] = useState('Netflix');
  const [filter, setFilter]     = useState('all');   // 'all' | 'watched' | 'unwatched'
  const [loading, setLoading]   = useState(true);
  const [adding, setAdding]     = useState(false);
  const [error, setError]       = useState('');
  const [deletingId, setDeletingId]   = useState(null);
  const [togglingId, setTogglingId]   = useState(null);

  // ── Fetch all items ──────────────────────────────────────────────────────────
  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API);
      setItems(data);
    } catch {
      setError('Failed to load watchlist. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  // ── Add new item ─────────────────────────────────────────────────────────────
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      setAdding(true);
      setError('');
      const { data } = await axios.post(API, { title: title.trim(), platform });
      setItems((prev) => [data, ...prev]);
      setTitle('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item.');
    } finally {
      setAdding(false);
    }
  };

  // ── Toggle isWatched ─────────────────────────────────────────────────────────
  const handleToggle = async (id) => {
    try {
      setTogglingId(id);
      const { data } = await axios.put(`${API}/${id}`);
      setItems((prev) => prev.map((item) => (item._id === id ? data : item)));
    } catch {
      setError('Failed to update item.');
    } finally {
      setTogglingId(null);
    }
  };

  // ── Delete item ──────────────────────────────────────────────────────────────
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await axios.delete(`${API}/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setError('Failed to delete item.');
    } finally {
      setDeletingId(null);
    }
  };

  // ── Derived filtered list ────────────────────────────────────────────────────
  const filtered = items.filter((item) => {
    if (filter === 'watched')   return item.isWatched;
    if (filter === 'unwatched') return !item.isWatched;
    return true;
  });

  const watchedCount   = items.filter((i) => i.isWatched).length;
  const unwatchedCount = items.filter((i) => !i.isWatched).length;

  // ─── Render ──────────────────────────────────────────────────────────────────
  return (
    <div style={styles.page}>
      {/* ── Ambient Background Blobs ── */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      <div style={styles.wrapper}>

        {/* ══ Header ══════════════════════════════════════════════════════════ */}
        <header style={styles.header}>
          <div style={styles.logoRow}>
            <span style={styles.logoIcon}>🎬</span>
            <div>
              <h1 style={styles.logoTitle}>WatchlistTracker</h1>
              <p style={styles.logoSub}>Your personal media universe</p>
            </div>
          </div>

          <div style={styles.statsRow}>
            <StatBadge label="Total"     value={items.length}   color="#A78BFA" />
            <StatBadge label="Watched"   value={watchedCount}   color="#34D399" />
            <StatBadge label="Remaining" value={unwatchedCount} color="#FB923C" />
          </div>
        </header>

        {/* ══ Add Form ════════════════════════════════════════════════════════ */}
        <form onSubmit={handleAdd} style={styles.card}>
          <h2 style={styles.cardTitle}>➕ Add to Watchlist</h2>

          <div style={styles.formRow}>
            <input
              id="title-input"
              type="text"
              placeholder="Movie or show title…"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              required
            />

            <select
              id="platform-select"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              style={styles.select}
            >
              {PLATFORMS.map((p) => (
                <option key={p.label} value={p.label}>
                  {p.emoji} {p.label}
                </option>
              ))}
            </select>

            <button
              id="add-btn"
              type="submit"
              disabled={adding || !title.trim()}
              style={{
                ...styles.addBtn,
                opacity: adding || !title.trim() ? 0.5 : 1,
                cursor:  adding || !title.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {adding ? <Spinner /> : 'Add'}
            </button>
          </div>

          {error && (
            <p style={styles.errorBanner} role="alert">⚠️ {error}</p>
          )}
        </form>

        {/* ══ Filter Tabs ════════════════════════════════════════════════════ */}
        <div style={styles.filterRow}>
          {['all', 'unwatched', 'watched'].map((f) => (
            <button
              key={f}
              id={`filter-${f}`}
              onClick={() => setFilter(f)}
              style={{
                ...styles.filterBtn,
                ...(filter === f ? styles.filterBtnActive : {}),
              }}
            >
              {f === 'all' ? '🌐 All' : f === 'watched' ? '✅ Watched' : '⏳ Unwatched'}
            </button>
          ))}
        </div>

        {/* ══ Watchlist ═══════════════════════════════════════════════════════ */}
        {loading ? (
          <div style={styles.centerBox}>
            <Spinner size={32} />
            <p style={styles.dimText}>Loading your watchlist…</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={styles.emptyIcon}>🍿</span>
            <p style={styles.emptyTitle}>Nothing here yet</p>
            <p style={styles.emptyDesc}>
              {filter === 'all'
                ? 'Add your first title above to get started!'
                : `No ${filter} titles yet.`}
            </p>
          </div>
        ) : (
          <ul style={styles.list}>
            {filtered.map((item) => (
              <WatchlistItem
                key={item._id}
                item={item}
                onToggle={handleToggle}
                onDelete={handleDelete}
                isToggling={togglingId === item._id}
                isDeleting={deletingId === item._id}
              />
            ))}
          </ul>
        )}

        <footer style={styles.footer}>
          Built with ❤️ · MERN Stack · {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}

// ─── WatchlistItem Sub-Component ──────────────────────────────────────────────
function WatchlistItem({ item, onToggle, onDelete, isToggling, isDeleting }) {
  const [hovered, setHovered] = useState(false);
  const plat = getPlatform(item.platform);

  return (
    <li
      style={{
        ...styles.item,
        ...(item.isWatched ? styles.itemWatched : {}),
        ...(hovered ? styles.itemHover : {}),
        opacity: isDeleting ? 0.4 : 1,
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Platform badge */}
      <span
        style={{
          ...styles.platformDot,
          backgroundColor: plat.color + '33',
          border: `1px solid ${plat.color}66`,
          color: plat.color,
        }}
        title={item.platform}
      >
        {plat.emoji}
      </span>

      {/* Checkbox toggle */}
      <button
        id={`toggle-${item._id}`}
        aria-label={`Mark "${item.title}" as ${item.isWatched ? 'unwatched' : 'watched'}`}
        onClick={() => !isToggling && onToggle(item._id)}
        style={{
          ...styles.checkBtn,
          borderColor: item.isWatched ? '#34D399' : '#475569',
          backgroundColor: item.isWatched ? '#34D399' : 'transparent',
        }}
        disabled={isToggling}
      >
        {isToggling ? <Spinner size={12} /> : item.isWatched ? '✓' : ''}
      </button>

      {/* Title + platform label */}
      <div style={styles.itemBody}>
        <span
          style={{
            ...styles.itemTitle,
            ...(item.isWatched ? styles.itemTitleWatched : {}),
          }}
        >
          {item.title}
        </span>
        <span style={{ ...styles.itemPlatformLabel, color: plat.color }}>
          {item.platform || 'Other'}
        </span>
      </div>

      {/* Watched badge */}
      {item.isWatched && (
        <span style={styles.watchedBadge}>Watched</span>
      )}

      {/* Delete button */}
      <button
        id={`delete-${item._id}`}
        aria-label={`Delete "${item.title}"`}
        onClick={() => !isDeleting && onDelete(item._id)}
        disabled={isDeleting}
        style={styles.deleteBtn}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#EF44441A';
          e.currentTarget.style.color = '#EF4444';
          e.currentTarget.style.borderColor = '#EF4444';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = '#64748B';
          e.currentTarget.style.borderColor = '#334155';
        }}
      >
        {isDeleting ? <Spinner size={12} /> : '✕'}
      </button>
    </li>
  );
}

// ─── Stat Badge ───────────────────────────────────────────────────────────────
function StatBadge({ label, value, color }) {
  return (
    <div style={{ ...styles.statBadge, borderColor: color + '55' }}>
      <span style={{ ...styles.statValue, color }}>{value}</span>
      <span style={styles.statLabel}>{label}</span>
    </div>
  );
}

// ─── Minimal Spinner ──────────────────────────────────────────────────────────
function Spinner({ size = 16 }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        border: `2px solid rgba(167,139,250,0.3)`,
        borderTopColor: '#A78BFA',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
        verticalAlign: 'middle',
      }}
    />
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0F0F1A 0%, #0D1B2A 50%, #0F0F1A 100%)',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    color: '#E2E8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  blob1: {
    position: 'fixed', top: '-200px', right: '-150px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  blob2: {
    position: 'fixed', bottom: '-200px', left: '-150px',
    width: '500px', height: '500px', borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  wrapper: {
    maxWidth: '780px',
    margin: '0 auto',
    padding: '32px 20px 60px',
    position: 'relative',
    zIndex: 1,
  },

  // Header
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '32px',
  },
  logoRow: {
    display: 'flex', alignItems: 'center', gap: '14px',
  },
  logoIcon: {
    fontSize: '42px',
    filter: 'drop-shadow(0 0 16px rgba(167,139,250,0.6))',
  },
  logoTitle: {
    margin: 0, fontSize: '28px', fontWeight: 800,
    background: 'linear-gradient(90deg, #A78BFA, #38BDF8)',
    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px',
  },
  logoSub: {
    margin: '2px 0 0', fontSize: '13px', color: '#64748B',
  },
  statsRow: {
    display: 'flex', gap: '10px', flexWrap: 'wrap',
  },
  statBadge: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '8px 16px', borderRadius: '12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid',
    backdropFilter: 'blur(8px)',
  },
  statValue: {
    fontSize: '22px', fontWeight: 700, lineHeight: 1,
  },
  statLabel: {
    fontSize: '11px', color: '#94A3B8', marginTop: '2px', textTransform: 'uppercase', letterSpacing: '0.05em',
  },

  // Card / Form
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '20px',
    padding: '24px',
    marginBottom: '24px',
    backdropFilter: 'blur(16px)',
  },
  cardTitle: {
    margin: '0 0 18px', fontSize: '16px', fontWeight: 600, color: '#CBD5E1',
  },
  formRow: {
    display: 'flex', gap: '10px', flexWrap: 'wrap',
  },
  input: {
    flex: '1 1 200px',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '12px 16px',
    color: '#E2E8F0',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  select: {
    flex: '0 1 170px',
    background: '#1E293B',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '12px',
    padding: '12px 14px',
    color: '#E2E8F0',
    fontSize: '14px',
    cursor: 'pointer',
    outline: 'none',
  },
  addBtn: {
    padding: '12px 28px',
    background: 'linear-gradient(135deg, #7C3AED, #6366F1)',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '15px',
    fontWeight: 700,
    letterSpacing: '0.02em',
    boxShadow: '0 4px 20px rgba(124,58,237,0.4)',
    transition: 'all 0.2s ease',
    minWidth: '80px',
  },
  errorBanner: {
    marginTop: '12px', marginBottom: 0,
    background: 'rgba(239,68,68,0.12)',
    border: '1px solid rgba(239,68,68,0.35)',
    color: '#FCA5A5',
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '14px',
  },

  // Filter tabs
  filterRow: {
    display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap',
  },
  filterBtn: {
    padding: '8px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: 500,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.10)',
    color: '#94A3B8', cursor: 'pointer', transition: 'all 0.2s',
  },
  filterBtnActive: {
    background: 'rgba(124,58,237,0.2)',
    border: '1px solid rgba(124,58,237,0.6)',
    color: '#C4B5FD',
  },

  // List & Items
  list: {
    listStyle: 'none', margin: 0, padding: 0,
    display: 'flex', flexDirection: 'column', gap: '10px',
  },
  item: {
    display: 'flex', alignItems: 'center', gap: '12px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '16px',
    padding: '14px 16px',
    backdropFilter: 'blur(8px)',
  },
  itemWatched: {
    background: 'rgba(52,211,153,0.04)',
    borderColor: 'rgba(52,211,153,0.15)',
  },
  itemHover: {
    background: 'rgba(255,255,255,0.07)',
    borderColor: 'rgba(167,139,250,0.3)',
    boxShadow: '0 4px 24px rgba(124,58,237,0.15)',
  },
  platformDot: {
    width: '34px', height: '34px', borderRadius: '10px',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '16px', flexShrink: 0,
  },
  checkBtn: {
    width: '22px', height: '22px', borderRadius: '6px',
    border: '2px solid',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '12px', fontWeight: 700, color: '#0F172A',
    cursor: 'pointer', background: 'transparent',
    flexShrink: 0, transition: 'all 0.15s ease',
  },
  itemBody: {
    flex: 1, display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0,
  },
  itemTitle: {
    fontSize: '15px', fontWeight: 600, color: '#E2E8F0',
    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
  },
  itemTitleWatched: {
    textDecoration: 'line-through', color: '#475569',
  },
  itemPlatformLabel: {
    fontSize: '12px', fontWeight: 500,
  },
  watchedBadge: {
    fontSize: '11px', fontWeight: 600,
    background: 'rgba(52,211,153,0.15)',
    border: '1px solid rgba(52,211,153,0.4)',
    color: '#34D399',
    borderRadius: '20px',
    padding: '3px 10px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  deleteBtn: {
    width: '30px', height: '30px', borderRadius: '8px',
    border: '1px solid #334155',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', color: '#64748B',
    cursor: 'pointer', background: 'transparent',
    flexShrink: 0, transition: 'all 0.15s ease',
  },

  // Empty / loading states
  centerBox: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '12px', padding: '60px 0',
  },
  dimText: { color: '#475569', fontSize: '14px', margin: 0 },
  emptyState: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    gap: '8px', padding: '60px 20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px dashed rgba(255,255,255,0.1)',
    borderRadius: '20px', textAlign: 'center',
  },
  emptyIcon: { fontSize: '52px' },
  emptyTitle: { fontSize: '20px', fontWeight: 700, color: '#94A3B8', margin: '8px 0 0' },
  emptyDesc:  { fontSize: '14px', color: '#475569', margin: 0 },

  // Footer
  footer: {
    marginTop: '48px', textAlign: 'center',
    fontSize: '13px', color: '#334155',
  },
};

// ─── Inject @keyframes for spinner ───────────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
  * { box-sizing: border-box; }
  body { margin: 0; }
  @keyframes spin { to { transform: rotate(360deg); } }
  input::placeholder { color: #475569; }
  input:focus { border-color: rgba(124,58,237,0.6) !important; box-shadow: 0 0 0 3px rgba(124,58,237,0.15); }
  select option { background: #1E293B; color: #E2E8F0; }
`;
document.head.appendChild(styleTag);
