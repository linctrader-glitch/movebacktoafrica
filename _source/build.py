"""Builds the Build With Ada static site into ./site from the page bodies below."""
import json, os, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ROOT, "site")
DOMAIN = "https://movebacktoafrica.com"
STAN = "https://stan.store/buildwithada"
WORKBOOK = "https://stan.store/buildwithada/p/how-to-move-back-to-africa"
TIKTOK = "https://www.tiktok.com/@build.withada"
INSTA = "https://www.instagram.com/build.withada/"
FACEBOOK = "https://www.facebook.com/buildwithada/"

MARK = """<svg viewBox="0 0 34 34" aria-hidden="true"><rect width="34" height="34" rx="6" fill="#1D2B64"/>
<path d="M17 5 29 17 17 29 5 17Z" fill="#E3A72F"/><path d="M17 11 23 17 17 23 11 17Z" fill="#1D2B64"/>
<rect x="15.5" y="15.5" width="3" height="3" fill="#2E6B45"/></svg>"""

PIXEL = """<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1704784206779963');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=1704784206779963&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->"""

NAV = [("index.html", "Home"), ("guides/index.html", "Guides"), ("quiz.html", "Readiness quiz"),
       ("shop.html", "Shop"), ("about.html", "About Ada")]


def page(path, title, description, body, current=None, jsonld=None, image="img/cover-move-back.jpg"):
    depth = path.count("/")
    pre = "../" * depth
    nav = "".join(
        f'<a href="{pre}{href}"{" aria-current=\"page\"" if href == current else ""}>{label}</a>'
        for href, label in NAV)
    url = DOMAIN + "/" + ("" if path == "index.html" else path)
    ld = ""
    if jsonld:
        ld = '<script type="application/ld+json">' + json.dumps(jsonld, ensure_ascii=False) + "</script>"
    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="{url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{DOMAIN}/{image}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{pre}styles.css">
{ld}
{PIXEL}
</head>
<body>
<div class="weave thin" aria-hidden="true"></div>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="{pre}index.html">{MARK}<span>Move Back to Africa</span></a>
    <nav class="nav" aria-label="Main">{nav}</nav>
  </div>
</header>
<main>
{body}
</main>
<footer class="site-footer">
  <div class="wrap">
    <div>
      <p><strong>Move Back to Africa</strong><br>Honest planning for the African diaspora going home.<br>Created by Ada Eguzouwa, founder of Build With Ada.</p>
      <p><a href="{STAN}">Shop on Stan</a></p>
      <p class="social">Follow Build With Ada on <a href="{TIKTOK}">TikTok</a>, <a href="{INSTA}">Instagram</a> and <a href="{FACEBOOK}">Facebook</a></p>
    </div>
    <p class="small">The guides and workbooks on this site are general information, not legal, tax, immigration or financial advice. &copy; 2026 Move Back to Africa.</p>
  </div>
</footer>
</body>
</html>
"""
    dest = os.path.join(OUT, path)
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    with open(dest, "w", encoding="utf-8") as f:
        f.write(html)


def read(name):
    with open(os.path.join(ROOT, "pages", name), encoding="utf-8") as f:
        return f.read().replace("{STAN}", WORKBOOK)


def main():
    if os.path.exists(OUT):
        shutil.rmtree(OUT)
    os.makedirs(OUT)
    shutil.copy(os.path.join(ROOT, "styles.css"), OUT)
    shutil.copy(os.path.join(ROOT, "quiz.js"), OUT)
    shutil.copytree(os.path.join(ROOT, "img"), os.path.join(OUT, "img"))

    person = {"@context": "https://schema.org", "@type": "Person", "name": "Ada Eguzouwa",
              "jobTitle": "Nurse-turned-agripreneur, founder of Build With Ada and Move Back to Africa",
              "url": DOMAIN, "sameAs": [STAN, TIKTOK, INSTA, FACEBOOK],
              "description": "Nurse-turned-entrepreneur building agribusinesses in Nigeria, including Manna Farms and FarmLog, and helping the African diaspora plan their move or investment back home."}

    page("index.html", "Move Back to Africa | Plan your move home with a checklist, quiz and workbook",
         "Planning to move back to Africa? Get the 2026 checklist, a free readiness quiz and a relocation workbook for the African diaspora, by Ada Eguzouwa.",
         read("home.html"), "index.html", [person, {"@context": "https://schema.org", "@type": "WebSite", "name": "Move Back to Africa", "url": DOMAIN}])
    page("about.html", "About Ada Eguzouwa | Move Back to Africa",
         "Ada Eguzouwa is a nurse-turned-agripreneur, founder of Manna Farms and FarmLog, who helps the African diaspora plan their move back home.",
         read("about.html"), "about.html", person)
    page("shop.html", "Shop: Workbooks and Guides for the African Diaspora | Move Back to Africa",
         "How to Move Back to Africa, a $37 relocation planning workbook for the African diaspora by Ada Eguzouwa, plus guides coming soon.",
         read("shop.html"), "shop.html",
         {"@context": "https://schema.org", "@type": "Product",
          "name": "How to Move Back to Africa: A Relocation Planning Workbook for the African Diaspora",
          "description": "A 55-question readiness checklist and nine worksheets covering income, budget, property, family, health, schooling, papers and your first 90 days.",
          "brand": {"@type": "Brand", "name": "Move Back to Africa"},
          "offers": {"@type": "Offer", "price": "37.00", "priceCurrency": "USD", "url": WORKBOOK,
                     "availability": "https://schema.org/InStock"}})
    page("quiz.html", "Are You Ready to Move Back to Africa? Free Readiness Quiz",
         "Answer 11 quick questions and get your move-back readiness score, plus the areas to fix first.",
         read("quiz.html") + '<script src="quiz.js"></script>', "quiz.html")
    page("guides/index.html", "Guides for Moving Back to Africa | Move Back to Africa",
         "Free, honest guides for the African diaspora planning a move or investment back home.",
         read("guides.html"), "guides/index.html")

    faq = [
        ("How much money do I need to move back to Africa?",
         "Plan for at least 12 months of living costs at today's local prices, separate from any building or business money, plus a fund to return abroad if you need to. Build the budget from what people who live there now pay, not prices from your last visit."),
        ("What is the biggest mistake people make when moving back home?",
         "Moving on emotion without an income plan. The second is trusting relatives or caretakers with money and property without independent checks. Many of the biggest losses come from people the returnee trusted, not strangers."),
        ("Should I buy or build a house before I move back?",
         "Not necessarily. Renting first lets you test the city, the commute and daily life before you commit your savings. Put your money into something that earns income first, and build later."),
        ("How do I check land before I buy it from abroad?",
         "Confirm the title at the land registry yourself, not only through the seller or a relative. Use a lawyer and surveyor who are not family, see the land in person or on a live video call you control, and never pay the next stage until you have verified the last one."),
        ("How long should I visit before I move back for good?",
         "Aim for a trial stay of at least three months within the two years before your move, living on a local budget and solving everyday problems yourself, not on holiday."),
        ("Is moving back to Africa a failure?",
         "No. Moving back is a decision, not a retreat. Set a review date six or twelve months in to decide whether to stay, adjust or go back without shame."),
    ]
    article = {"@context": "https://schema.org", "@graph": [
        {"@type": "Article", "headline": "Moving Back to Africa: The 2026 Checklist",
         "author": {"@type": "Person", "name": "Ada Eguzouwa"}, "datePublished": "2026-11-22",
         "publisher": {"@type": "Organization", "name": "Move Back to Africa"}},
        {"@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}]}
    faq_html = "".join(f"<dt>{q}</dt><dd>{a}</dd>" for q, a in faq)
    page("guides/moving-back-to-africa-checklist.html",
         "Moving Back to Africa: The 2026 Checklist",
         "An honest checklist for the African diaspora moving back home: income, budget, land and trust, family, health, schooling, papers and your first 30 days.",
         read("article-checklist.html").replace("{FAQ}", faq_html), "guides/index.html", article)

    def guide(slug, headline, description, template, faq, image, date="2026-11-24"):
        ld = {"@context": "https://schema.org", "@graph": [
            {"@type": "Article", "headline": headline,
             "author": {"@type": "Person", "name": "Ada Eguzouwa"}, "datePublished": date,
             "publisher": {"@type": "Organization", "name": "Move Back to Africa"}},
            {"@type": "FAQPage", "mainEntity": [
                {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq]}]}
        html = read(template).replace("{FAQ}", "".join(f"<dt>{q}</dt><dd>{a}</dd>" for q, a in faq))
        ld["@graph"][0]["image"] = DOMAIN + "/" + image
        page("guides/" + slug, headline, description, html, "guides/index.html", ld, image)

    guide("how-much-does-it-cost-to-move-back-to-africa.html",
          "How Much Does It Really Cost to Move Back to Africa?",
          "How much money do you need to move back to Africa? The four money buckets, the hidden costs and how to work out your own number, by Ada Eguzouwa.",
          "article-cost.html", [
              ("How much money do I need to move back to Africa?",
               "It depends on the city, your family and your income, so there is no single number. Plan for four buckets: the cost of the move, your first 90 days, your monthly living costs, and a safety net of at least 12 months of living costs plus a fund to return abroad if you need to."),
              ("Is it cheaper to live in Africa than in the US, UK or Canada?",
               "Some things are cheaper, such as local food and household help. Others can cost more, such as imported goods, private schools, backup power, cars and private health care. Rents in areas popular with returnees can be high and are often paid one or two years upfront."),
              ("Can I move to Africa with no money?",
               "It is very risky. Without savings or income that continues after you move, any emergency can force you back abroad. Build an income that works from Africa and a 12-month safety net first."),
              ("Should I ship my things or buy them there?",
               "Get shipping quotes that include customs duty and clearing fees, then compare them with local prices. Many returnees find it is cheaper to ship only what matters most and buy the rest locally."),
          ], "img/bridge-lean.jpg")
    guide("are-you-ready-to-move-back-to-africa.html",
          "Are You Ready to Move Back to Africa? 10 Questions to Ask Yourself First",
          "Wanting to move back home is not the same as being ready. Answer these 10 honest questions before you book a one-way ticket to Africa.",
          "article-ready.html", [
              ("How do I know if I am ready to move back to Africa?",
               "You are close to ready when you have income that continues after you move, a budget based on today's local prices, at least 12 months of savings, your family's agreement, a health care plan, the right documents, and a trial stay of at least three months behind you."),
              ("Should I move back to Africa?",
               "Only you can decide, but decide with a plan rather than emotion alone. Answer the 10 questions in this guide honestly and take the free readiness quiz to see which areas need work first."),
              ("How long should I prepare before moving back?",
               "Most people need 12 to 24 months to build income, save a safety net, sort documents and do a trial stay. Moving faster is possible, but the gaps usually show up as stress and lost money later."),
          ], "img/ada-farm-tools.jpg")
    guide("where-should-i-move-in-africa.html",
          "Where Should I Move in Africa? How to Choose Your Country",
          "How to choose where to live in Africa: 8 things to compare, countries with diaspora citizenship and residency routes, and how to test your choice.",
          "article-where.html", [
              ("Where are Black Americans moving to in Africa?",
               "Ghana is the best-known destination, followed by countries such as Nigeria, Kenya, South Africa, Senegal, Rwanda, Sierra Leone and Benin. The right choice depends on your legal right to stay, income, cost of living, safety, health care, schools, language and community."),
              ("Which African countries offer citizenship to the diaspora?",
               "As of November 2026, Ghana, Sierra Leone, Benin and Guinea-Bissau have special citizenship or return programmes for people of African descent. Ghana also offers the Right of Abode residency status. Ghana paused new diaspora citizenship applications in February 2026 to overhaul the process. Rules change often, so check official government sources before you apply."),
              ("Can an American just move to Africa?",
               "You can visit many African countries easily, but living there long-term needs a residency permit, work permit, Right of Abode or citizenship, depending on the country. Check the immigration rules of the specific country before you plan your move."),
          ], "img/yaounde-monument.jpg")

    with open(os.path.join(OUT, "robots.txt"), "w") as f:
        f.write(f"User-agent: *\nAllow: /\n\nSitemap: {DOMAIN}/sitemap.xml\n")
    urls = ["", "about.html", "shop.html", "quiz.html", "guides/index.html",
            "guides/moving-back-to-africa-checklist.html",
            "guides/how-much-does-it-cost-to-move-back-to-africa.html",
            "guides/are-you-ready-to-move-back-to-africa.html",
            "guides/where-should-i-move-in-africa.html"]
    with open(os.path.join(OUT, "sitemap.xml"), "w") as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for u in urls:
            mod = "2026-11-24" if u in ("guides/index.html",) or u.startswith(("guides/how", "guides/are", "guides/where")) else "2026-11-22"
            f.write(f"  <url><loc>{DOMAIN}/{u}</loc><lastmod>{mod}</lastmod></url>\n")
        f.write("</urlset>\n")
    with open(os.path.join(OUT, "CNAME"), "w") as f:
        f.write("movebacktoafrica.com\n")
    with open(os.path.join(OUT, "llms.txt"), "w") as f:
        f.write(read("llms.txt"))


if __name__ == "__main__":
    main()
