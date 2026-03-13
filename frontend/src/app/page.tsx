"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/redux/store";
import { logout } from "@/redux/actions/authActions";
import api from "@/utils/api";
import NewsCard from "@/components/NewsCard";
import { showToast } from "@/components/Toast";
import { LogOut, Settings, BookmarkCheck, LayoutDashboard } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [savingId, setSavingId] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const userLogin = useSelector((state: RootState) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    } else if (!userInfo.preferences || userInfo.preferences.length === 0) {
      router.push("/preferences");
    } else {
      fetchNews(1);
    }
  }, [userInfo, router]);

  const fetchNews = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      const { data } = await api.get(`/news/feed?page=${pageNum}`, config);

      if (pageNum === 1) {
        setNews(data);
      } else {
        setNews((prev) => {
          const newArticles = data.filter(
            (d: any) => !prev.some((p: any) => p.url === d.url),
          );
          return [...prev, ...newArticles];
        });
      }
    } catch (error) {
      console.error("Fetch news error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage);
  };

  const handleSave = async (article: any) => {
    try {
      setSavingId(article.url);
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      };
      await api.post("/news/save", article, config);
      showToast("Article saved successfully!", "success");
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Error saving article",
        "error",
      );
    } finally {
      setSavingId(null);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const filteredNews =
    selectedTopic === "All"
      ? news
      : news.filter(
          (item) => item.topic?.toLowerCase() === selectedTopic.toLowerCase(),
        );

  const topics = userInfo?.preferences
    ? ["All", ...userInfo.preferences.map((p: any) => p.label)]
    : ["All"];

  if (!userInfo) return null;

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)" }}>
      {/* Navbar */}
      <nav
        style={{
          background: "var(--color-bg-elevated)",
          borderBottom: "1px solid var(--color-border)",
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 32px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              height: "64px",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image
                src="/news_logo.png"
                alt="Briefly"
                width={38}
                height={38}
                style={{
                  borderRadius: "8px",
                  filter: "drop-shadow(0 0 10px rgba(99, 102, 241, 0.4))",
                }}
              />
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                  letterSpacing: "-0.02em",
                }}
              >
                Briefly
              </span>
            </div>

            {/* Right Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button
                onClick={() => router.push("/saved")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.boxShadow = "var(--glow-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <BookmarkCheck style={{ width: 18, height: 18 }} />
                <span className="hidden md:inline">Saved</span>
              </button>

              <button
                onClick={() => router.push("/preferences")}
                title="Preferences"
                style={{
                  padding: "8px",
                  borderRadius: "10px",
                  border: "1px solid var(--color-border)",
                  background: "transparent",
                  color: "var(--color-text-secondary)",
                  cursor: "pointer",
                  display: "flex",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-primary)";
                  e.currentTarget.style.color = "var(--color-primary)";
                  e.currentTarget.style.boxShadow = "var(--glow-primary)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-text-secondary)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Settings style={{ width: 18, height: 18 }} />
              </button>

              <div
                style={{
                  width: "1px",
                  height: "24px",
                  background: "var(--color-border)",
                  margin: "0 4px",
                }}
              />

              <button
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "7px 14px",
                  borderRadius: "10px",
                  border: "1px solid var(--color-error-border)",
                  background: "transparent",
                  color: "var(--color-error)",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--color-error-bg)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <LogOut style={{ width: 16, height: 16 }} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main
        style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}
      >
        {/* Topic Filters */}
        <div
          className="no-scrollbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          <LayoutDashboard
            style={{
              width: 18,
              height: 18,
              color: "var(--color-text-muted)",
              flexShrink: 0,
            }}
          />
          <div style={{ display: "flex", gap: "8px" }}>
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                style={{
                  padding: "8px 22px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  border:
                    selectedTopic === topic
                      ? "none"
                      : "1px solid var(--color-border)",
                  background:
                    selectedTopic === topic
                      ? "var(--color-primary)"
                      : "transparent",
                  color:
                    selectedTopic === topic
                      ? "#fff"
                      : "var(--color-text-secondary)",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  ...(selectedTopic === topic
                    ? { boxShadow: "var(--glow-primary)" }
                    : {}),
                }}
                onMouseEnter={(e) => {
                  if (selectedTopic !== topic) {
                    e.currentTarget.style.background =
                      "var(--color-primary-light)";
                    e.currentTarget.style.borderColor =
                      "rgba(99, 102, 241, 0.3)";
                    e.currentTarget.style.color = "var(--color-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTopic !== topic) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.color = "var(--color-text-secondary)";
                  }
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Welcome Header */}
        <div style={{ marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 800,
              color: "var(--color-text-primary)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Personalized Feed for{" "}
            <span
              style={{
                background: "var(--color-primary-gradient)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {userInfo.username}
            </span>
          </h1>
          <p
            style={{
              color: "var(--color-text-secondary)",
              marginTop: "8px",
              fontSize: "15px",
            }}
          >
            Top stories from your selected interests processed with AI.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  background: "var(--color-card-bg)",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="skeleton-dark" style={{ height: "200px" }} />
                <div style={{ padding: "24px" }}>
                  <div
                    className="skeleton-dark"
                    style={{
                      height: "14px",
                      width: "80px",
                      borderRadius: "6px",
                      marginBottom: "16px",
                    }}
                  />
                  <div
                    className="skeleton-dark"
                    style={{
                      height: "20px",
                      width: "100%",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    className="skeleton-dark"
                    style={{
                      height: "20px",
                      width: "70%",
                      borderRadius: "6px",
                      marginBottom: "20px",
                    }}
                  />
                  <div
                    className="skeleton-dark"
                    style={{
                      height: "80px",
                      width: "100%",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : filteredNews.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              background: "var(--color-card-bg)",
              borderRadius: "20px",
              border: "1px dashed var(--color-border)",
            }}
          >
            <Image
              src="/news_logo.png"
              alt="No stories"
              width={64}
              height={64}
              style={{
                margin: "0 auto 16px",
                opacity: 0.5,
                borderRadius: "12px",
              }}
            />
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "var(--color-text-primary)",
              }}
            >
              No stories found
            </h3>
            <p
              style={{ color: "var(--color-text-secondary)", marginTop: "8px" }}
            >
              Try selecting different topics in your preferences.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: "24px",
            }}
          >
            {filteredNews.map((article, idx) => (
              <NewsCard
                key={article.url + idx}
                article={article}
                onSave={handleSave}
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!loading && filteredNews.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "48px",
              marginBottom: "32px",
            }}
          >
            <button
              onClick={handleLoadMore}
              disabled={loadingMore}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 32px",
                borderRadius: "14px",
                border: "none",
                background: "var(--color-primary)",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 700,
                cursor: loadingMore ? "not-allowed" : "pointer",
                transition: "all 0.2s",
                opacity: loadingMore ? 0.7 : 1,
                boxShadow: "var(--glow-primary)",
              }}
              onMouseEnter={(e) => {
                if (!loadingMore)
                  e.currentTarget.style.background =
                    "var(--color-primary-hover)";
              }}
              onMouseLeave={(e) => {
                if (!loadingMore)
                  e.currentTarget.style.background = "var(--color-primary)";
              }}
            >
              {loadingMore ? (
                <>
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTopColor: "#fff",
                      borderRadius: "50%",
                      animation: "spin 0.6s linear infinite",
                    }}
                  />
                  <span>Loading More...</span>
                </>
              ) : (
                <span>Load More Stories</span>
              )}
            </button>
          </div>
        )}
      </main>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
