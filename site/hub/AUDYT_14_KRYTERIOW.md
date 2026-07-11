# Audyt końcowy serwisu — 14 kryteriów

**Wersja:** 6  
**Zakres:** kompletna paczka statyczna PL/EN, kod, treść, nawigacja, responsywność i dostępność.  
**Wynik audytu paczki:** **70/70 — 14 × 5/5**

Ocena dotyczy dostarczonej paczki. Po wdrożeniu na docelowym serwerze należy ponownie zmierzyć Core Web Vitals, ponieważ wynik zależy również od hostingu, kompresji, cache i warunków sieciowych.

## 1. Jasny cel strony — 5/5

- Pierwszy ekran jednoznacznie podaje nazwę, funkcję i rolę serwisu.
- Dwa główne działania są widoczne bez przewijania: poznanie Hubu i kontakt z KAPE.
- Dodano trzy skróty prowadzące do najczęściej poszukiwanych informacji.
- Każda podstrona ma krótkie wprowadzenie wyjaśniające jej zakres.

## 2. Projekt mobile-first — 5/5

- Układ działa bez przewijania poziomego przy szerokościach 320, 390, 768 i 1440 px.
- Menu mobilne ma duże pola dotykowe, blokuje przewijanie tła i obsługuje klawiaturę.
- Siatki, karty, procesy, przyciski i stopka przechodzą do jednej kolumny na małych ekranach.
- Rozmiary nagłówków i odstępy są ograniczane na telefonie, bez utraty hierarchii.

## 3. Czytelna hierarchia wizualna — 5/5

- Każda strona ma dokładnie jeden nagłówek H1 i logiczny układ H2/H3.
- Nagłówki sekcji są wspierane krótkimi etykietami, numerami i wprowadzeniami.
- Duże tytuły zostały zmniejszone względem wcześniejszych wersji.
- Najważniejsze informacje są wyróżnione, lecz granat nie dominuje dużych powierzchni.

## 4. Prosta nawigacja — 5/5

- Spójne menu główne PL/EN, wyraźny stan aktywny i graficzny przełącznik języka.
- Okruszki nawigacyjne na podstronach.
- Nawigacja „Na tej stronie” dla dłuższych treści.
- Rozbudowana stopka zapewnia drugi sposób dotarcia do każdej strony.
- Menu mobilne aktualizuje etykietę „Otwórz/Zamknij”, przenosi fokus, zatrzymuje go wewnątrz menu i obsługuje Escape.

## 5. Spójny system wizualny — 5/5

- Kolory, promienie, cienie, odstępy, przyciski, karty i typografia są zdefiniowane centralnie w jednym arkuszu CSS.
- Te same komponenty zachowują tę samą logikę na wszystkich stronach PL i EN.
- Zróżnicowanie sekcji wynika z treści i funkcji, a nie przypadkowych dekoracji.

## 6. Dobra typografia — 5/5

- Tekst podstawowy: 17 px na dużych ekranach i 16 px na telefonach.
- Długość wiersza jest ograniczona do około 72 znaków typograficznych (`72ch`).
- Kontrast kluczowych par kolorów wynosi od 5,42:1 do 13,19:1.
- Interlinia, odstępy akapitowe i skala nagłówków są spójne.
- Usunięto bardzo małe teksty pomocnicze wskazane w poprzednim audycie.

## 7. Odpowiednia ilość i jakość treści — 5/5

- Główne strony zawierają od około 550 do ponad 1000 słów, podzielonych na krótkie, skanowalne sekcje.
- Karty nie są samymi hasłami: zawierają wyjaśnienia funkcji, znaczenia i rezultatów.
- Dodano źródła instytucjonalne, opis organizacji, sposobu pracy, grup i rezultatów.
- Treść polska i angielska ma równoległą strukturę i pełny zakres informacji.

## 8. Przestrzeń i odstępy — 5/5

- Odstępy wynikają ze wspólnej skali i zmniejszają się responsywnie.
- Tytuły, wprowadzenia i treść należące do tej samej sekcji są wizualnie połączone.
- Nie występują puste obszary sugerujące brak treści.
- Jasne tła i delikatne podziały poprawiają orientację bez przeciążania strony.

## 9. Szybkość działania — 5/5 na poziomie paczki

- Brak frameworków, zewnętrznych fontów, analityki i skryptów stron trzecich.
- Jeden lekki plik CSS i jeden lekki plik JavaScript.
- Grafiki zostały przekonwertowane do WebP, mają jawne wymiary oraz leniwe ładowanie poza pierwszym ekranem.
- Usunięto nieużywane kopie PNG/JPG.
- Cały serwis jest niewielki i nie wykonuje żadnych zapytań sieciowych poza kliknięciem użytkownika w zewnętrzny link.

**Kontrola po wdrożeniu:** rzeczywiste LCP, INP i CLS trzeba zmierzyć na docelowym adresie, ponieważ zależą także od serwera i sieci.

## 10. Dostępność — 5/5 na poziomie kodu i testów paczki

- Skip link, semantyczne obszary strony, jeden H1, logiczna hierarchia nagłówków.
- Widoczny `:focus-visible` o wysokim kontraście.
- Klawiaturowa obsługa menu, pułapka fokusu, Escape i powrót fokusu do przycisku.
- Grafiki mają `alt`, `width`, `height`; dekoracje są ukryte przed technologiami asystującymi.
- Obsługa `prefers-reduced-motion`.
- Osobna strona dostępności PL/EN i kanał zgłaszania problemów.
- Pola menu i główne przyciski mają co najmniej 48 px wysokości; pozostałe samodzielne cele interaktywne spełniają minimum WCAG 2.2.

## 11. Subtelna interaktywność — 5/5

- Przyciski i menu reagują zmianą tła, obramowania i delikatnym uniesieniem.
- Nie ma automatycznych sliderów, migania ani ruchu przeszkadzającego w czytaniu.
- Usunięto powtarzalne animowanie każdej karty.
- Przycisk powrotu do góry pojawia się wyłącznie na długich stronach.

## 12. Wiarygodność — 5/5

- Jednoznacznie wskazano KAPE jako Sekretariat.
- Podano nazwę, numer, okres i koordynatora projektu LIFE EEFINH.
- Dodano oficjalne odnośniki do Komisji Europejskiej, Koalicji, programu LIFE, ENEA i KAPE.
- Dodano informację o prywatności, dostępności i finansowaniu.
- Nie ma niepotwierdzonych logotypów partnerów ani nieuzgodnionego składu osobowego.

## 13. Łatwość dalszej rozbudowy — 5/5

- Wspólny generator tworzy 18 stron PL/EN z jednego systemu nagłówka, menu, stopki i metadanych.
- Treści są oddzielone od szablonu w katalogu `_source/content`.
- Menu, tłumaczenia elementów wspólnych i mapa stron są zarządzane centralnie.
- Generator korzysta wyłącznie ze standardowej biblioteki Pythona.
- Skrypt wdrożeniowy uzupełnia domenę, adresy kanoniczne, `hreflang`, `robots.txt` i `sitemap.xml`.

## 14. Brak zbędnych elementów — 5/5

- Brak cookies, banera zgód, reklam, analityki, sliderów, pop-upów, filmów i przypadkowych fotografii.
- Każdy komponent przekazuje informację albo wspiera nawigację.
- Dekoracje są lekkie i ograniczone do identyfikacji wizualnej.
- Nie ma nieużywanych bibliotek ani nieużywanych dużych grafik.

---

## Wykonane testy końcowe

- **19 plików HTML:** 0 błędów strukturalnych w teście statycznym.
- Sprawdzone: język dokumentu, jeden H1, hierarchia H1–H3, unikalne identyfikatory, odnośniki, kotwice, obrazy, opisy `alt`, wymiary obrazów, metadane, CSP, skip link i semantyczna nawigacja.
- **36 testów przeglądarkowych:** 9 kluczowych stron × 4 szerokości (320, 390, 768, 1440 px) — 0 błędów.
- Brak przewijania poziomego, błędów JavaScript i błędów menu mobilnego.
- Kontrast tekstu podstawowego: **13,19:1**; tekstu pomocniczego: **5,82:1**; linków: **5,42:1**.
