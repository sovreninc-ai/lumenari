# Inicio rápido — setup en 60 segundos

Tres párrafos, uno por plataforma. Elige el tuyo, pega, prueba.

---

## Claude (claude.ai o Claude en la API)

Crea un nuevo Project en Claude. Llámalo "SEO Content Strategist". En el campo **Instructions** del Project, pega todo el contenido de `optimization-pack.md`. Guarda. Cada chat en ese Project ahora corre como un SEO strategist senior — outliner, article writer, generador de meta + schema, advisor de refresh. Para uso puntual, pega el optimization pack como primer mensaje en un chat nuevo. Bono: suelta tus artículos existentes de mejor desempeño a la knowledge base del Project; la IA va a referenciar tu estructura de URL real y tu tono al sugerir internal links.

**Pruébalo:** Inicia un chat nuevo en el Project y pega el prompt de prueba de abajo.

---

## ChatGPT (Custom GPT o chat puntual)

Para un Custom GPT (Plus o Team): ve a "My GPTs" → "Create a GPT" → "Configure". En el campo **Instructions**, pega `custom-gpt-instructions.md`. Llámalo "SEO Content Strategist". Descripción: "Outlines, longform, meta, schema y playbook de refresh — calidad de strategist, no de freelancer". Habilita web browsing si quieres que lea SERPs en vivo (si no, pega el top 10 manualmente). Guarda y chatea. Para uso puntual, pega `optimization-pack.md` como primer mensaje en cualquier thread estándar.

**Pruébalo:** Abre tu nuevo GPT y pega el prompt de prueba de abajo.

---

## Gemini, Cursor, Codex (o cualquier otra IA)

Para **Gemini Advanced**, crea un nuevo Gem. Pega el optimization pack en el campo de instrucciones del Gem, guarda y usa ese Gem para trabajo de SEO. El acceso web en vivo de Gemini es útil aquí — déjalo extraer SERPs actuales cuando preguntes. Para **Cursor**, pega el optimization pack en `.cursorrules` si quieres ayuda de SEO dentro de tu editor de código para contenido de sitio estático (MDX, hugo, etc.). Para **Codex / GitHub Copilot Chat / cualquier otra IA**, pega el optimization pack como primer mensaje en una conversación nueva y vuelve a pegarlo al inicio de cualquier thread nuevo.

**Pruébalo:** Usa el prompt de abajo para confirmar el setup.

---

## Prompt de prueba para pegar

```
Llevo un blog de comparación de SaaS. Tráfico de seis cifras intermedias mensuales, DA ~52.

Keyword primaria: "best CRM for solopreneurs"
Volumen estimado: ~1,900/mes
Los top 3 del SERP son:
1. Blog de Zapier (listicle commercial, 4,200 palabras, 12 herramientas reviewadas)
2. Blog de HubSpot (informational + suave-promocional, 2,800 palabras)
3. Review personal de un escritor de Substack (1,400 palabras, 5 herramientas probadas en 90 días, POV muy fuerte)

Quiero superar al #3 específicamente — el ángulo de personal review es el gap.

Dame:
1. Clasificación de intención + lectura del SERP
2. Outline completo con H1, H2s, sugerencias de internal link
3. Meta title + meta description
4. Recomendación de schema
5. Un párrafo sobre el ángulo E-E-A-T: ¿quién debería poner el byline, qué inyección de experiencia necesito?

Usa placeholders si los necesitas.
```

Deberías recibir: intención clasificada como commercial (con una nota de que el ángulo de personal-review del #3 es el diferenciador), un outline apretado (probablemente 7-9 H2s, con openers de sección listos para featured-snippet), 3-5 sugerencias de internal-link nombradas, meta dentro de spec, Article + FAQPage schema recomendado, y una nota franca de que esto solo funciona si TÚ realmente probaste CRMs por 90 días — si no, el kit va a sugerir contratar a un escritor que sí lo haya hecho, o partnering con alguien que tenga recibos.

Si recibes un outline genérico de listicle sin clasificación de intención y sin lectura de SERP, el optimization pack no está cargado. Vuelve a pegarlo.
