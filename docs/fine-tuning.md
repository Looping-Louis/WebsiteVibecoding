# Fine-Tuning und RAG

Fine-Tuning und RAG loesen unterschiedliche Probleme.

## Wann Fine-Tuning sinnvoll ist

Fine-Tuning ist geeignet fuer Verhalten, Stil und feste Antwortmuster. Beispiele:

- gleichbleibender Tonfall
- wiederkehrende Klassifikationen
- feste Formatvorgaben
- sehr spezifische Antwortschemata

Fine-Tuning ist nicht die beste Wahl, um staendig aktualisiertes Firmenwissen oder viele Dokumente bereitzustellen.

## Wann RAG sinnvoll ist

RAG ist fuer eigenes Wissen und Dokumente besser geeignet. Dokumente werden in einem Vector Store abgelegt und bei einer Nutzerfrage ueber File Search durchsucht. Dadurch kann die KI aktuelles Projekt-, Produkt- oder Prozesswissen nutzen, ohne dass ein Modell neu trainiert werden muss.

## Trainingsdaten

Fine-Tuning-Daten sollten bewusst als JSONL vorbereitet werden. Jede Zeile ist ein eigenes Trainingsbeispiel. Die Beispiele sollten konsistent, geprueft und frei von Secrets sein.

Beispielstruktur:

```jsonl
{"messages":[{"role":"system","content":"Du antwortest kurz und klar."},{"role":"user","content":"..."},{"role":"assistant","content":"..."}]}
```

## Freigabe

Dieses Projekt startet kein automatisches Fine-Tuning. Ein Fine-Tuning-Job sollte nur nach manueller Pruefung der Trainingsdaten und ausdruecklicher Freigabe gestartet werden.
