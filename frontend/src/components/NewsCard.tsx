'use client';

import React from 'react';
import { ExternalLink, Bookmark, Trash2 } from 'lucide-react';

interface NewsCardProps {
  article: {
    _id?: string;
    title: string;
    url: string;
    source: string;
    urlToImage?: string;
    aiSummary: string[];
    publishedAt?: string;
    topic?: string;
  };
  onSave?: (article: any) => void;
  onDelete?: (id: string) => void;
  isSavedPage?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({ article, onSave, onDelete, isSavedPage }) => {
  return (
    <div
      style={{
        background: 'var(--color-card-bg)',
        border: '1px solid var(--color-border)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
      }}
      className="group"
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border-hover)';
        e.currentTarget.style.boxShadow = 'var(--glow-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Thumbnail */}
      <div style={{ height: '200px', width: '100%', overflow: 'hidden', position: 'relative', background: '#0d0d14' }}>
        {article.urlToImage ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            className="group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1000&auto=format&fit=crop';
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)' }}>
            <span style={{ fontSize: '48px' }}>📰</span>
          </div>
        )}
        {article.topic && (
          <span
            style={{
              position: 'absolute',
              top: '14px',
              left: '14px',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            {article.topic}
          </span>
        )}
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Source & Date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {article.source}
          </span>
          {article.publishedAt && (
            <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {new Date(article.publishedAt).toLocaleDateString()}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: '17px',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            lineHeight: 1.4,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-primary)')}
          >
            {article.title}
          </a>
        </h3>

        {/* AI Summary */}
        <div
          style={{
            background: 'var(--color-bg)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            borderLeft: '3px solid var(--color-primary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93L12 10v2" />
              <circle cx="12" cy="16" r="2" />
              <path d="M12 20v2" />
              <path d="M4.93 4.93l1.41 1.41" />
              <path d="M17.66 6.34l1.41-1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
            </svg>
            <span>AI Summarization</span>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {article.aiSummary.map((bullet, idx) => (
              <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)', marginTop: '8px', flexShrink: 0 }} />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '20px',
              background: 'var(--color-primary)',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-primary)')}
          >
            <span>Read Article</span>
            <ExternalLink style={{ width: 14, height: 14 }} />
          </a>

          {isSavedPage ? (
            <button
              onClick={() => article._id && onDelete?.(article._id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'transparent',
                border: '1px solid var(--color-error-border)',
                color: 'var(--color-error)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-error-bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <Trash2 style={{ width: 14, height: 14 }} />
              <span>Unsave</span>
            </button>
          ) : (
            <button
              onClick={() => onSave?.(article)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '20px',
                background: 'transparent',
                border: '1px solid var(--color-primary-ring)',
                color: 'var(--color-primary)',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-primary-light)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <Bookmark style={{ width: 14, height: 14 }} />
              <span>Save</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
