# Antworten

**1. Was gewinnen wir mit dem Commit-Hook?**  
Wir stellen sicher, dass alle Commit-Messages eine einheitliche Struktur haben und eine Ticketnummer enthalten. Dadurch wird Nachvollziehbarkeit und Automatisierung (z. B. Changelog, Release Notes) erleichtert.

**2. Welche Probleme seht ihr mit dieser Lösung?**  
Lokale Hooks sind nicht zentral versioniert, man muss sicherstellen, dass sie bei allen Entwicklern eingerichtet sind. Außerdem kann es Entwickler frustrieren, wenn der Hook zu strikt ist oder Fehlkonfigurationen auftreten.

