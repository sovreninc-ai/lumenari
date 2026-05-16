# Progressive disclosure — पहले 20% दिखाएँ

Principle: first contact पर वो न दिखाएँ जो 80% users को नहीं चाहिए।

## Forms

14 fields वाला एक form लोगों को scare off करता है। इसे compress करने के तीन patterns:

### A. पहले Required-only

केवल truly required fields दिखाएँ। Optional के लिए नीचे एक "More details" toggle add करें।

```
Name *
Email *

▸ More details (3 optional fields)

[ Continue ]
```

### B. Multi-step per screen एक section के साथ

हर screen 2-4 fields है, single column। User exactly देख सकता है कि कितना बाकी है ("Step 2 of 4")।

14-field form को 2-fields-each के 7 screens में fake-multi-step न करें — वो worse है। Meaningfully group करें।

### C. Smart defaults

अगर 80% users same value pick करेंगे, इसे pre-fill करें। Field के helper text में mention करें।

```
Currency: CAD (your IP suggests Canada)
```

## Settings

Settings screens सबसे बड़े offender हैं। Canonical Apple-style structure:

```
Most common (≤5 items)
─────────────────────
Item A
Item B
Item C

Advanced
─────────────────────
▸ Account & privacy (8 items)
▸ Notifications (12 items)
▸ Developer (6 items)
```

User mental model से group करें, अपने internal data model से नहीं।

## Dashboards

एक dashboard को fold के ऊपर एक question answer करना चाहिए: "मेरी चीज़ कैसी चल रही है?"

बाकी सब scroll territory है। Top fold:

```
[ Big number — primary metric ]
[ One-sentence summary ]
[ A single sparkline or visual ]
```

उसके नीचे, deeper data। User केवल तभी scroll करता है जब वे चाहें।

## Detail pages

First load पर essentials दिखाएँ। Dense detail tabs या expand-on-click के पीछे hide करें।

For example, एक kit detail page पर:
- Above fold: name, tagline, price, primary CTA
- Below fold: what's inside (5 bullets, 50 नहीं)
- "Files you'll receive" — default by collapsed list जब तक user click करके expand न करे

## Progressive disclosure कब NOT use करें

- Critical info (consent, pricing, refund policy) — कभी hidden नहीं।
- Errors — हमेशा immediately visible।
- Destructive actions पर Required confirmations — कभी hidden नहीं।
- Conspicuous होने के लिए legally required कुछ भी।

## क्या दिखाना है यह कैसे choose करें

पूछें: "अगर user ने इस screen पर केवल 5 seconds बिताए, तो एक चीज़ क्या है जो उन्हें take away करनी चाहिए?"

वो fold के ऊपर जाता है, largest type में, most contrast के साथ। बाकी सब secondary है।
