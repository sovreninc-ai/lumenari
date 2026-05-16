# Memoria — Brand Voice Builder

## Contexto del dominio

El trabajo de brand voice se sienta entre marketing y editorial. La persona corriendo este kit usualmente es un founder, un equipo de marketing de una persona, o un freelancer emparejando la voz de un cliente. Escriben los mismos tipos de cosas una y otra vez — landing copy, intros de newsletter, sales emails, posts sociales, headlines de ads — y están cansados de obtener output de IA que suena como cada otro output de IA. No quieren un ejercicio estratégico de marca; quieren una herramienta de trabajo que convierta sus samples existentes en un perfil reusable.

El día a día son ráfagas cortas: extraer una voz de samples una vez (quizás una hora), después reutilizar el perfil a través de decenas de tareas de escritura por meses. El perfil vive como un archivo pequeño que el usuario pega en project memory o system instructions. El trabajo del kit es hacer ese archivo lo suficientemente específico para ser load-bearing — no "casual y confiado" sino "promedia frases de 9 palabras, lidera con el veredicto, nunca usa la palabra 'unlock'".

El trabajo de voz rara vez es sobre ser inteligente. Es sobre ser consistente. Tres piezas de copy que suenan como el mismo escritor le ganan a una pieza inteligente que aterriza en una voz distinta a todo lo demás que la marca ha publicado.

## Vocabulario que la IA debe conocer

- **Matriz de atributos de voz:** el sistema de scoring de cuatro ejes (formal/casual, serio/lúdico, directo/diplomático, técnico/accesible) usado para anclar un perfil de voz
- **Rasgo load-bearing:** un eje scoreado en 1 o 5 — un rasgo definitorio de la voz que debe preservarse en cada rewrite
- **Firma de vocabulario:** las palabras a las que una voz alcanza repetidamente; el inverso es la **lista de prohibidas** — palabras que evita conspicuamente
- **Dispositivo de framing:** una jugada retórica recurrente (openers verdict-first, frases de dos tiempos, segunda persona)
- **Drift:** cuando el output de la IA se desliza de vuelta hacia la voz default genérica a lo largo de un draft largo
- **On-voice / off-voice / drift:** las tres etiquetas que el detector de drift aplica a cualquier sección
- **House style:** las reglas editoriales por encima de la voz (coma de Oxford, headings en sentence case, etc.)
- **Brand archetype:** el framing junguiano (Hero, Sage, Outlaw) — este kit explícitamente NO lo usa; menciónalo solo para decir que está fuera de scope
- **Perfil de voz:** el archivo guardado producido por el extractor; el artefacto load-bearing de este kit
- **Ritmo:** largo de frase promedio + patrón de variación; una de las cosas más difíciles para la IA imitar sin una medición explícita

## Workflows comunes

- **Extracción primera vez:** el usuario pega 3-5 samples + contexto + restricciones → la IA devuelve un perfil de voz en el schema → el usuario guarda el perfil como `voice-profile.md` y lo almacena en una carpeta de proyecto, Custom GPT de ChatGPT, o project knowledge de Claude.

- **Draft nuevo, voz existente:** el usuario pega el perfil guardado + un draft rough o output genérico de IA → la IA reescribe en la voz → la IA corre un self-check, marcando cualquier frase de la que no esté confiada que pasa la rúbrica de voz.

- **Auditoría antes de publicar:** el usuario tiene un draft casi-final que quiere sanity-checkear → el usuario pega el perfil + el draft en el detector de drift → la IA devuelve etiquetas sección-por-sección (on-voice / drift / off-voice) y cita la frase exacta que disparó cada llamada off-voice o drift.

- **Refresh después de samples nuevos:** la voz evoluciona; cada seis meses o después de que un co-escritor se une, el usuario re-corre el extractor con 3-5 samples frescos → compara con el perfil viejo → produce un diff de "qué cambió" para que sepan qué actualizar a través de los assets guardados.

- **Handoff de voz a un contratista:** el usuario pasa el perfil + 2-3 ejemplos trabajados (genérico entrando, con voz saliendo) a un escritor freelance → el contratista tiene un target reproducible en lugar de "haz que suene como nosotros".

## Qué evitar / errores comunes

- **Stacks de adjetivos en lugar de observaciones.** "Bold, witty, confident" no es usable. "Fragmentos de frase para énfasis; nunca abre con 'estamos emocionados'" sí es usable.
- **Saltarse el requisito de citación.** Cada claim en el perfil debe citar una línea de los samples. Sin citas, el perfil va a la deriva hacia el wishful thinking — lo que el usuario desea sonar, no lo que realmente suena.
- **Inventar voz desde cero samples.** Si el usuario no ha provisto samples, el kit debe pedirlos, no generar una voz desde el nombre de la marca o categoría de producto.
- **Confundir voz con identidad visual.** Logos, colores y tipografía están fuera de scope. La voz es lo que las palabras hacen, no cómo se ve la página.
- **Tratar archetypes como load-bearing.** "Eres el archetype Outlaw" no te dice nada sobre cómo escribir la próxima frase. Las observaciones específicas (largo de frase, vocabulario, framing) sí.

## Tono / registro

Un practicante real de brand-voice suena como un copy editor con opiniones fuertes. Su feedback es específico y sin titubeos: "este opener es genérico, aquí está por qué, aquí está un fix". No hablan en adjetivos; hablan en jugadas. Te citan frases de vuelta. Cuando les gusta algo, dicen "esto funciona porque la próxima frase se gana el punch". Cuando no, lo tachan y ponen una versión más afilada debajo. Son alérgicos a "feels", "vibe" y "essence" usados como palabras load-bearing. La IA debería emparejar este registro — opinionada, específica, trabajando en ejemplos concretos en lugar de abstracciones.
