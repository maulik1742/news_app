'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/redux/store';
import { logout } from '@/redux/actions/authActions';
import api from '@/utils/api';
import NewsCard from '@/components/NewsCard';
import { showToast } from '@/components/Toast';
import { ConfirmModal } from '@/components/ConfirmModal';
import { LogOut, ArrowLeft, BookmarkX } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function SavedArticles() {
  const [savedNews, setSavedNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else {
      fetchSavedArticles();
    }
  }, [userInfo, router]);

  const fetchSavedArticles = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await api.get('/news/saved', config);
      setSavedNews(data);
    } catch (error) {
      console.error('Fetch saved articles error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRequest = (id: string) => {
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await api.delete(`/news/saved/${deleteTarget}`, config);
      setSavedNews(prev => prev.filter(article => article._id !== deleteTarget));
      showToast('Article removed successfully', 'success');
    } catch (error: any) {
      showToast(error.response?.data?.message || 'Error deleting article', 'error');
    } finally {
      setDeleteTarget(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (!userInfo) return null;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      {/* Confirm Delete Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        title="Remove Article"
        message="Are you sure you want to remove this article from your saved list? This action cannot be undone."
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />

      {/* Navbar */}
      <nav
        style={{
          background: 'var(--color-bg-elevated)',
          borderBottom: '1px solid var(--color-border)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', height: '64px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link
                href="/"
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: '1px solid var(--color-border)',
                  display: 'flex',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                }}
              >
                <ArrowLeft style={{ width: 20, height: 20 }} />
              </Link>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Image src="/news_logo.png" alt="Saved Stories" width={38} height={38} style={{ borderRadius: '8px', filter: 'drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))' }} />
                <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                  Saved Stories
                </span>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                borderRadius: '10px',
                border: '1px solid var(--color-error-border)',
                background: 'transparent',
                color: 'var(--color-error)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-error-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <LogOut style={{ width: 16, height: 16 }} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            Your Reading List
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '12px', fontSize: '16px' }}>
            Articles you&apos;ve bookmarked for later reading.
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{ background: 'var(--color-card-bg)', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                <div className="skeleton-dark" style={{ height: '200px' }} />
                <div style={{ padding: '24px' }}>
                  <div className="skeleton-dark" style={{ height: '14px', width: '80px', borderRadius: '6px', marginBottom: '16px' }} />
                  <div className="skeleton-dark" style={{ height: '20px', width: '100%', borderRadius: '6px', marginBottom: '20px' }} />
                  <div className="skeleton-dark" style={{ height: '80px', width: '100%', borderRadius: '10px' }} />
                </div>
              </div>
            ))}
          </div>
        ) : savedNews.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              background: 'var(--color-card-bg)',
              borderRadius: '24px',
              border: '1px dashed var(--color-border)',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                background: 'var(--color-primary-light)',
                borderRadius: '50%',
                marginBottom: '24px',
              }}
            >
              <BookmarkX style={{ width: 48, height: 48, color: 'var(--color-primary)' }} />
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text-primary)' }}>Your library is empty</h3>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '8px', maxWidth: '320px', margin: '8px auto 0' }}>
              You haven&apos;t saved any stories yet. Start exploring your feed and bookmark articles you like.
            </p>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '32px',
                padding: '12px 32px',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: '24px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
                boxShadow: 'var(--glow-primary)',
              }}
            >
              <span>Browse News</span>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {savedNews.map((article) => (
              <NewsCard 
                key={article._id} 
                article={article} 
                isSavedPage={true}
                onDelete={handleDeleteRequest}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
