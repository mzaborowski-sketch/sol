(function () {
  var taskData = {
    inverter: {
      title: "Nowy falownik: najpierw adapter, potem sterowanie.",
      text: "Nie zaczynaj od wysylania komend. Najpierw zbuduj read-only adapter, ktory stabilnie pobiera dane i zapisuje current/history. Dopiero po walidacji danych wolno myslec o senderze.",
      steps: [
        "Ustal dostep: lokalny, chmura, VPN, IP, Modbus, eksport.",
        "Zapisz raw data bez interpretacji.",
        "Napisz parser do wspolnego formatu.",
        "Dodaj status, log i test na puste dane.",
        "Porownaj z aplikacja producenta przez kilka dni."
      ],
      dod: [
        "current i history sa aktualne,",
        "braki danych nie kasuja historii,",
        "status pokazuje ostatni sukces,",
        "raport porownawczy ma sens."
      ]
    },
    tariff: {
      title: "Nowa taryfa: najpierw kalendarz, potem cena godzinowa.",
      text: "Nie modeluj taryfy jako prostego progu. Taryfa to kalendarz, dni specjalne, strefy, cennik i zasady obowiazywania.",
      steps: [
        "Zbierz zrodlo taryfy i zasady swiat/weekendow.",
        "Zbuduj generator ceny godzinowej.",
        "Dodaj current price oraz forecast today/tomorrow.",
        "Porownaj kilka losowych dni z dokumentem zrodlowym.",
        "Wystaw raport dla ownera."
      ],
      dod: [
        "kazda godzina ma cene,",
        "swieta sa poprawnie rozpoznane,",
        "jest raport dzis/jutro,",
        "bledy taryfy nie zatrzymuja danych PV."
      ]
    },
    forecast: {
      title: "Model PV: kazda poprawa musi miec metryke.",
      text: "Nowy wspolczynnik albo funkcja chmur ma sens tylko wtedy, gdy poprawia blad na historii albo jasno wyjasnia, gdzie model jest lepszy/gorszy.",
      steps: [
        "Zdefiniuj baseline.",
        "Dodaj nowa ceche lub rownanie w trybie eksperymentalnym.",
        "Policz bledy godzinowe i dzienne.",
        "Podziel wyniki wg chmur, godzin i poziomu produkcji.",
        "Zapisz diagnostyke AI na koniec dnia."
      ],
      dod: [
        "baseline nadal jest dostepny,",
        "nowy model ma tabele metryk,",
        "HTML pokazuje roznice,",
        "optymalizacja nie uczy sie pustych danych."
      ]
    },
    report: {
      title: "Nowy raport: ma tlumaczyc decyzje, nie tylko rysowac wykres.",
      text: "Raport powinien odpowiadac na pytanie, ktore pomaga ownerowi lub developerowi. Sam wykres bez kontekstu szybko przestaje byc uzyteczny.",
      steps: [
        "Nazwij pytanie raportu.",
        "Wybierz dane zrodlowe i zakres czasu.",
        "Dodaj tabele kontrolna obok wykresu.",
        "Zadbaj o link z index2 lub strony opisowej.",
        "Sprawdz assety i linki po publikacji."
      ],
      dod: [
        "raport ma jasny tytul i cel,",
        "wykres nie jest pusty,",
        "tabela pozwala sprawdzic liczby,",
        "linki dzialaja po publikacji."
      ]
    },
    automation: {
      title: "Regula automatyki: najpierw dry-run, potem sender.",
      text: "Regula, ktora ma wplyw na falownik lub auto, musi miec tryb suchy, audyt i ograniczenia. Najpierw pokazuje decyzje, pozniej dopiero wykonuje.",
      steps: [
        "Opisz warunek i oczekiwany efekt po ludzku.",
        "Dodaj regule jako rekomendacje.",
        "Zapisz decyzje, inputy i uzasadnienie.",
        "Uruchom na przypadkach testowych.",
        "Dopiero potem polacz z komenda wykonawcza."
      ],
      dod: [
        "dry-run pokazuje decyzje,",
        "test case da sie odtworzyc,",
        "brak danych daje bezpieczny fallback,",
        "manual override ma pierwszenstwo."
      ]
    }
  };

  var title = document.getElementById("task-title");
  var text = document.getElementById("task-text");
  var steps = document.getElementById("task-steps");
  var dod = document.getElementById("task-dod");

  function renderList(node, items, tag) {
    node.innerHTML = "";
    items.forEach(function (item) {
      var element = document.createElement(tag);
      element.textContent = item;
      node.appendChild(element);
    });
  }

  document.querySelectorAll(".task-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-task");
      var data = taskData[key];
      if (!data) return;
      document.querySelectorAll(".task-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      title.textContent = data.title;
      text.textContent = data.text;
      renderList(steps, data.steps, "li");
      renderList(dod, data.dod, "li");
    });
  });

  var backTop = document.querySelector(".back-top");
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
