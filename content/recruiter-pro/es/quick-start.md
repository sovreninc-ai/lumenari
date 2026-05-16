# Inicio rápido — setup en 60 segundos

Tres párrafos, uno por plataforma. Elige el tuyo, pega, prueba.

---

## Claude (claude.ai o Claude en la API)

Crea un nuevo Project. Llámalo "Recruiter Co-Pilot". En el campo **Instructions** del Project, pega todo el contenido de `optimization-pack.md`. Guarda. Cada chat en ese Project ahora corre en modo recruiter — JD writer, outreach drafter, interview-kit builder, generador de Boolean string. Para uso puntual, pega el optimization pack como primer mensaje en un chat nuevo. Bono: suelta tus JDs existentes de mejor desempeño y el outreach con más respuestas en la knowledge base del Project — la IA va a referenciar la voz real y la marca de tu equipo al redactar nuevos.

**Pruébalo:** Inicia un chat nuevo en el Project y pega el prompt de prueba de abajo.

---

## ChatGPT (Custom GPT o chat puntual)

Para un Custom GPT (Plus o Team): ve a "My GPTs" → "Create a GPT" → "Configure". En el campo **Instructions**, pega `custom-gpt-instructions.md`. Llámalo "Recruiter Co-Pilot". Descripción: "JDs sin la jerga, outreach que se gana respuestas, kits de entrevista, Boolean strings". Guarda. Para uso puntual, pega `optimization-pack.md` como primer mensaje en cualquier thread estándar.

**Pruébalo:** Abre tu nuevo GPT y pega el prompt de prueba de abajo.

---

## Gemini, Cursor, Codex (o cualquier otra IA)

Para **Gemini Advanced**, crea un nuevo Gem. Pega el optimization pack en el campo de instrucciones del Gem, guarda y usa ese Gem para trabajo de recruiting. Para **Cursor**, este kit es menos aplicable (Cursor es para código), pero si escribes JDs como MDX en un repo de careers-page, pega el optimization pack en `.cursorrules`. Para **Codex / GitHub Copilot Chat / cualquier otra IA**, pega el optimization pack como primer mensaje en una conversación nueva y vuelve a pegarlo al inicio de cualquier thread nuevo.

**Pruébalo:** Usa el prompt de prueba de abajo para confirmar el setup.

---

## Prompt de prueba para pegar

```
Estoy contratando a un Senior Full-Stack Engineer en un SaaS Serie B de 30 personas. Remote-first, US + Canada. Stack: TypeScript, React, Node, Postgres en AWS. Banda salarial: USD $170-210K base + 0.05-0.15% equity. El hiring manager escribió una JD y creo que es mala. Esto es lo que mandó:

"We're looking for a passionate rock star full-stack engineer to join our fast-paced, dynamic team. You'll be a 10x developer who thrives in ambiguity and isn't afraid to wear many hats. Must have a Bachelor's degree in Computer Science and 10+ years of experience. We work hard and play hard, and we're like a family here. Competitive salary and benefits."

Necesito:
1. Un bias lint de lo que mandaron (frases específicas marcadas y por qué)
2. Una JD completa reescrita usando el formato del kit
3. Una plantilla de outreach para cold-DMing a senior engineers (3 líneas máximo en el opener)
4. Un Boolean string de LinkedIn Recruiter para senior engineers con TypeScript + React + Node que hayan publicado en startups
```

Deberías recibir: una pasada de lint que marca "passionate", "rock star", "fast-paced", "10x developer", "wear many hats", "Bachelor's degree required", "10+ years", "work hard play hard" y "like a family" — con fixes específicos para cada uno. Después una JD limpia de ~500 palabras con banda salarial, outcomes reales de "lo que harás", un proceso de entrevista real, y una sección de arreglo de trabajo. Después un outreach de tres líneas que nombre una razón que se sienta real para el mensaje. Después un Boolean string con las cláusulas explicadas, más 2 variantes si la primera trae muy pocos o demasiados resultados.

Si recibes una JD con "rock star" aún adentro, u outreach sin mención de la banda de comp, el optimization pack no está cargado. Vuelve a pegarlo.
