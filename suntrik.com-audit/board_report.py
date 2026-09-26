"""Board-ready SEO audit PDF for suntrik.com (A4). Run: python board_report.py"""
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib import font_manager
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table,
                                TableStyle, Image, PageBreak, KeepTogether, NextPageTemplate)

HERE = os.path.dirname(os.path.abspath(__file__))  # chart PNG is written next to this script
OUT = os.path.join(HERE, 'Suntrik-SEO-Audit-Board-Report.pdf')

# ── Fonts (Segoe UI covers ₹ → – ≤) ──────────────────────────────────────────
F = 'C:/Windows/Fonts/'
pdfmetrics.registerFont(TTFont('UI', F + 'segoeui.ttf'))
pdfmetrics.registerFont(TTFont('UI-SB', F + 'seguisb.ttf'))
pdfmetrics.registerFont(TTFont('UI-B', F + 'segoeuib.ttf'))
pdfmetrics.registerFontFamily('UI', normal='UI', bold='UI-B', italic='UI', boldItalic='UI-B')

# ── Tokens ──────────────────────────────────────────────────────────────────
INK = colors.HexColor('#111827')
INK2 = colors.HexColor('#4B5563')
MUTED = colors.HexColor('#6B7280')
RULE = colors.HexColor('#E5E7EB')
ZEBRA = colors.HexColor('#F9FAFB')
ORANGE = colors.HexColor('#E8590C')   # final / brand accent (validated pair)
BLUE = colors.HexColor('#3A6FD8')     # mid-day
TINT = colors.HexColor('#FFF4EC')
GOOD = colors.HexColor('#15803D')
NAVY = colors.HexColor('#0B1220')

S = {
    'h1': ParagraphStyle('h1', fontName='UI-B', fontSize=20, leading=25, textColor=INK, spaceAfter=4),
    'h2': ParagraphStyle('h2', fontName='UI-B', fontSize=13, leading=17, textColor=INK, spaceBefore=10, spaceAfter=5),
    'lead': ParagraphStyle('lead', fontName='UI', fontSize=10.5, leading=15.5, textColor=INK, spaceAfter=6),
    'p': ParagraphStyle('p', fontName='UI', fontSize=9.5, leading=14, textColor=INK2, spaceAfter=5),
    'small': ParagraphStyle('small', fontName='UI', fontSize=8, leading=11, textColor=MUTED),
    'cell': ParagraphStyle('cell', fontName='UI', fontSize=8.6, leading=11.6, textColor=INK),
    'cellb': ParagraphStyle('cellb', fontName='UI-SB', fontSize=8.6, leading=11.6, textColor=INK),
    'cellh': ParagraphStyle('cellh', fontName='UI-SB', fontSize=8.2, leading=11, textColor=colors.white),
    'bullet': ParagraphStyle('bullet', fontName='UI', fontSize=9.5, leading=14, textColor=INK2, leftIndent=12, bulletIndent=2, spaceAfter=3),
}

def P(t, s='p'): return Paragraph(t, S[s])
def bullets(items): return [Paragraph(i, S['bullet'], bulletText='•') for i in items]

def table(rows, widths, header=True, bold_first=False, align_right=(), highlight_rows=()):
    data = []
    for r_i, r in enumerate(rows):
        row = []
        for c_i, c in enumerate(r):
            st = 'cellh' if header and r_i == 0 else ('cellb' if (bold_first and c_i == 0) or r_i in highlight_rows else 'cell')
            row.append(Paragraph(str(c), S[st]))
        data.append(row)
    t = Table(data, colWidths=widths, repeatRows=1 if header else 0)
    st = [('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
          ('TOPPADDING', (0, 0), (-1, -1), 3.8), ('BOTTOMPADDING', (0, 0), (-1, -1), 3.8),
          ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
          ('LINEBELOW', (0, 0), (-1, -1), 0.5, RULE)]
    if header:
        st += [('BACKGROUND', (0, 0), (-1, 0), NAVY)]
    for i in range(1 if header else 0, len(rows)):
        if (i % 2 == 0): st.append(('BACKGROUND', (0, i), (-1, i), ZEBRA))
    for i in highlight_rows:
        st.append(('BACKGROUND', (0, i), (-1, i), TINT))
    t.setStyle(TableStyle(st))
    return t

# ── Stat tiles ──────────────────────────────────────────────────────────────
def tiles(items, width):
    """items: (value, label, sub, accent_color)"""
    cells = []
    for v, label, sub, col in items:
        cells.append([
            Paragraph(f'<font color="{col}">{v}</font>', ParagraphStyle('tv', fontName='UI-B', fontSize=30, leading=34, textColor=INK)),
            Paragraph(label, ParagraphStyle('tl', fontName='UI-SB', fontSize=9.5, leading=13, textColor=INK)),
            Paragraph(sub, ParagraphStyle('ts', fontName='UI', fontSize=8, leading=11, textColor=MUTED)),
        ])
    n = len(items)
    w = (width - (n - 1) * 6) / n
    inner = [Table([[c] for c in cell], colWidths=[w - 16]) for cell in cells]
    for it in inner:
        it.setStyle(TableStyle([('LEFTPADDING', (0, 0), (-1, -1), 0), ('RIGHTPADDING', (0, 0), (-1, -1), 0),
                                ('TOPPADDING', (0, 0), (-1, -1), 1), ('BOTTOMPADDING', (0, 0), (-1, -1), 1)]))
    row = []
    widths = []
    for i, it in enumerate(inner):
        row.append(it); widths.append(w)
        if i < n - 1: row.append(''); widths.append(6)
    t = Table([row], colWidths=widths)
    st = [('VALIGN', (0, 0), (-1, -1), 'TOP')]
    for i in range(0, len(row), 2):
        st += [('BOX', (i, 0), (i, 0), 0.6, RULE), ('BACKGROUND', (i, 0), (i, 0), colors.white),
               ('LEFTPADDING', (i, 0), (i, 0), 8), ('TOPPADDING', (i, 0), (i, 0), 8), ('BOTTOMPADDING', (i, 0), (i, 0), 9)]
    t.setStyle(TableStyle(st))
    return t

# ── Chart: dumbbell, mid-day vs final per category ──────────────────────────
def dumbbell(path):
    font_manager.fontManager.addfont(F + 'segoeui.ttf')
    font_manager.fontManager.addfont(F + 'seguisb.ttf')
    plt.rcParams['font.family'] = 'Segoe UI'
    cats = ['Technical SEO', 'Content Quality', 'On-Page SEO', 'Schema', 'Performance', 'AI Search Readiness', 'Images', 'Local SEO*']
    mid = [88, 58, 70, 75, 78, 62, 72, 52]
    fin = [95, 70, 90, 92, 80, 72, 88, 78]
    fig, ax = plt.subplots(figsize=(7.2, 3.9), dpi=220)
    ys = list(range(len(cats)))[::-1]
    for y, a, b in zip(ys, mid, fin):
        ax.plot([a, b], [y, y], color='#D1D5DB', lw=2, solid_capstyle='round', zorder=1)
        ax.scatter([a], [y], s=70, color='#3A6FD8', edgecolor='white', linewidth=1.8, zorder=3)
        ax.scatter([b], [y], s=70, color='#E8590C', edgecolor='white', linewidth=1.8, zorder=3)
        ax.text(a - 1.6, y, str(a), ha='right', va='center', fontsize=8, color='#4B5563')
        ax.text(b + 1.6, y, f'{b}  (+{b - a})', ha='left', va='center', fontsize=8, color='#111827')
    ax.set_yticks(ys); ax.set_yticklabels(cats, fontsize=8.5, color='#111827')
    ax.set_xlim(40, 108); ax.set_xticks([40, 50, 60, 70, 80, 90, 100])
    ax.tick_params(axis='x', labelsize=7.5, colors='#6B7280', length=0)
    ax.tick_params(axis='y', length=0)
    ax.grid(axis='x', color='#F0F1F3', lw=0.8); ax.set_axisbelow(True)
    for s in ax.spines.values(): s.set_visible(False)
    ax.scatter([], [], s=50, color='#3A6FD8', label='Mid-day audit (26 Sep)')
    ax.scatter([], [], s=50, color='#E8590C', label='Final (26 Sep)')
    ax.legend(loc='upper center', bbox_to_anchor=(0.45, 1.13), ncol=2, frameon=False, fontsize=8)
    ax.set_xlabel('Score (0–100)', fontsize=8, color='#6B7280')
    fig.tight_layout()
    fig.savefig(path, dpi=220, facecolor='white')
    plt.close(fig)

# ── Page decoration ─────────────────────────────────────────────────────────
W, H = A4
M = 16 * mm

def on_page(c, doc):
    c.saveState()
    c.setFillColor(ORANGE); c.rect(0, H - 4, W, 4, fill=1, stroke=0)
    c.setFont('UI', 7.5); c.setFillColor(MUTED)
    c.drawString(M, 10 * mm, 'suntrik.com — SEO Audit & Results · Board report · 26 September 2026')
    c.drawRightString(W - M, 10 * mm, f'{doc.page}')
    c.restoreState()

def on_cover(c, doc):
    c.saveState()
    c.setFillColor(NAVY); c.rect(0, H * 0.52, W, H * 0.48, fill=1, stroke=0)
    c.setFillColor(ORANGE); c.rect(0, H * 0.52 - 3, W, 3, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont('UI-SB', 10); c.drawString(M, H - 30 * mm, 'SUNTRIK GREEN ENERGY PVT. LTD.  ·  BOARD REPORT')
    c.setFont('UI-B', 30); c.drawString(M, H - 52 * mm, 'Website SEO Audit')
    c.drawString(M, H - 65 * mm, '& Results')
    c.setFont('UI', 12); c.setFillColor(colors.HexColor('#D1D5DB'))
    c.drawString(M, H - 78 * mm, 'www.suntrik.com  ·  Audit 23 Sep → fixes live 25–26 Sep 2026')
    c.setFont('UI', 8); c.setFillColor(colors.HexColor('#9CA3AF'))
    c.drawString(M, H * 0.52 + 10 * mm, 'Scores use the open-source claude-seo audit method (weighted 0–100). Lighthouse figures are lab tests on the live site.')
    c.restoreState()

# ── Content ─────────────────────────────────────────────────────────────────
def build():
    chart = os.path.join(HERE, 'dumbbell.png')
    dumbbell(chart)
    CW = W - 2 * M
    story = []

    # Cover (lower half)
    story.append(Spacer(1, H * 0.48 - 8 * mm))
    story.append(tiles([
        ('~30–35', 'Before (25 Sep)', 'Estimate — Google saw every page as a copy of the homepage', '#6B7280'),
        ('72', 'Mid-day audit (26 Sep)', 'After pre-rendering, host and sitemap fixes', '#3A6FD8'),
        ('84', 'Final score (26 Sep)', 'After content, schema, image and local fixes', '#E8590C'),
    ], CW))
    story.append(Spacer(1, 7 * mm))
    story.append(tiles([
        ('11 / 11', 'Pages Google can read', 'Own title, canonical and full text (was 1 of 10)', '#111827'),
        ('100', 'Lighthouse SEO, every page', 'Accessibility 99–100 on all pages', '#111827'),
        ('52 → 78', 'Local SEO', 'Website now linked to the Google Business Profile', '#111827'),
    ], CW))
    story.append(Spacer(1, 7 * mm))
    story.append(P('<b>Bottom line:</b> the technical problems that kept suntrik.com almost invisible in Google are fixed and live. '
                   'The next gains depend on management decisions (verified claims, one business name and phone number across listings, '
                   'a named author) and on steady content and reviews — not on more code.', 'lead'))
    story.append(NextPageTemplate('body'))
    story.append(PageBreak())

    # 1. Executive summary
    story.append(P('1. Executive summary', 'h1'))
    story.append(P('An external audit on 23 September 2026 found that Google treated every page of suntrik.com as a duplicate of the homepage. '
                   'Only the homepage and one old blog post were indexed, and generic searches such as “solar company Sirsa” returned JustDial and a competitor instead of Suntrik. '
                   'Between 25 and 26 September every technical finding was fixed and deployed, the site was re-audited, and it now scores <b>84/100</b>.', 'lead'))
    story.append(P('What was wrong', 'h2'))
    story += bullets([
        'Every URL sent Google the homepage’s title, description and canonical tag — telling Google that all pages were copies of the homepage.',
        'No text in the HTML: content appeared only after JavaScript ran, so search and AI crawlers saw an empty page.',
        'Two hosts (suntrik.com and www.suntrik.com) both served the site; the sitemap was incomplete and undated.',
        'Business name, address and phone differed between the website and listings; some published claims could not be verified.',
    ])
    story.append(P('What was done', 'h2'))
    story += bullets([
        '<b>Every page now ships its own HTML</b> — title, description, canonical, social tags, structured data and full text (e.g. PM Surya Ghar page: 0 → 1,376 words visible to Google).',
        '<b>One host</b> (www.suntrik.com), permanent redirects for old URLs, real 404 pages, and an auto-generated sitemap with dates.',
        '<b>Local search:</b> new Sirsa landing page; website linked to the Google Business Profile (4.9 of 5 from 35 reviews) with matching address, hours and map pin.',
        '<b>Content:</b> both scheme guides rewritten with 2026 figures and government sources, incl. Haryana’s extra state subsidy; an incorrect PM-KUSUM subsidy statement corrected.',
        '<b>Speed and accessibility:</b> fonts self-hosted, all 115 images converted to WebP, mobile fixes; accessibility 99–100 on every page.',
        '<b>Claims:</b> “NISE-certified” removed site-wide at management’s request.',
    ])
    story.append(P('Decisions needed from the Board', 'h2'))
    story.append(table([
        ['#', 'Decision', 'Why it matters'],
        ['1', 'Confirm with documents, or remove: “80 MWp”, “150 MW+”, “1,000+ clients”, “100% on-time”, “ISO”, “India’s Most Trusted”', 'Unprovable claims are a trust and compliance risk and weaken Google’s quality assessment'],
        ['2', 'One public name and one phone number on every listing (Google, JustDial, Facebook, Instagram, Bing)', 'Google matches a business across sources by name, address and phone; JustDial still shows the HR number'],
        ['3', 'Name an author (e.g. a director) for blog articles', 'Anonymous articles score lower for expertise and are cited less by AI answers'],
        ['4', 'Approve a content cadence: 2 articles a month on Haryana solar topics', 'Content is now the lowest-scoring category (70)'],
    ], [8 * mm, CW * 0.52, CW - 8 * mm - CW * 0.52]))
    story.append(PageBreak())

    # 2. Scorecard
    story.append(P('2. Scorecard', 'h1'))
    story.append(P('The weighted SEO Health Score rose from 72 at the mid-day audit to 84 after the final round. '
                   'On-Page SEO (+20), Schema (+17) and Images (+16) moved most; Content (70) and AI Search Readiness (72) remain the weakest.', 'lead'))
    story.append(Image(chart, width=CW, height=CW * 3.9 / 7.2))
    story.append(P('*Local SEO is scored separately and is not part of the weighted total. The pre-fix state (25 Sep) was not scored per category; its overall ~30–35 is an estimate.', 'small'))
    story.append(Spacer(1, 4))
    story.append(table([
        ['Category', 'Weight', 'Mid-day', 'Final', 'Change', 'Main remaining gap'],
        ['Technical SEO', '22%', '88', '95', '+7', 'Minor: two-hop redirect from the bare domain'],
        ['Content Quality', '23%', '58', '70', '+12', 'Only 3 articles; anonymous author; unverified claims'],
        ['On-Page SEO', '20%', '70', '90', '+20', 'Some page headings are slogans without keywords'],
        ['Schema / Structured data', '10%', '75', '92', '+17', 'Named author (Person) not yet possible'],
        ['Performance (Core Web Vitals)', '10%', '78', '80', '+2', 'Homepage on mobile: main text appears at ~4.3 s'],
        ['AI Search Readiness', '10%', '62', '72', '+10', 'Author bylines; small presence beyond own site'],
        ['Images', '5%', '72', '88', '+16', 'Width/height not set on some images (no visible impact)'],
        ['Weighted total', '100%', '72', '84', '+12', ''],
        ['Local SEO (separate)', '—', '52', '78', '+26', 'JustDial phone/address; review pace; Apple Maps'],
    ], [CW * 0.25, CW * 0.09, CW * 0.1, CW * 0.08, CW * 0.09, CW * 0.39], bold_first=True, highlight_rows=(8,)))
    story.append(PageBreak())

    # 3. Before / after evidence
    story.append(P('3. Before and after — measured on the live site', 'h1'))
    story.append(P('Each “after” figure was measured on www.suntrik.com after deployment on 26 September 2026. '
                   '“Before” is the 23 September audit unless marked.', 'lead'))
    story.append(table([
        ['Measure', 'Before', 'After'],
        ['Pages with their own title, description and canonical', '1 of 10', '11 of 11'],
        ['Words Google sees on the PM Surya Ghar page (no JavaScript)', '≈ 0', '1,376'],
        ['Hosts serving the site', '2 (split)', '1 (www), other redirects'],
        ['Sitemap URLs with a last-modified date', '0 of 10', '11 of 11'],
        ['Unknown URLs', 'Homepage with status 200 (“soft 404”)', 'Proper 404 page'],
        ['Structured-data types', '1 (LocalBusiness)', '8 (Organization, LocalBusiness, WebSite, FAQPage, BlogPosting, BreadcrumbList, JobPosting, Service)'],
        ['Scheme guides — length', '414 and 395 words', '1,245 and 929 words, with sources'],
        ['Gallery / project photos', '45 JPG files, 8.6 MB', 'WebP, 4.7 MB; all 115 page images WebP'],
        ['Homepage Lighthouse, mobile — performance*', '45', '70–78 (varies by run)'],
        ['Homepage Lighthouse, mobile — accessibility*', '86', '100'],
        ['Homepage first content on mobile*', '4.9 s', '2.9 s'],
        ['AI crawlers (ChatGPT, Claude, Perplexity) receiving full page text', 'No', 'Yes — all six tested'],
        ['Website linked to Google Business Profile', 'No', 'Yes — address, hours, map pin, reviews link'],
    ], [CW * 0.46, CW * 0.22, CW * 0.32], bold_first=True))
    story.append(P('*Lighthouse “before” was measured on the morning of 26 September, after pre-rendering but before the speed fixes.', 'small'))
    story.append(P('Lighthouse by page (mobile, final)', 'h2'))
    story.append(P('Desktop homepage performance: 89. Layout shift is 0.00–0.01 on every page. Google’s “good” target for main content is 2.5 s.', 'small'))
    story.append(Spacer(1, 3))
    story.append(table([
        ['Page', 'Performance', 'Accessibility', 'Best practices', 'SEO', 'Main content shown'],
        ['Home', '71', '100', '100', '100', '4.3 s'],
        ['Solar company in Sirsa (new)', '88', '100', '100', '100', '3.2 s'],
        ['Projects', '89', '100', '100', '100', '3.0 s'],
        ['PM Surya Ghar', '82', '100', '100', '100', '3.3 s'],
        ['PM-KUSUM', '83', '100', '100', '100', '3.4 s'],
        ['Commercial & industrial', '85', '100', '100', '100', '3.5 s'],
        ['Careers', '91', '100', '100', '100', '2.7 s'],
        ['Blog', '85', '100', '100', '100', '3.4 s'],
        ['PM Surya Ghar guide', '86', '99', '100', '100', '3.5 s'],
        ['PM-KUSUM guide', '86', '99', '100', '100', '3.3 s'],
        ['80 MWp update', '86', '100', '100', '100', '3.3 s'],
    ], [CW * 0.34, CW * 0.13, CW * 0.13, CW * 0.14, CW * 0.09, CW * 0.17], bold_first=True))
    story.append(PageBreak())

    # 4. What changed
    story.append(P('4. What changed', 'h1'))
    story.append(table([
        ['Area', 'Change'],
        ['Indexing', 'Every route pre-rendered at build time with its own head tags and full body text; per-route titles and descriptions; client navigation keeps tags in sync'],
        ['Host & URLs', 'www.suntrik.com is the single host; old URLs (/about, /contact, /services, old O&amp;M post) redirect; real 404 page; clean URLs'],
        ['Sitemap & crawl', 'Sitemap generated from routes with dates (11 URLs); robots.txt; llms.txt for AI assistants'],
        ['Local', 'New /solar-company-sirsa page (services, process, office, FAQ, map, reviews); homepage copy names Sirsa and Haryana; address, hours and map pin match Google'],
        ['Content', 'PM Surya Ghar guide for Haryana (central + state subsidy, steps, worked example, sources); PM-KUSUM guide (Components A/B/C, 2027 extension, sources); C&amp;I page (CAPEX vs OPEX, net metering vs open access); Projects summary'],
        ['Accuracy', 'Removed “NISE-certified” everywhere; corrected PM-KUSUM Component A subsidy; removed placeholder “CIN: [on file]” and dead links; navbar subsidy wording'],
        ['Structured data', 'Organization, LocalBusiness (name, address, geo, hours, profiles), WebSite, FAQPage, BlogPosting, BreadcrumbList, JobPosting (5 roles), Service'],
        ['On-page', 'Unique H1 per page; titles ≤ 65 and descriptions ≤ 155 characters; blog posts linked from /blog; scheme pages and guides cross-linked'],
        ['Speed', 'Self-hosted fonts (removed a render-blocking Google Fonts call); WebP images (e.g. team photo 231 KB → 14 KB); long-lived caching; intro animation skipped on phones'],
        ['Mobile & accessibility', 'About section readable on phones; WhatsApp button moved; text contrast, form labels, heading order; security headers added'],
    ], [CW * 0.2, CW * 0.8], bold_first=True))
    story.append(P('Traffic baseline to track against', 'h2'))
    story.append(P('Vercel Web Analytics, 30 days to 26 September 2026: <b>326 visitors</b>, 593 page views, 69% bounce rate; Google was the top source (117 visitors), '
                   'followed by LinkedIn (25) and ChatGPT (10); 36% of visitors were on mobile. Ranking effects usually appear over 2–8 weeks as Google recrawls; '
                   'review these figures and Search Console monthly.'))
    story.append(PageBreak())

    # 5. Local SEO
    story.append(P('5. Local search (Sirsa)', 'h1'))
    story.append(P('Suntrik’s Google Business Profile is claimed and active: <b>“Suntrik Solutions”, Solar Energy Company, 4.9 of 5 from 35 reviews</b>, '
                   'owner replies, phone +91 75037 39000, open Monday–Saturday 10 am–7 pm. The website was not connected to it; it now is.', 'lead'))
    story.append(table([
        ['Signal', 'Website', 'Google', 'JustDial', 'Status'],
        ['Name', 'Suntrik Solutions (structured data); Suntrik Green Energy (brand)', 'Suntrik Solutions', 'Suntrik Solutions', 'Aligned'],
        ['Address', 'Rania Bazar, B Block, Subhash Chowk, Sirsa 125055', 'Same', 'Near Red Cross Office, Rania Bazar', 'Update JustDial'],
        ['Phone', '+91 75037 39000', '075037 39000', '87086 05564 (HR)', 'Update JustDial'],
        ['Hours', 'Mon–Sat 10 am–7 pm', 'Same', '—', 'Aligned'],
        ['Map pin & reviews link', 'On the Sirsa page and in structured data', 'Source', '—', 'Done'],
    ], [CW * 0.16, CW * 0.3, CW * 0.16, CW * 0.2, CW * 0.18], bold_first=True))
    story.append(P('Local actions', 'h2'))
    story += bullets([
        'Update JustDial to the main phone, email and the Google address wording (largest remaining mismatch).',
        'Edit the Bing Places description, which still says “NISE-certified” (copied from the old website).',
        'Ask every customer for a Google review after commissioning — the newest review is about four months old.',
        'Create an Apple Business Connect listing with the same name, address and phone.',
        'When real local projects exist, add Hisar, Fatehabad and Bathinda pages (thin copies would hurt rankings).',
    ])
    story.append(PageBreak())

    # 6. Roadmap
    story.append(P('6. Next steps', 'h1'))
    story.append(table([
        ['Priority', 'Action', 'Owner', 'Effort', 'Category lifted'],
        ['High', 'Decide on unverified claims; remove or evidence each', 'Board', '1 meeting', 'Content'],
        ['High', 'Align JustDial / Bing / Facebook with Google name, address, phone', 'Marketing', '1–2 hours', 'Local'],
        ['High', 'Resubmit sitemap in Search Console; request indexing for new and rewritten pages', 'Web', '30 min', 'Indexing'],
        ['High', 'Named author and short bio for articles', 'Board + Web', '1 hour', 'Content, AI'],
        ['Medium', 'Two articles a month on Haryana solar topics', 'Marketing', '2–3 hrs each', 'Content, AI'],
        ['Medium', 'Review request after every installation', 'Operations', 'Ongoing', 'Local'],
        ['Medium', 'Homepage mobile speed: reuse pre-rendered HTML instead of rebuilding it', 'Web', '1–2 days', 'Performance'],
        ['Medium', 'LinkedIn company page, Apple Business Connect', 'Marketing', '2 hours', 'AI, Local'],
        ['Low', 'Project case-study pages; Hisar / Fatehabad / Bathinda pages with real projects', 'Web + Ops', '½ day each', 'Content, Local'],
        ['Low', 'Hindi versions of the scheme pages', 'Web', '1–2 days', 'Content'],
    ], [CW * 0.1, CW * 0.47, CW * 0.14, CW * 0.12, CW * 0.17]))
    story.append(P('Method and limitations', 'h2'))
    story.append(P('Scores follow the claude-seo “seo-audit” method (Technical 22%, Content 23%, On-page 20%, Schema 10%, Performance 10%, AI readiness 10%, Images 5%), '
                   'applied by crawling all 11 URLs as raw HTML, running Lighthouse 12 on every page, and checking headers, redirects, structured data and AI-crawler access. '
                   'Category scores are an assessment against that method, not a Google metric. Search Console, rankings and backlink data were not available for this audit; '
                   'lab performance figures vary by about ±5 between runs. Subsidy figures in the rewritten guides are sourced from MNRE, the PM Surya Ghar portal and DHBVN Sales Circular D-20/2024.'))
    story.append(P('Supporting documents: suntrik.com-audit/FINAL-REPORT.md, ACTION-PLAN.md and audit-data.json in the website repository.', 'small'))

    doc = BaseDocTemplate(OUT, pagesize=A4, leftMargin=M, rightMargin=M, topMargin=16 * mm, bottomMargin=18 * mm,
                          title='suntrik.com — SEO Audit & Results (Board report)', author='Suntrik Green Energy Pvt. Ltd.',
                          subject='SEO audit, scores and changes — 26 September 2026')
    frame = Frame(M, 18 * mm, W - 2 * M, H - 34 * mm, id='f', leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id='cover', frames=[frame], onPage=on_cover),
                          PageTemplate(id='body', frames=[frame], onPage=on_page)])
    doc.build(story)
    print('wrote', OUT)

if __name__ == '__main__':
    build()
