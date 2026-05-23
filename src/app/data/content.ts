import {
  ComparisonItem,
  Feature,
  NavigationItem,
  ProcessStep,
  Topic,
  TopicId
} from '../core/models';

export interface HomeContent {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
  };
  intro: {
    eyebrow: string;
    title: string;
    text: string;
  };
  topics: Feature[];
  process: ProcessStep[];
  cta: {
    title: string;
    text: string;
    primaryCta: string;
    secondaryCta: string;
  };
}

export const navigationItems: NavigationItem[] = [
  { label: 'Home', route: '/', exact: true },
  { label: 'Vibe Coding', route: '/vibe-coding' },
  { label: 'KI-Agenten', route: '/ki-agenten' },
  { label: 'Fine-Tuning', route: '/fine-tuning' },
  { label: 'KI Workspace', route: '/ki-workspace' },
  { label: 'Kontakt', route: '/kontakt' }
];

export const homeContent: HomeContent = {
  hero: {
    headline: 'Baue schneller mit KI. Von der Idee zum intelligenten System.',
    subheadline:
      'Vibe Coding, KI-Agenten und Fine-Tuning - drei Bausteine für moderne AI-native Produkte.',
    primaryCta: 'Themen entdecken',
    secondaryCta: 'Projekt starten'
  },
  intro: {
    eyebrow: 'AI-native Produktentwicklung',
    title: 'Drei Hebel für Teams, die schneller lernen und besser bauen wollen.',
    text:
      'Wir verbinden schnelle Prototypen, autonome Workflows und spezialisierte Modelle zu Frontends, Tools und Produktideen, die später sauber mit Backend-Systemen wachsen können.'
  },
  topics: [
    {
      title: 'Vibe Coding',
      description:
        'Vom Prompt zur produktnahen Oberfläche: Ideen werden schnell sichtbar, iterierbar und überprüfbar.',
      icon: 'VC',
      route: '/vibe-coding',
      tags: ['Prototyping', 'Produktdesign', 'Code Review']
    },
    {
      title: 'KI-Agenten',
      description:
        'Agenten planen Aufgaben, nutzen Tools, prüfen Ergebnisse und automatisieren wiederkehrende Arbeitsschritte.',
      icon: 'AG',
      route: '/ki-agenten',
      tags: ['Automation', 'Tool Use', 'Workflows']
    },
    {
      title: 'Fine-Tuning',
      description:
        'Eigene Daten schärfen Verhalten, Tonalität und Spezialisierung von Modellen für konkrete Geschäftsprozesse.',
      icon: 'FT',
      route: '/fine-tuning',
      tags: ['Daten', 'Modelle', 'Evaluation']
    }
  ],
  process: [
    {
      label: '01',
      title: 'Idee',
      description: 'Zielbild, Nutzerproblem und geschäftlicher Kontext werden präzise formuliert.',
      status: 'Discover'
    },
    {
      label: '02',
      title: 'Prompt',
      description: 'Prompts übersetzen die Idee in erste Flows, Screens und technische Hypothesen.',
      status: 'Shape'
    },
    {
      label: '03',
      title: 'Agent',
      description: 'Agenten übernehmen Recherche, Planung, Tool-Nutzung und Qualitätsschleifen.',
      status: 'Automate'
    },
    {
      label: '04',
      title: 'Modell',
      description: 'Prompting, RAG oder Fine-Tuning werden nach Datenlage und Zielverhalten gewählt.',
      status: 'Specialize'
    },
    {
      label: '05',
      title: 'Produkt',
      description: 'Aus dem Prototyp wird ein skalierbares Frontend mit klarer Backend-Schnittstelle.',
      status: 'Launch'
    }
  ],
  cta: {
    title: 'Bereit für ein AI-natives Produkt?',
    text:
      'Starte mit einem klaren Scope: schneller MVP, Agent-Workflow oder Modellstrategie für dein Team.',
    primaryCta: 'Projekt starten',
    secondaryCta: 'Fine-Tuning verstehen'
  }
};

export const topicContent: Record<TopicId, Topic> = {
  'vibe-coding': {
    id: 'vibe-coding',
    route: '/vibe-coding',
    eyebrow: 'Vibe Coding',
    title: 'Schneller von Idee zu Code, ohne die Kontrolle abzugeben.',
    summary:
      'Vibe Coding nutzt KI als produktiven Sparringspartner: Prompts erzeugen erste Strukturen, Menschen entscheiden über Architektur, Qualität und Richtung.',
    paragraphs: [
      'Vibe Coding beschleunigt die Phase zwischen Problemverständnis und lauffähigem Prototyp. Teams können Interface-Ideen, Datenflüsse und Produktlogik früher sehen, testen und verbessern.',
      'Der Vorteil liegt nicht darin, blind Code generieren zu lassen. Gute Ergebnisse entstehen durch klare Prompts, kurze Feedbackschleifen, Review-Kompetenz und bewusste technische Entscheidungen.',
      'Für Unternehmen, Gründer, Creator und Entwickler wird damit aus einer groben Idee schneller ein prüfbares Produkt, ohne Wartbarkeit, Sicherheit oder Nutzerqualität aus dem Blick zu verlieren.'
    ],
    features: [
      {
        title: 'Prompt Driven Development',
        description:
          'Prompts beschreiben Ziel, Kontext, Constraints und Qualitätsmaßstab, bevor Code entsteht.',
        icon: 'PD'
      },
      {
        title: 'Schnelle MVPs',
        description:
          'Prototypen werden in kurzen Zyklen gebaut, getestet und für echte Nutzerfragen geschärft.',
        icon: 'MV'
      },
      {
        title: 'Iteratives Bauen',
        description:
          'Feedback fließt direkt in UI, Datenmodell, States und technische Struktur zurück.',
        icon: 'IT'
      },
      {
        title: 'Code Review mit KI',
        description:
          'KI hilft beim Finden von Brüchen, fehlenden Zuständen und Architektur-Risiken.',
        icon: 'CR'
      },
      {
        title: 'Menschliche Kontrolle',
        description:
          'Entscheidungen zu Produkt, Sicherheit, UX und Wartbarkeit bleiben bewusst beim Team.',
        icon: 'HC'
      }
    ],
    highlights: [
      'Ideal für validierbare MVPs und interne Tools',
      'Stark bei UI-Flows, Struktur und Iteration',
      'Braucht klare Reviews statt blindes Copy-Paste'
    ],
    ctaLabel: 'Vibe-Coding-Projekt starten'
  },
  'ai-agents': {
    id: 'ai-agents',
    route: '/ki-agenten',
    eyebrow: 'KI-Agenten',
    title: 'Agenten, die planen, Tools nutzen und Ergebnisse prüfen.',
    summary:
      'KI-Agenten verbinden Sprachmodelle mit Aufgabenplanung, Tool-Nutzung, Memory und Kontrollschritten. So entstehen Workflows, die über einzelne Prompts hinausgehen.',
    paragraphs: [
      'Ein KI-Agent nimmt ein Ziel entgegen, zerlegt es in Schritte und entscheidet, welche Werkzeuge oder Datenquellen benötigt werden. Das kann Recherche, Code, Support, Analyse oder Prozessautomation sein.',
      'Gute Agenten sind nicht einfach Chatbots. Sie haben klare Grenzen, überprüfbare Zwischenstände, definierte Tools und Mechanismen zur Ergebnisprüfung.',
      'Für Teams entsteht dadurch ein skalierbarer Weg, wiederkehrende Wissensarbeit zu automatisieren, ohne komplexe Backend-Integrationen schon am ersten Tag vollständig bauen zu müssen.'
    ],
    features: [
      {
        title: 'Research Agent',
        description:
          'Sammelt, verdichtet und strukturiert Informationen für Entscheidungen und Briefings.',
        icon: 'RA'
      },
      {
        title: 'Coding Agent',
        description:
          'Analysiert Code, schlägt Änderungen vor und arbeitet entlang klarer Review-Regeln.',
        icon: 'CA'
      },
      {
        title: 'Support Agent',
        description:
          'Beantwortet Anfragen mit Kontext, Wissensbasis und Eskalation an Menschen.',
        icon: 'SA'
      },
      {
        title: 'Automation Agent',
        description:
          'Verbindet Tools und führt wiederkehrende operative Abläufe kontrolliert aus.',
        icon: 'AA'
      },
      {
        title: 'Data Agent',
        description:
          'Bereitet Daten auf, erkennt Muster und liefert nachvollziehbare Analyseergebnisse.',
        icon: 'DA'
      }
    ],
    highlights: [
      'Planung und Tool-Nutzung statt einzelner Antworten',
      'Prüfschritte reduzieren operative Risiken',
      'Backend-ready durch klare Service- und API-Grenzen'
    ],
    ctaLabel: 'Agent-Workflow besprechen'
  },
  'fine-tuning': {
    id: 'fine-tuning',
    route: '/fine-tuning',
    eyebrow: 'Fine-Tuning',
    title: 'Spezialisierte Modelle für wiederholbare Qualität.',
    summary:
      'Fine-Tuning passt ein Modell an Beispiele, Tonalität, Formate und Spezialfälle an. Es ist stark, wenn Verhalten stabil reproduzierbar werden soll.',
    paragraphs: [
      'Fine-Tuning ist sinnvoll, wenn Prompts zu lang werden, Ausgaben sehr konsistent sein müssen oder ein Modell wiederholt domänenspezifische Muster lernen soll.',
      'Nicht jedes Problem braucht Fine-Tuning. Für aktuelles Wissen ist RAG oft besser, für flexible Aufgaben reicht häufig gutes Prompting. Die richtige Wahl hängt von Daten, Risiko und Zielverhalten ab.',
      'Mit sauberen Daten, Evaluation und klaren Qualitätsmetriken kann Fine-Tuning Support, Klassifikation, Textgenerierung und interne Produktivität deutlich robuster machen.'
    ],
    features: [
      {
        title: 'Datenstrategie',
        description:
          'Geeignete Beispiele, Labels und Grenzfälle werden strukturiert gesammelt und bewertet.',
        icon: 'DS'
      },
      {
        title: 'Cleaning',
        description:
          'Daten werden bereinigt, vereinheitlicht und von widersprüchlichen Mustern getrennt.',
        icon: 'CL'
      },
      {
        title: 'Training',
        description:
          'Das Modell lernt gewünschte Formate, Stil, Entscheidungen und Spezialfälle.',
        icon: 'TR'
      },
      {
        title: 'Evaluation',
        description:
          'Tests prüfen Qualität, Robustheit und Abweichungen gegenüber Baseline-Verhalten.',
        icon: 'EV'
      },
      {
        title: 'Custom Model',
        description:
          'Das spezialisierte Modell wird über klare APIs in Produkte und Workflows integriert.',
        icon: 'CM'
      }
    ],
    highlights: [
      'Stark für konsistente Formate und Spezialverhalten',
      'RAG bleibt besser für häufig wechselndes Wissen',
      'Evaluation entscheidet über produktionsreife Qualität'
    ],
    ctaLabel: 'Modellstrategie klären'
  }
};

export const fineTuningComparison: ComparisonItem[] = [
  {
    title: 'Prompting',
    badge: 'Schnellster Start',
    description:
      'Instruktionen, Beispiele und Kontext werden direkt im Prompt formuliert. Ideal für flexible Aufgaben und frühe Validierung.',
    strengths: ['Keine Trainingsdaten nötig', 'Schnell anpassbar', 'Geringe Einstiegshürde'],
    idealFor: 'Prototypen, variable Aufgaben, erste Produktvalidierung',
    accent: 'blue'
  },
  {
    title: 'RAG',
    badge: 'Aktuelles Wissen',
    description:
      'Das Modell bekommt relevante Dokumente oder Daten zur Laufzeit. Wissen bleibt aktualisierbar, ohne das Modell neu zu trainieren.',
    strengths: ['Gut für Wissensbasen', 'Quellen können geprüft werden', 'Daten bleiben austauschbar'],
    idealFor: 'Support, interne Suche, dokumentenbasierte Antworten',
    accent: 'cyan'
  },
  {
    title: 'Fine-Tuning',
    badge: 'Spezialisiertes Verhalten',
    description:
      'Das Modell wird mit Beispielen auf Stil, Formate und wiederkehrende Entscheidungen optimiert.',
    strengths: ['Konstante Ausgabeformate', 'Kürzere Prompts', 'Domänenspezifische Muster'],
    idealFor: 'Klassifikation, Tonalität, strukturierte Ausgaben, wiederholbare Qualität',
    accent: 'violet'
  }
];

export const contactTopics = [
  'Vibe Coding Projekt',
  'KI-Agent Workflow',
  'Fine-Tuning Strategie',
  'AI-native Produktberatung',
  'Technische Umsetzung'
];
