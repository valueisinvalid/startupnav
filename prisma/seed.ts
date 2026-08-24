import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.subscriber.deleteMany();
  await prisma.post.deleteMany();

  await prisma.post.createMany({
    data: [
      {
        slug: "periodic-labs-otonom-bilimsel-kesif",
        title: "Periodic Labs: Otonom Laboratuvarlarla Bilimsel Keşfi Hızlandırmak",
        startupName: "Periodic Labs",
        fundingAmount: "Seed $300M",
        imageUrl: "/images/posts/periodic-labs.webp",
        publishedAt: new Date("2026-08-24"),
        notified: true,
        content: `Bilimsel araştırmalar yıllar, hatta on yıllar sürer. Yeni bir malzeme keşfetmek için binlerce deney yapılması, her birinin elle tasarlanıp sonuçlarının tek tek değerlendirilmesi gerekir. Periodic Labs tam olarak bu darboğazı ortadan kaldırmak için kuruldu.

Şirketi 2025 yılında Liam Fedus ve Ekin Doğuş Çubuk birlikte kurdu. Fedus, OpenAI'da araştırma başkan yardımcısı olarak görev yapmış ve ChatGPT'nin geliştirilmesinde doğrudan rol almış bir isim. Aynı zamanda ilk trilyon parametreli sinir ağını oluşturan ekibin başındaydı. Çubuk ise Google DeepMind'da malzeme bilimi ve kimya ekibini yönetti. 2023'te iki milyondan fazla yeni kristal yapı keşfeden GNoME projesinin arkasındaki araştırmacılardan biri.

İkili yıllardır tanışıyordu ve sohbetleri her seferinde kuantum mekaniği ile süperiletkenlik konularına dönüyordu. Sonunda bu tutkuyu bir girişime çevirdiler.

Periodic Labs'in temel fikri şu: internetteki mevcut verilere dayanan yapay zeka modelleri bir noktada tıkanır, çünkü bilimsel ilerleme gerçek dünyada fiziksel deneyler yapmayı gerektirir. Bu yüzden şirket sadece yazılım geliştirmiyor, tamamen otonom çalışan robotik laboratuvarlar inşa ediyor. Bu laboratuvarlarda yapay zeka hipotez üretiyor, robotlar deneyleri uyguluyor, elde edilen veriler modele geri besleniyor ve döngü kendi kendine devam ediyor. Her bir deney gigabaytlarca özgün veri üretiyor ve bu veriler başka hiçbir yerde bulunmuyor.

Şirketin ilk laboratuvarı toz sentezi yöntemiyle çalışıyor. Bu yöntem katı hal malzemelerin büyük bölümünün üretildiği ucuz ve genel geçer bir teknik. Amaç önce kendi bünyesinde süperiletken tasarlamak üzere bir model eğitmek, ardından bu modeli her türlü ileri malzeme üretimi yapan kurumlara ticari bir zeka katmanı olarak sunmak.

Eylül 2025'te şirket 1.3 milyar dolar değerleme üzerinden 300 milyon dolarlık bir tohum yatırımı aldı. Bu turun arkasında Andreessen Horowitz (a16z), DST Global, Nvidia Ventures, Accel ve Felicis gibi fonlar ile Jeff Bezos, Eric Schmidt ve Jeff Dean gibi isimler var. Tek turda toplanan bu miktar, tohum aşaması için rekor düzeyde. 2026'nın ilk yarısında şirketin 7.5 milyar dolar değerleme üzerinden 500 milyon dolarlık yeni bir tur için görüşmelere başladığı bildirildi.

Periodic Labs halihazırda yarı iletken, uzay, savunma, enerji, ilaç ve nükleer füzyon gibi sektörlere hizmet veriyor. Günde binlerce deney yapabilen altyapısıyla, geleneksel araştırma süreçlerini aylardan günlere indirmeyi hedefliyor.

Kaynaklar: [TechCrunch](https://techcrunch.com/2025/09/30/former-openai-and-deepmind-researchers-raise-whopping-300m-seed-to-automate-science/), [Contrary Research](https://research.contrary.com/company/periodic-labs)`,
      },
      {
        slug: "pulpoar-sanal-makyaj-deneyimi",
        title: "PulpoAR: Yapay Zeka ile Sanal Makyaj Deneyimi",
        startupName: "PulpoAR",
        fundingAmount: "Bridge $2.7M",
        imageUrl: "/images/posts/pulpoar.webp",
        publishedAt: new Date("2026-08-23"),
        notified: true,
        content: `Online kozmetik alışverişinin en büyük sorunu, ürünü satın almadan önce deneyememenizdir. Bir fondötenin ten renginize uyup uymayacağını ya da bir rujun dudaklarınızda nasıl duracağını ekrandan anlamak neredeyse imkansızdır. Bu yüzden kozmetik sektöründe iade oranları yüksek, dönüşüm oranları ise düşük kalır. PulpoAR tam olarak bu problemi çözüyor.

Şirket 2020 yılının mayıs ayında Onur Candan, Rayan Godoi ve Buğrahan Bayat tarafından kuruldu. Merkezi San Francisco'da. Ekip bilgisayarlı görü ve derin öğrenme alanlarında on yılı aşkın deneyime sahip. Danışma kurullarında Estee Lauder gibi global kozmetik devlerinin eski yöneticileri bulunuyor.

PulpoAR'ın geliştirdiği teknoloji şöyle çalışıyor: kullanıcı telefonunun ya da bilgisayarının kamerasını açıyor, sistem saniyeler içinde yüz hatlarını algılıyor ve seçilen kozmetik ürünü gerçekçi bir dokuyla yüze uyguluyor. Fondöten, ruj, far, allık gibi ürünlerin tamamı destekleniyor. Altta derin görüntü işleme (deep image processing) modelleri çalışıyor. Modeller büyük bir yüz verisi seti üzerinde eğitilmiş ve bulut altyapısı sayesinde anlık olarak ölçeklenebiliyor.

Platform şu anda Sephora, e.l.f. Cosmetics, KIKO Milano, Yves Rocher ve Migros gibi küresel ve bölgesel markalarla çalışıyor.

Yatırım geçmişine bakarsak: şirket daha önce 3.5 milyon dolarlık bir tur kapatmıştı. Bu turun liderliğini Leap VC üstlenmiş, Migros, Pastel Cosmetics, Qangels, Hub VC ve Teknasyon da katılmıştı. Temmuz 2026'da ise 2.7 milyon dolarlık bir köprü turunu tamamladı. Bu tura ENA Venture Capital, RePie Portföy, StartersHub Ventures, Nurol Portföy, idacapital, OBSS Ventures, Q Angels, LEAP Investment ve Teknasyon katıldı. Şirket ayrıca EBRD Star Venture programının da bir parçası.

Yeni yatırımla birlikte PulpoAR, Güneydoğu Asya, Orta Avrupa ve Körfez bölgesine açılmayı planlıyor. Seri A turuna hazırlık sürecinde olduğu biliniyor.

Kaynaklar: [Webrazzi](https://webrazzi.com), [Mind Retail](https://www.mind.eu.com/retail/en/article/with-a-confidential-us3-5-million-funding-round-pulpoar-expands-augmented-reality-case-studies/)`,
      },
      {
        slug: "ingosa-ai-konusmasal-reklam-teknolojisi",
        title: "Ingosa.ai: Reklamları Konuşan Araştırma Platformlarına Dönüştürmek",
        startupName: "Ingosa.ai",
        fundingAmount: "FutureBright Ventures",
        imageUrl: "/images/posts/ingosa.jpeg",
        publishedAt: new Date("2026-08-22"),
        notified: true,
        content: `Dijital reklamcılıkta büyük bir çelişki var: markalar milyonlarca dolar harcayarak banner ve görüntülü reklam yayınlıyor ama kullanıcıların büyük çoğunluğu bu reklamlara bakmadan geçiyor. Buna "reklam körlüğü" deniyor. Üstelik çerezlerin (cookie) kullanımdan kalkmasıyla birlikte hedefleme de giderek zorlaşıyor. Ingosa işte bu iki soruna aynı anda çözüm getiriyor.

Şirket 2022 yılında İstanbul'da Gökçe Duman ve Dürin Artuk tarafından kuruldu. Duman CEO pozisyonunda, şirket teknoloji dünyasında kadın liderliğinin güçlü örneklerinden biri olarak öne çıkıyor. Girişim, İş Bankası'nın Workup programından ve Arya Kadın Yatırım Platformu hazırlık programından mezun oldu.

Ingosa'nın yaptığı şey şu: geleneksel statik reklam bannerlarını, üretken yapay zeka destekli diyalog bazlı akıllı ekranlara dönüştürüyor. Kullanıcı bir web sitesinde gezinirken reklam alanında yapay zeka ile konuşabiliyor. Bu konuşma sırasında marka, kullanıcının tercihlerini ve ihtiyaçlarını gerçek zamanlı olarak öğreniyor. Yani reklam aynı anda hem bir iletişim aracı hem de bir araştırma platformu haline geliyor.

Bu teknolojinin ticari adı InsightMate. Markalar herhangi bir dijital temas noktasını saniyeler içinde interaktif bir araştırma platformuna çevirebiliyor. Kullanıcı bulunduğu sayfadan ayrılmak zorunda kalmıyor. Toplanan veriler birinci taraf (first-party) veri niteliğinde, yani üçüncü taraf çerezlere bağımlılık ortadan kalkıyor.

Yatırım geçmişi: ilk turda Arya GSYF liderliğinde 1.5 milyon dolar değerleme üzerinden pre-seed yatırım aldı. Bu tura Doğuş Yeni Girişimler (InvenDO), Aegean Ventures ve çeşitli melek yatırımcılar katıldı. Ardından Garanti BBVA ve IFC (Uluslararası Finans Kurumu) desteğiyle büyümeye devam etti. Ağustos 2026'da FutureBright Ventures'tan ikinci kez stratejik yatırım aldı. FutureBright'ın 1100'den fazla markayla kurduğu veri altyapısı ve ağ, Ingosa'nın teknolojisiyle birleşiyor.

Şirket şu anda 20 global ve yerel markayla görüşme halinde, bunlardan beşi aktif olarak gerçek zamanlı veri üretiyor. Yeni yatırımla birlikte InsightMate'i Türkiye'de ölçekleyip ardından uluslararası pazarlara açılmayı planlıyor.

Kaynaklar: [Webrazzi](https://webrazzi.com/2026/08/07/yerli-yapay-zeka-destekli-adtech-girisimi-ingosa-futurebright-tan-yatirim-aldi/), [Dealroom](https://app.dealroom.co/news/feed/turkish-adtech-startup-ingosa-secures-investment-from-futurebright-ventures)`,
      },
      {
        slug: "talp-ai-insan-davranisi-simulasyonu",
        title: "Talp.ai: İnsan Davranışını Simüle Ederek Geleceği Görmek",
        startupName: "Talp.ai",
        fundingAmount: "Pre-seed $20M val.",
        imageUrl: "/images/posts/talp.png",
        publishedAt: new Date("2026-08-21"),
        notified: true,
        content: `Her iş kararı özünde bir tahmindir: "Müşterilerimiz bu ürüne nasıl tepki verir? Bu fiyatı kabul ederler mi? Bu reklam dikkatlerini çeker mi?" Geleneksel yöntemler, yani anketler ve odak grupları, çoğu zaman insanların gerçekte ne yapacağını değil ne söylediğini ölçer. Talp bu boşluğu yapay zeka ile dolduruyor.

Şirket 2026 yılında ABD'nin Delaware eyaletinde Baran Ataş ve Samet Alan tarafından kuruldu. Her ikisi de Türk girişimci. Ataş CEO pozisyonunda.

Talp'ın geliştirdiği platform bir insan davranışı simülasyon motoru. Sistem binlerce yapay zeka personası oluşturuyor ve bu personaları gerçek tüketici segmentlerini temsil edecek şekilde kalibre ediyor. Bir marka yeni bir ürün, reklam kampanyası ya da fiyatlandırma stratejisi test etmek istediğinde, bu senaryoyu Talp'ın sanal evreninde çalıştırıyor. Personalar sanki gerçek insanlarmış gibi tepki veriyor: tıklıyor, satın alıyor, vazgeçiyor ya da şikayet ediyor. Ortaya çıkan sonuç bir anket yanıtı değil, bir davranışsal öngörü.

Platformun odağı sadece objektif mantık değil, insan niyetini ve öznelliğini de modellemek. Şu anda e-ticaret, havacılık, medya, perakende ve finansal hizmetler sektörlerinde aktif.

Temmuz 2026'da şirket tohum öncesi (pre-seed) yatırım turunu 20 milyon dolar değerleme üzerinden kapattı. Tura Formus Capital, Sunshine Lake Ventures, Aito Capital ve Andreessen Horowitz'in aktif kuruculardan oluşan a16z Scout Fund programı katıldı. Bunların yanı sıra çeşitli melek yatırımcılar da turda yer aldı. Elde edilen kaynak simülasyon motorunun geliştirilmesi ve yeni sektörlere açılma için kullanılacak.

Talp, QNBEYOND Hızlandırma Programı'nın sekizinci dönemine kabul edilen dokuz girişim arasında da yer alıyor. Şirket ayda 65 binden fazla simülasyon çalıştırdığını bildiriyor.

Bu alan büyüyen bir pazar: yapay zeka ajan kategorisi 2024'te 5.25 milyar dolar büyüklüğündeydi, 2030'da 52 milyar dolara ulaşması bekleniyor. Talp'ın doğrudan rakipleri arasında Mart 2024'te kurulan ve 1 milyar dolar değerleme alan Aaru, CulturePulse ve Keplar gibi isimler var.

Kaynaklar: [Forbes Türkiye](https://www.forbes.com.tr/para-yatirim/yapay-zeka-girisimi-talp-20-milyon-dolar-degerleme-uzerinden-yatirim-aldi), [Tech Funding News](https://techfundingnews.com/meet-talp-ai-startup-with-turkish-roots-raising-20m-pre-seed-valuation-to-simulate-customers-with-ai-personas/)`,
      },
    ],
  });

  console.log("Seed tamamlandı: 4 yazı eklendi.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
