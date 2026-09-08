import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const posts = [
      {
        slug: "provenance-finansal-guven-katmani",
        title: "Hücre Hücre İncelemenin Sonu: Provenance ve Finansal Güven Katmanı",
        startupName: "Provenance",
        fundingAmount: "Pre-seed $500K",
        imageUrl: "/images/posts/provenance.png",
        publishedAt: new Date("2026-09-08"),
        notified: true,
        content: `Bir yatırım bankasında model incelemesi hala şöyle ilerliyor. Analist Excel'i günceller, dosyayı e-postayla gönderir, başka biri PowerPoint'e sayı aktarır, üçüncü kişi veri odasındaki CIM ile tutup tutmadığını kontrol eder. İki saat sonra kimse emin olamaz: hangi hücre neden değişti, o değişiklik değerlemeyi nereye çekti, rakam hangi belgenin hangi sayfasından geldi. Provenance tam olarak bu karanlık noktaya kuruldu. San Francisco merkezli girişim, finansal modelleri ve sunumları kaynak belgelerle bağlayan, her değişikliği kimin yaptığını ve neden yaptığını kaydeden bir kayıt sistemi vadediyor. İddia net: model incelemesini iki saatten on beş dakikaya indirmek.

Şirketi 2026'da Tuna Üsküdar, Arda Dinç ve Christopher Risio birlikte kurdu. Kurucu mühendis olarak Prahaas Nukala da ekibin merkezinde. Merkez San Francisco, ikinci ofis Boston. New York, San Francisco ve Boston'da yan yana çalışıyorlar. Yaş ortalaması düşük, iddia büyük: milyar dolarlık işlemlerin dayandığı tabloları e-posta ekindeki dosyalar olmaktan çıkarıp denetlenebilir bir altyapıya oturtmak.

Tuna Üsküdar CEO. İzmir Amerikan Koleji mezunu, Boston College Carroll School of Management'ta Gabelli Presidential Scholar. Bu burs her yıl otuz beş bin başvurudan on sekiz kişiye veriliyor. Finans, bilgisayar bilimi, girişimcilik ve ekonomi okuyor. Provenance öncesinde lise öğrencilerini üniversite öğrencileriyle eşleştiren karlı bir pazar yeri olan StudentGuided'i kurup büyüttü. Boston College girişimlerine yatırım yapan SSC Venture Partners'ta önce analist, sonra kıdemli analist olarak çalıştı. Bloomberg Global Trading Challenge 2025'te Kuzey Amerika'da ilk yirmi beşe girdi. Kendi ifadesiyle finansı dışarıdan bozmaya çalışmıyor. Deal ekiplerinin zaten içinde olduğu Excel ve PowerPoint işine oturan bir araç inşa ediyor.

Arda Dinç kurucu ortak ve ürünün ilk mimarlarından. 2004'te İstanbul'da doğdu, Kaliforniya'da büyüdü, Sage Hill Lisesi'nden sonra New York Üniversitesi'nde bilgisayar bilimi okumaya başladı. LinkedIn profilinde fintech, araştırma, sağlık ve kripto üzerine ürün geliştirdiğini yazıyor. Daha önce LabScoutr'da kurucu ortak ve ürün mühendisi, RevSplit Finance'te kurucu yazılımcı olarak çalıştı. Lisedeyken borsa alım satımını risksiz simüle eden World Wide Market uygulamasını çıkarmıştı. Provenance'ın ilk sürümünü Tuna ile birlikte tasarladıktan sonra Lincoln International gibi bir yatırım bankasıyla görüşmeye gittiler. Yani ürün, slayt destesi üzerinden değil, gerçek deal ekiplerinin masasında doğrulandı.

Christopher Risio Boston College'da bilgisayar bilimi okuyor. VC destekli girişimlerde ürün çıkarmış, bazılarını da elden çıkarmış bir mühendis. Cro Metrics'te büyüme ve deney araçları yazıyor. Rush Ticketing'te kurucu mühendislik yaptı, FSEN'de acil servis yönlendirme katmanını birlikte kurdu. Nonlinear ve Levo gibi şirketlerde staj dönemlerinde üretim kodu yazdı. Prahaas Nukala ise kurucu mühendis olarak kayıt sisteminin teknik omurgasını taşıyor.


2026 yazında şirket tohum öncesi (pre-seed) turunu $20M değerleme üzerinden kapattı. Tutar açıklanmadı. Tur, Jackson Square Ventures liderliğinde tamamlandı, Glasswing Ventures katıldı. Jackson Square, Strava'nın ilk kurumsal yatırımcısı, Upwork ve DocuSign'in erken dönem destekçilerinden. Ekip, fonun yüzde birin altında kabul oranına sahip Launchpad S26 dönemine alındı. Tuna aynı zamanda bu programda Founder in Residence. Haziran sonunda Glasswing yatırımını duyururken Rudina Seseri, James Massaquoi ve Kleida Martiro'nun yanı sıra Jackson Square'den Greg Gretsch ve Victor Echevarria'ya teşekkür etti.

Ağustos 2026'da Türkiye'nin ilk girişim sermayesi fonu 212, Fund III'ün dokuzuncu yatırımı olarak Provenance'a $500K koydu. Aynı tabloya SSC Venture Partners $100K ile girdi. StorageNetworks'ü üç yılda 120 milyon dolar ciroya ve halka arza taşıyan, EMC'de on yıl geçiren, Highland Capital Partners'ta Managing General Partner'lık yapan Peter Bell de yatırımcılar arasına katıldı. 212 Yatırım Direktörü Özge Sevim, erken dönem müşteri ilgisinin ürün-pazar ihtiyacını doğruladığını söyledi. Şirket bu sermayeyi ürünü geliştirmeye ve Orta Doğu, Amerika ile Asya'da büyümeye ayıracağını açıkladı.

Nakit yatırımın yanında iki program daha var. Mayıs 2026'da QNB Grubu'nun hızlandırma programı QNBEYOND'un sekizinci dönemine kabul edilen dokuz girişimden biri oldular. Programa her yıl yedi yüz başvurudan sekizi kalıyor. NVIDIA Inception'da da yer alıyorlar. SOC 2 Type II ve ISO 27001 süreçleri devam ediyor, sürekli izleme Vanta üzerinden yürütülüyor.

Provenance genel amaçlı bir sohbet asistanını finansa çevirmiyor. Excel ve PowerPoint'in içine oturan bir eklenti. Analist modeli nasıl kullanıyorsa öyle kullanmaya devam ediyor. Her anlamlı sürüm, yazarı, gerekçesi ve dosyanın o andaki haliyle kayda geçiyor. Değişen bir sürücüyü değerlemeye, nakit akışına ve dokunduğu her çıktıya kadar izleyen fark katmanı, düz metin karşılaştırması değil. Motor formül, öncül ve bağımlı hücreleri okuyor.

Asıl iddia eşleştirme motorunda. Şirket bu katmanda sıfır model çağrısı yaptığını söylüyor. Bir rakamın kaynağa oturup oturmadığı tahminle değil, sekiz kimlik kontrolüyle çözülüyor: metrik, kurum, dönem, dönem sonu, enstrüman, birim, ölçek ve boyutlar. Eşleşme tutmuyorsa motor en yakın cevabı uydurmak yerine tutmadığını söylüyor. Her eşleşmenin altında bir insan imzası var. Hücreye tıklayınca makbuz, rakamın geldiği belgenin tam sayfasını açıyor. Veri odası bir kez yükleniyor, her sayı sayfasını koruyan bir satıra dönüşüyor.

PowerPoint aynı titizlikle tutuluyor. Çünkü rakam binayı modelde değil, sunumda terk ediyor ve sunum modelden çok daha sık yeniden yapılıyor. İki sürüm arasında metin, sayı, biçim ve grafiklerin arkasındaki veri karşılaştırılıyor. Yorumlar slaytta kalıyor, bir sonraki yeniden yazımda e-posta zincirinde kaybolmuyor. Asistan katmanı modellerden, belgelerden ve geçmişten cevap veriyor, her cevabı geldiği sürüme bağlıyor. Karar Slack, Teams, e-posta ve Outlook üzerinden kabul veya red ile düşebiliyor.

Şirketin kendi aritmetiği şöyle duruyor. On iki kişilik bir deal ekibinde doğru sürümü bulmak, neyin değiştiğini anlamak ve rakamın nereden geldiğini çözmek yılda 3.456 saat. Kişi başına yıllık 250 bin dolar yüklenmiş maliyetle bu iş yaklaşık 327 bin dolar. On katlık bir kısalma varsayımıyla kişi başına haftada 5.4 saat geri geliyor. Bu bir ölçüm sonucu değil, tipik girdiler üzerinden bir hesap. Ama problem sahici: yapay zeka modeli yazma hızını artırdı, inceleme ve doğrulama aynı hıza yetişemedi.

Yatırım bankacılığı, özel sermaye, özel kredi ve FP&A ekipleri milyarlarca dolarlık kararı hala e-posta ile dolaşan dosyaların üzerine kuruyor. Yapay zeka analistin işini hızlandırdıkça bu açık büyüyor. Üretilen iş çoğalıyor, imza atan tarafın elindeki araçlar yerinde sayıyor. Provenance tam da imza atan taraf için yazıldığını söylüyor. VP veya MD aynı modeli tekrar tekrar okuyor, üreten taraf yapay zekadan faydalanırken inceleyen taraf satırdan satıra bakmaya devam ediyor.

Çözdükleri şey tek bir hata yakalamak değil. Kaynağı belirsiz bir rakamın komiteye gitmesini, veri odasıyla örtüşmeyen bir slaydın binayı terk etmesini, kimsenin sahiplenemediği bir formül değişikliğinin değerlemeyi sessizce kaydırmasını önlemek. Tuna Üsküdar'ın ifadesiyle finansal modeller milyarlar hareket ettiriyor ama kayıt tutulmayan dosyalarda yaşıyor. Hedef, yapay zeka ile üretilen finansal iş için global ölçekte bir doğrulama ve inceleme standardı olmak. Eğer bu katman tutarsa mesele yalnızca daha hızlı kapanmak olmaz. İmzanın arkasında, her rakamın geldiği sayfaya kadar inen bir kanıt durur.

Kaynaklar: [Provenance](https://www.provenancexl.com), [Webrazzi](https://webrazzi.com/2026/08/17/fintech-girisimi-provenance-212-den-500-bin-dolar-yatirim-aldi/), [e-girişim](https://egirisim.com/2026/08/17/turk-girisimcilerin-san-franciscoda-kurdugu-provenance-20-milyon-dolar-degerleme-uzerinden-yatirim-aldi/), [Swipeline](https://swipeline.co/turk-kuruculara-sahip-provenance-tohum-oncesi-turunu-20-milyon-dolar-degerleme-ile-tamamladi/), [The Disruptor Magazine](https://thedisruptormag.com/us-based-turkish-founded-provenance-secures-500k-from-212/), [Dealroom](https://app.dealroom.co/news/note/provenance-closes-pre-seed-at-20m-valuation-backed-by-jackson-square-and-glasswing)
`,
      },
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
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      create: post,
      update: {},
    });
  }

  console.log("Seed tamamlandı: yazılar hazır.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
