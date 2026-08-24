import Sidebar from "./Sidebar";
import NewsletterPopup from "./NewsletterPopup";

type Props = {
  children: React.ReactNode;
  variant?: "feed" | "grid";
  feedTop?: React.ReactNode;
};

export default function SiteLayout({
  children,
  variant = "feed",
  feedTop,
}: Props) {
  return (
    <div
      className={`site-shell site-shell--${variant}`}
      id="container"
    >
      <Sidebar />
      <main
        className={variant === "grid" ? "main-grid" : "main-feed"}
        id="posts"
      >
        {variant === "feed" ? (
          <div className="feed-column">
            {feedTop}
            {children}
          </div>
        ) : (
          children
        )}
      </main>
      <NewsletterPopup />
    </div>
  );
}
