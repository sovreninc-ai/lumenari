# Memory — E-commerce / Shopify Owner Pack

## Domain context

एक Shopify store owner एक tab में से पूरा business चलाता है: product, photography, copy, ads, email, customer service, fulfillment, और reporting। उनमें से ज़्यादातर solo या 2-3 लोग हैं, एक महीने में $10k से $500k के बीच revenue के साथ। काम highly repetitive है — हर SKU को एक product description, Meta/Google/TikTok across एक ad set, एक Klaviyo welcome series tag, और एक review response policy चाहिए। Pain strategy नहीं है। यह volume है।

Owner usually अच्छे product instincts और कमज़ोर copy instincts रखता है। वे जानते हैं उनके best customer brand के बारे में क्या कहते हैं और उनके margins क्या हैं, पर ad headlines, subject lines, और product descriptions consistently उससे underperform होते हैं जो वे possible सोचते हैं। उन्होंने एक बार एक agency try की और वह generic DTC voice produce हुआ जो जो उन्होंने built किया उससे match नहीं हुआ। उन्होंने एक copy subscription ($300/mo) try की और smaller scale पर same problem मिली। वे एक tool चाहते हैं जो उनकी voice respect करे, उनकी platform की character limits में fit करे, और minutes में ship करे — एक 3-week creative brief नहीं।

Day-to-day fragmented है: Friday के launch से पहले तीन new products publish करने को 4pm push, abandoned-cart sequence लिखने को 9pm hour, हफ्ते के reviews respond करने को Sunday 30-minute slot। Speed matters। So does honesty — readers एक $24 product पर generic luxury language को smell कर सकते हैं, और यह conversion cost करता है।

## Vocabulary जो AI को पता होना चाहिए

- **SKU:** stock-keeping unit — एक product का एक unique variant (size, color, scent)। एक product = कई SKUs।
- **AOV:** average order value — total revenue / total orders। वह number जिसके against owner सब run करता है।
- **CAC:** customer acquisition cost — total ad spend / new customers। बताता है क्या ads pay back करते हैं।
- **LTV:** customer lifetime value — एक customer per उनके relationship over total revenue। CAC पर ceiling set करता है।
- **ROAS:** return on ad spend — revenue / ad spend। Platform इसे report करता है; real profitability से differ करता है।
- **MER:** marketing efficiency ratio — total revenue / total marketing spend। ROAS का honest version।
- **PDP:** product detail page — जहाँ product description रहती है। Above-the-fold सबसे matters।
- **PLP:** product listing / collection page — जहाँ browsing के लिए SKUs listed हैं।
- **CRO:** conversion rate optimization — conversion lift करने को funnel tweak करने की practice।
- **Klaviyo:** dominant DTC email platform। Flows = automated sequences; campaigns = one-off sends।
- **Mailchimp:** legacy email platform; अभी भी smaller stores द्वारा used।
- **Meta Ads Manager:** Facebook + Instagram ad UI।
- **Google Shopping:** Google search और surfaces पर product-feed-driven ads।
- **TikTok Spark Ads:** organic posts एक creator के handle से ads के रूप में boosted।
- **GMC:** Google Merchant Center — Shopping ads को power देने वाला feed।
- **MOQ:** minimum order quantity — सबसे smallest order जो एक supplier accept करेगा।
- **DTC:** direct-to-consumer। Kit के audience के लिए dominant business model।
- **B2B:** wholesale / retail accounts — end consumers के बजाय अन्य stores को selling।
- **Above-the-fold:** content user के scroll करने से पहले visible। एक PDP पर सबसे highest-conversion real estate और एक ad के most important characters।

## Common workflows

- **New product launch:** owner product name, category, materials, brand context, target price paste करता है → AI 1-3 angle variants में PDP description produce करता है → Meta + Google + TikTok across ad set → 2-email launch campaign।

- **Weekly review response batch:** owner हफ्ते के reviews Judge.me / Yotpo / Loox से export करता है → star ratings के साथ 5-15 reviews paste करता है → AI rating + tone द्वारा response variants produce करता है → owner edit और submit करता है।

- **Abandoned cart fix:** owner अपना current abandoned-cart copy + Klaviyo flow analytics paste करता है → AI underperforming send (आमतौर पर email 2 — वह जो न immediate है न एक discount) fix करने को sequence rewrite करता है।

- **Supplier outreach:** owner एक potential supplier identify करता है (Alibaba, Faire, एक trade show contact) → product context + अपना projected volume paste करता है → AI appropriate MOQ negotiation framing के साथ एक first-contact email produce करता है।

- **24 hours में Seasonal campaign:** Diwali / Holi / एक flash promo → owner offer + product range देता है → AI full set produce करता है (PDP hero updates, platforms across ad copy, 3-email campaign, SMS short copy)।

## क्या avoid करें / common mistakes

- **Generic DTC voice।** "Transform your routine," "Elevate your wardrobe," "Curated for the modern [audience]।" यह default failure mode है। Banned-word enforcement इस kit में highest-leverage rule है।
- **Mid-range products पर luxury language।** एक $24 candle "artisanal hand-poured craftsmanship" नहीं है। Register को price point से match करें। Pretending trust breaks करता है।
- **Character limits ignore करना।** 125 characters past Meta primary text above the fold cut off हो जाता है। 30 characters past Google headlines rejected होते हैं। 100 characters past TikTok captions engagement खोते हैं। AI को count करना है।
- **जो claims यह नहीं बना सकता।** "Reduces wrinkles by 47%" बिना एक clinical study, एक food product पर "boosts immunity," बिना citation के "clinically proven" — ये India में Drugs and Magic Remedies Act / ASCI exposure हैं।
- **Fake urgency।** "Only 3 left!" जब stock में 400 हों। "Sale ends in 24 hours!" एक evergreen discount पर। Customers इसे track करते हैं और trust उस lift से faster erode होता है जो यह produce करती है।
- **हर product को five-adjective stacks से stuffing।** "Premium, luxurious, curated, elevated, indulgent।" एक descriptor pick करें और इसे earn करें।
- **ऐसे लिखना जैसे platform user हो।** Product descriptions mobile पर पढ़ी जाती हैं, एक thumb tap के बाद half a second। Scroll के लिए लिखें।

## Tone / register

एक real Shopify operator एक voice में लिखता है जो उनके brand और audience के specific है। एक premium home goods brand slower, more confident, fewer words sound करता है। एक supplements brand direct और benefit-led sound करता है। एक streetwear brand tighter, edgier, almost terse sound करता है। उनमें क्या share है: concrete language ("merino, 18.5 micron, 230 gsm"), buyer-aware framing (वे जानते हैं buyer दो अन्य tabs से compare कर रहा है), और जो वे include नहीं करते उसके लिए कोई apology नहीं। Best DTC copy अपने scope के बारे में confident है — "यह क्या है, यह क्या नहीं है, यहाँ price है, यहाँ खरीदने का way है।" AI को इस confidence को match करना चाहिए और उस generic "passion / curation / transformation" register से avoid करना चाहिए जो हर brand को same brand में flatten करता है।
