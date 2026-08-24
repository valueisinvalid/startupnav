import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "İletişim",
};

export default function ContactPage() {
  return (
    <SiteLayout>
      <article className="post-card">
        <div className="post-card-inner">
          <h2 className="post-title">İletişim</h2>
          <div className="post-body">
            <p>
              Yazılar, işbirliği veya düzeltme için bana ulaşabilirsin.
            </p>
            <p>
              E-posta:{" "}
              <a href="mailto:terzimelikeozge@gmail.com">
                terzimelikeozge@gmail.com
              </a>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href="https://www.linkedin.com/in/mozgeterzi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/mozgeterzi
              </a>
            </p>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
