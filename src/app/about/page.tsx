import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";

export const metadata: Metadata = {
  title: "Hakkında",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      <article className="post-card">
        <div className="post-card-inner">
          <h2 className="post-title">Hakkında</h2>
          <div className="post-body">
            <p>
              Yeni fikirlerle tanışmak kadar doğru şekilde uygulandıklarına
              dair örnekleri görmeye de ihtiyacımız var diyorsak, galiba
              buradayız.
            </p>
            <p>
              <strong>The StartupNav</strong>, bu örnekleri kısa ve okunabilir
              notlarla bir araya getiren bağımsız bir blog. Her yazıda bir
              ürün, bir karar veya bir uygulama hikayesi var.
            </p>
            <p>
              Amacımız gürültüyü azaltmak; takip edilebilir, sade bir arşiv
              tutmak.
            </p>
            <p className="post-caption">— The StartupNav</p>
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
