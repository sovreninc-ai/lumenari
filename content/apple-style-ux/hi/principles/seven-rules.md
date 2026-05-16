# सात Rules — long form

## 1. हर screen पर एक primary action।

Brain को एक new screen पर देखने के लिए कुछ सौ ms लगते हैं कि क्या देखना है। अगर तीन equally-styled buttons हैं, वो तीन सौ ms wasted है। अगर एक obviously-primary button और एक obviously-secondary है, user ने zero ms में decide कर लिया।

**Visual rule:** हर screen पर केवल एक filled button। बाकी सब text-link, outline, या icon है।

**Anti-example:** एक "are you sure?" dialog का bottom तीन filled red buttons के साथ। एक pick करें।

## 2. Plain English जीतता है।

Apple की copy ऐसे read होती है जैसे एक friend आपको बता रहा है कि क्या होने वाला है।

| Corporate copy | Apple-style copy |
|---|---|
| Initialize backup process | Back up now |
| Configure notification preferences | Choose what to notify me about |
| Authentication required | Sign in to continue |
| An error has occurred (Error 0x9F) | Couldn't save. Check your connection and try again. |

अगर आप इसे अपनी kitchen में एक friend को नहीं कहेंगे, तो screen पर मत डालें।

## 3. "बस कर दो" default करें।

जब 90% users एक ही outcome चाहते हैं, पूछना friction है। Examples:

- **Bad:** "Do you want to enable autosave?" (yes, obviously)
- **Good:** Automatically save। Chrome में "All changes saved" दिखाएँ।

- **Bad:** "Would you like to receive email confirmations?" (yes, obviously)
- **Good:** Confirmation भेजें। एक Unsubscribe link include करें।

- **Bad:** First launch पर "Allow notifications?"
- **Good:** Wait करें जब तक user कुछ ऐसा करने वाला न हो जहाँ एक notification genuinely useful है, फिर context में पूछें।

Exception irreversible या expensive actions हैं — वो एक confirmation deserve करते हैं।

## 4. Whitespace एक feature है।

ज़्यादातर designs 20-30% बहुत cramped होते हैं। हर padding को 1.25x और हर gap को 1.5x बढ़ाने की try करें। यह almost हमेशा बेहतर feel होता है।

**Rule of thumb:** अगर दो adjacent visual elements एक-दूसरे से belong करते हुए feel हों जब उन्हें नहीं करना चाहिए, gap बढ़ाएँ। अगर वे separate feel हों जब उन्हें नहीं करना चाहिए, decrease करें। तब तक adjust करें जब तक relationship unambiguous न हो।

## 5. Size + weight के through Hierarchy, color + boxes नहीं।

एक page में हो सकते हैं:
- एक H1 (32-48px, semibold)
- कुछ H2s (22-28px, semibold)
- Body text (16-17px, regular)
- कुछ captions (13-14px, regular, muted)

यह almost किसी भी screen के लिए काफी hierarchy है। Colored badges, drop shadows, और boxes-around-things add करना आमतौर पर एक sign है कि type scale अपनी job नहीं कर रही।

## 6. Progressive disclosure।

पहली बार जब एक user एक feature देखे, 20% दिखाएँ जिसे वे 80% समय use करेंगे। बाकी इनके पीछे tuck करें:

- एक "More options" toggle
- एक second screen
- एक right-side detail pane
- Long-press / right-click

**Anti-example:** एक settings screen 40 toggles के साथ flat list में। पहले 6 obvious होने चाहिए; अगले 34 एक "Advanced" section में होने चाहिए जो tap पर open हो।

## 7. Animation का कारण है या वो exist नहीं करता।

Apple के animations तीन में से एक job करते हैं:
1. **Spatial continuity maintain करना** — जब कुछ appear हो, वहाँ से animate करें जहाँ से वह आया (एक modal screen के bottom से slide up होता है, एक detail view right से slide in होता है)।
2. **State change communicate करना** — एक checkmark जो save succeed होने के बाद draw होता है।
3. **Waiting mask करना** — एक freshly-loaded card पर 200ms fade-in एक hard pop से बेहतर है।

बस। Hover पर bounce, parallax for parallax's sake, click पर glow — ये सब "हम modern दिखना चाहते थे" के रूप में read होते हैं, "हम useful होना चाहते थे" के बजाय।

**Timing rules:**
- 150-250ms: ज़्यादातर micro-interactions
- 300-400ms: page transitions
- > 500ms: rare और intentional

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) "उन चीज़ों के लिए जो snappy और natural feel करनी चाहिए" — Apple कुछ similar use करता है।

---

## इन्हें कैसे apply करें

एक screen लें जो आपने ship की है। Rules को order में पढ़ें। हर rule के लिए पूछें: "यह screen इसे कहाँ violate कर रही है?" एक बार में सब कुछ fix करने की कोशिश न करें — वो fix करें जो most violated है।

वही trick आपके AI के design output के लिए काम करती है। इस file को system prompt में paste करें और पूछें: "Review this screen against the seven rules. Tell me which one is most violated."
