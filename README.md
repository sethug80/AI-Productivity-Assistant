# EasyWork — AI Workplace Productivity Assistant

An AI-powered workplace productivity platform that helps professionals automate everyday
work tasks. Built as **one integrated dashboard** with five AI tools, not separate apps.

## Project Overview

Knowledge workers lose hours each week to repetitive writing and organising: drafting
emails, summarising meetings, planning the week, and researching topics. EasyWork puts
those tasks behind structured AI inputs so the user gets a high-quality first draft in
seconds, then edits it themselves before use.

## Features

| Feature | What it does |
| --- | --- |
| **Smart Email Generator** | Professional emails from recipient, purpose, key points; supports formal / friendly / persuasive / apologetic tones and short–detailed lengths. |
| **Meeting Notes Summarizer** | Turns raw notes or transcripts into a summary with decisions, action items (owner + deadline), risks and open questions. |
| **AI Task Planner** | Builds a prioritised daily or weekly schedule from a task dump, respecting working hours and deadlines. |
| **AI Research Assistant** | Structured briefings on a topic: key points, insights, recommendations and confidence levels. |
| **AI Chatbot** | Conversational workplace assistant with full thread memory and quick-start prompts. |

All outputs are rendered as formatted markdown and are **fully editable** in-app, with
copy and regenerate actions.

## Responsible AI

A responsible-AI disclaimer is shown on the dashboard and in compact form inside every
tool. It covers:

- **Limitations** — the model predicts likely text, can invent details, and has no live
  access to your systems, calendar or the internet.
- **Bias** — training data carries cultural, gender and language bias; tone and wording
  should be reviewed for fairness.
- **Validation steps** — verify facts, figures, dates and names; edit before sending;
  never paste confidential or personal data into prompts; keep a human decision-maker
  for anything with real-world consequences.

## Prompt Engineering

Each tool uses a dedicated **system prompt** (role, output format, constraints) plus a
**structured user prompt** assembled from the form fields, so the model always receives
labelled context instead of a vague request. Example (Meeting Notes):

- System: acts as a chief-of-staff, must output fixed sections, must never invent
  attendees, decisions or dates that are not in the source notes.
- User: focus area + the raw notes, clearly delimited.

## Tools Used

- **Lovable AI** (Gateway) — AI generation across all features
- **TanStack Start** (React 19 + server functions) — full-stack framework
- **Vite 7**, **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** — navy blue & purple SaaS design system
- **react-markdown**, **lucide-react**, **sonner**

## UI / UX

- Dashboard layout with persistent sidebar navigation (drawer on mobile)
- Fully responsive from 320px phones to wide desktops
- Navy blue base with purple accents, gradient brand marks, soft card shadows
- Clear input panel / AI output panel split on every tool

## Setup Instructions

```sh
git clone <this-repository-url>
cd <repository-name>
npm install
npm run dev
```

The app runs at `http://localhost:8080`. AI features require the `LOVABLE_API_KEY`
environment variable, which Lovable provisions automatically in the hosted environment.

```sh
npm run build   # production build
```

## Project Structure

```
src/
  components/
    AppShell.tsx        # sidebar + responsive layout
    ToolWorkbench.tsx   # shared structured-input / editable-output harness
    AiDisclaimer.tsx    # responsible AI notice
  lib/
    ai.functions.ts     # server function calling Lovable AI
    ai-gateway.server.ts
  routes/
    index.tsx           # dashboard
    email.tsx  meetings.tsx  planner.tsx  research.tsx  chat.tsx
```

## Team Members

- Add your name(s) here.
