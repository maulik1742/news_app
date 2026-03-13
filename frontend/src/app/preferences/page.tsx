'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { updatePreferences } from '@/redux/actions/authActions';
import { RootState, AppDispatch } from '@/redux/store';
import { Check, ArrowLeft, ChevronRight, Info } from 'lucide-react';
import { TOPICS, Topic, Subcategory } from '@/constants/topics';

export default function Preferences() {
  const [activeCategory, setActiveCategory] = useState<Topic | null>(null);
  const [selectedSubs, setSelectedSubs] = useState<Subcategory[]>([]);
  
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo, loading } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      router.push('/login');
    } else if (userInfo.preferences && userInfo.preferences.length > 0 && selectedSubs.length === 0) {
      setSelectedSubs(userInfo.preferences as any);
    }
  }, [userInfo, router, selectedSubs.length]);

  const toggleSubcategory = (sub: Subcategory) => {
    setSelectedSubs((prev) =>
      prev.some(s => s.id === sub.id) 
        ? prev.filter((s) => s.id !== sub.id) 
        : [...prev, sub]
    );
  };

  const handleSave = () => {
    if (selectedSubs.length > 0) {
      dispatch(updatePreferences(selectedSubs as any));
      router.push('/');
    }
  };

  const isSubSelected = (id: string) => selectedSubs.some(s => s.id === id);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column', padding: '48px 16px' }}>
      <div style={{ maxWidth: '900px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
            {activeCategory ? activeCategory.label : 'Personalize Your Feed'}
          </h2>
          <p style={{ marginTop: '16px', fontSize: '16px', color: 'var(--color-text-secondary)' }}>
            {activeCategory 
              ? `Choose specific topics within ${activeCategory.label}` 
              : 'Select categories to explore more relevant subtopics.'}
          </p>
        </div>

        {/* Selected Summary Bar */}
        {selectedSubs.length > 0 && (
          <div
            style={{
              background: 'var(--color-primary)',
              borderRadius: '16px',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: 'var(--glow-primary-strong)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#fff' }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: '8px', borderRadius: '10px', display: 'flex' }}>
                <Info style={{ width: 18, height: 18 }} />
              </div>
              <span style={{ fontWeight: 600 }}>{selectedSubs.length} topics selected</span>
            </div>
            <button
              onClick={handleSave}
              style={{
                padding: '10px 24px',
                background: '#fff',
                color: 'var(--color-primary)',
                borderRadius: '12px',
                border: 'none',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              Finish & See News
            </button>
          </div>
        )}

        <div style={{ marginTop: '8px' }}>
          {activeCategory ? (
            /* Subcategories View */
            <div>
              <button
                onClick={() => setActiveCategory(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--color-primary)',
                  fontWeight: 700,
                  fontSize: '14px',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '24px',
                  padding: 0,
                }}
              >
                <ArrowLeft style={{ width: 18, height: 18 }} />
                Back to All Categories
              </button>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {activeCategory.subcategories.map((sub) => {
                  const isSelected = isSubSelected(sub.id);
                  return (
                    <button
                      key={sub.id}
                      onClick={() => toggleSubcategory(sub)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 24px',
                        borderRadius: '16px',
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: isSelected ? 'var(--color-primary-light)' : 'var(--color-card-bg)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: isSelected ? 'var(--glow-primary)' : 'none',
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: '16px', color: isSelected ? 'var(--color-primary)' : 'var(--color-text-primary)', textAlign: 'left' }}>
                        {sub.label}
                      </span>
                      <div
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          border: isSelected ? 'none' : '2px solid var(--color-border)',
                          background: isSelected ? 'var(--color-primary)' : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s',
                          flexShrink: 0,
                        }}
                      >
                        {isSelected && <Check style={{ width: 14, height: 14, color: '#fff' }} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Main Categories View */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
              {TOPICS.map((topic) => {
                const count = selectedSubs.filter(s => topic.subcategories.some(ts => ts.id === s.id)).length;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setActiveCategory(topic)}
                    style={{
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '36px 16px 28px',
                      borderRadius: '20px',
                      background: 'var(--color-card-bg)',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-primary)';
                      e.currentTarget.style.boxShadow = 'var(--glow-card-hover)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--color-border)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {count > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          background: 'var(--color-primary)',
                          color: '#fff',
                          fontSize: '11px',
                          fontWeight: 700,
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: 'var(--glow-primary)',
                        }}
                      >
                        {count}
                      </span>
                    )}
                    <span style={{ fontSize: '44px', marginBottom: '12px', transition: 'transform 0.2s' }}>{topic.emoji}</span>
                    <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>{topic.label}</span>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--color-primary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        background: 'var(--color-primary-light)',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        opacity: 0.8,
                      }}
                    >
                      <span>Explore</span>
                      <ChevronRight style={{ width: 12, height: 12 }} />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {!activeCategory && selectedSubs.length === 0 && (
          <div style={{ paddingTop: '32px', textAlign: 'center', opacity: 0.4, color: 'var(--color-text-secondary)' }}>
            <p>Click a category to select specific topics you care about.</p>
          </div>
        )}
      </div>
    </div>
  );
}
