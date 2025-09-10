[M324] Aufgabe 4 - Semantic Versioning und Github Actions
Fällig am 9. September 2025 23:59
Anweisungen
Vorarbeiten
Erstellt ein Repository in welchem ihr ein kleines VueJS Projekt erstellt (https:l/vuejs:ug/guide/nuick-start).
Wählt beim erstellen des Projektes aus, dass es für euch Vitest E2E Test und ESLint installiert/konfiguriert werden:
• Select features to include in your project: (1/4 to navigate, space tc
a TypeScript
o JSX Support
a Router (SPA development)
Pini 6 (State management)
Vitest (unit testtng)
End-to-End Testing
• ESLint (error prevention)
n Prettier (code formgtting)
Dies gibt euch Tasks, welche ihr in der Pipeline ausführen könnt.
Aufgaben
Teil 1: Tags mit Semantic Versioning
Erstellt einen .git-hook welcher das Repository Tagged mittels Semantic Versioning.
Dazu erstellt ihr ein Script (Sprache könnte ihr Wählen), welches ihr dann im .post-commit hook ausführt. Das Script soll den
jetzigen Tag prüfen und entsprechend der commit message einen neuen Tag erstellen nach den Regeln des Semantic
Versioning und Conventional Commits:
Teil 2: Tags mittels Github Actions
Nutzt das Script welches ihr in Teil 1 erstellt habt und wendet dies als Github Workflow an
Tipps:
https:l/docs.github.com/de/actions/tutorials/create-an-example-workflow
Teil 3: Erst die Tests und Build ausführen dann Taggen
Natürlich sollten Tags nur gemacht werden, wenn das Projekt auch einen Build macht. Und einen Build machen wir nur wenn
die Tests Grün sind.
Erstellt zwei andere workflows welche jeweils den Build und die Unit Tests laufen lassen (die Tasks finden sich im
package.json vom erstellten Projekt).
Der Tag Workflow soll nur gestartet werden wenn der Build und der Test Workflow erfolgreich waren.
https://docs.github.com/de/actions/tutorials/build-and-test-code/nodejs