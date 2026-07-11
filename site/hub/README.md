# Polski Hub Finansowania Efektywności Energetycznej — wersja 6

Kompletny, dwujęzyczny serwis statyczny PL/EN. Paczka nie wymaga bazy danych, PHP, Node.js ani zewnętrznych bibliotek.

## Szybkie wdrożenie

1. Rozpakuj paczkę w katalogu publikowanym przez serwer WWW.
2. Upewnij się, że `index.html` jest dokumentem startowym.
3. Po ustaleniu publicznej domeny uruchom:

```bash
python _deployment/prepare_deployment.py --base-url https://twoja-domena.example/hub
```

Skrypt doda adresy kanoniczne, bezwzględne odnośniki `hreflang`, utworzy `sitemap.xml` i uzupełni `robots.txt`. Nie używa bibliotek zewnętrznych.

4. Po wdrożeniu sprawdź stronę na docelowym adresie i wykonaj pomiar Core Web Vitals. Wynik zależy także od serwera, kompresji i cache.

## Edycja treści

Treści znajdują się w:

```text
_source/content/
```

Wspólna konfiguracja stron i nawigacji znajduje się w:

```text
_source/site.json
_source/build.py
```

Po zmianach uruchom z katalogu głównego:

```bash
python _source/build.py
```

Generator odtworzy wszystkie strony polskie, angielskie i stronę 404.

## Struktura

```text
index.html                 polska strona główna
koalicja.html              Koalicja
hub.html                   Polski Hub
grupy.html                 grupy robocze
life.html                  projekt LIFE
wspolpraca.html            współpraca i rezultaty
kontakt.html               kontakt
prywatnosc.html            prywatność
dostepnosc.html            dostępność
en/                        pełna wersja angielska
assets/                    CSS, JavaScript i zoptymalizowane grafiki
_source/                   treści i generator strony
_deployment/               narzędzia oraz przykłady konfiguracji serwera
AUDYT_14_KRYTERIOW.md      końcowy audyt jakości
```

## Prywatność

- brak cookies;
- brak analityki;
- brak reklam i skryptów stron trzecich;
- brak formularza oraz kont użytkowników;
- adres e-mail jest prezentowany w formie ograniczającej automatyczne kopiowanie przez boty.

## Bezpieczeństwo

W dokumentach znajduje się podstawowa polityka CSP w znaczniku `meta`. Katalog `_deployment` zawiera przykłady mocniejszych nagłówków dla Apache i nginx. Przykłady trzeba dopasować do konfiguracji docelowego serwera.

## Link do publikacji

Po udostępnieniu publikacji należy dodać jej adres w plikach źródłowych:

```text
_source/content/pl-cooperation.html
_source/content/en-cooperation.html
```

Następnie ponownie uruchomić generator.
