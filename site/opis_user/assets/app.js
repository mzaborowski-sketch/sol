(function () {
  var flowData = {
    tariffs: {
      title: "Taryfy zmieniaja zwykly pomiar energii w decyzje ekonomiczna.",
      body: "System najpierw musi wiedziec, ile kosztuje energia i kiedy. Sama informacja, ze mamy produkcje PV, nie wystarcza. Inaczej zachowujemy baterie, gdy prad jest tani, inaczej gdy zbliza sie droga godzina, a jeszcze inaczej gdy prognoza pokazuje mocne PV za kilka godzin.",
      input: "Tabele G13, ceny PSE/RCE, dni robocze, weekendy i swieta.",
      process: "System zamienia skomplikowane reguly taryfowe na godziny z konkretna cena i znaczeniem.",
      output: "Prosty sygnal dla kolejnych modulow: tanio, drogo, warto sprzedac, warto zachowac.",
      benefit: "Automatyka podejmuje decyzje finansowe, a nie tylko techniczne.",
      source: "Przyklad: G13 + PSE/RCE",
      link: "../05_01_03_g13_buy.html"
    },
    inverter: {
      title: "Dane z inwertera sa warstwa faktow.",
      body: "Prognozy moga byc dobre albo zle, ale dane rzeczywiste pokazuja, co wydarzylo sie naprawde. System pobiera surowe dane, parsuje je i zapisuje w swojej historii, bo tylko wtedy mozna sprawdzic skutecznosc decyzji.",
      input: "Surowe dane z falownika, baterii, PV, sieci i czesci EV.",
      process: "Dane sa pobierane, parsowane, porzadkowane czasowo i zapisywane w lokalnej historii.",
      output: "CSV i raporty pokazujace produkcje, pobor, oddanie, SOC oraz stan instalacji.",
      benefit: "System moze porownac prognoze z rzeczywistoscia i wykryc, czy decyzje dzialaja.",
      source: "Przyklad: bilans energii i statusy",
      link: "../20_16_energy_balance_current.html"
    },
    weather: {
      title: "Pogoda jest surowcem, nie gotowa odpowiedzia.",
      body: "Open-Meteo dostarcza promieniowanie, temperature i zachmurzenie. Dla PV szczegolnie wazne jest to, ze chmury niskie, srednie i wysokie moga miec inny wplyw na produkcje.",
      input: "Prognozy godzinowe: promieniowanie, temperatura, opad, cloud cover oraz chmury low/mid/high.",
      process: "System wybiera zmienne istotne dla PV i utrzymuje historie prognoz, zeby pozniej sprawdzic bledy.",
      output: "Znormalizowana prognoza pogodowa gotowa do modelu produkcji energii.",
      benefit: "Sterowanie nie opiera sie na hasle 'bedzie pochmurno', tylko na danych liczbowych.",
      source: "Przyklad: prototyp chmur",
      link: "../20_40_x_forecast_modified_prototype.html"
    },
    pv: {
      title: "Prognoza PV tlumaczy pogode na zachowanie konkretnej instalacji.",
      body: "Model wykorzystuje lokalne krzywe, wspolczynniki r i korekty chmur. Dzieki temu prognoza nie jest abstrakcyjna prognoza slonca, tylko przewidywaniem produkcji Twojego dachu.",
      input: "Pogoda, promieniowanie, historia produkcji, krzywa r i wspolczynniki zachmurzenia.",
      process: "Model przelicza warunki pogodowe na produkcje godzinowa konkretnej instalacji PV.",
      output: "Prognoza produkcji na dzis, jutro i kolejne godziny, wraz z mozliwoscia walidacji.",
      benefit: "Bateria i auto moga byc sterowane z wyprzedzeniem, a nie dopiero po pojawieniu sie nadwyzki.",
      source: "Przyklad: prognoza produkcji",
      link: "../40_31_pv_forecast_actual.html"
    },
    decision: {
      title: "Decyzja laczy PV, zuzycie, ceny i SOC.",
      body: "Ta sama bateria moze wymagac innego zachowania w zaleznosci od prognozy na reszte dnia. System wybiera strategię, ktora ma sens ekonomicznie i energetycznie.",
      input: "Prognoza PV, prognoza zuzycia, ceny, SOC, reguly i ograniczenia pracy urzadzen.",
      process: "Logika ocenia, czy lepiej ladowac, zachowac energie, sprzedac, zrobic miejsce w baterii albo ladowac auto.",
      output: "Rekomendacja i plan dzialania dla najblizszych slotow czasowych.",
      benefit: "Decyzja uwzglednia przyszlosc, a nie tylko chwilowy odczyt mocy.",
      source: "Przyklad: PV + zuzycie + ceny",
      link: "../20_50_pv_use_prices_forecast.html"
    },
    control: {
      title: "Sterowanie przeklada decyzje na falownik, baterie i auto.",
      body: "Tu konczy sie teoria. System przygotowuje profile pracy, wysyla komendy i zapisuje wynik. To dlatego audyt i historia sa tak wazne.",
      input: "Plan pracy, aktualny stan instalacji, ograniczenia falownika i ustawienia auta.",
      process: "System buduje profil lub komende, sprawdza stan, wysyla do warstwy wykonawczej i zapisuje rezultat.",
      output: "Zmienione ustawienia falownika, baterii albo ladowania auta oraz historia wykonania.",
      benefit: "Analiza faktycznie zmienia prace domu, zamiast pozostac tylko raportem.",
      source: "Przyklad: audyt profilu SolaX",
      link: "../80_10_05_solax_profile_executor_audit.html"
    },
    audit: {
      title: "Audyt pozwala ufac automatyce.",
      body: "Jesli system ma sam sterowac energia, musi umiec wyjasnic, co zrobil. Statusy, logi, raporty i przypadki testowe pozwalaja wykryc bledy zanim stana sie nawykiem.",
      input: "Logi, statusy, raporty, snapshoty dzienne, historia decyzji i przypadki testowe.",
      process: "System zbiera slady dzialania i udostepnia je w formie stron oraz plikow diagnostycznych.",
      output: "Mozliwosc odtworzenia, co system wiedzial i dlaczego podjal konkretna decyzje.",
      benefit: "Automatyka jest sprawdzalna, a nie magiczna.",
      source: "Przyklad: centralne statusy",
      link: "../00_statusy.html"
    }
  };

  var flowTitle = document.getElementById("flow-title");
  var flowBody = document.getElementById("flow-body");
  var flowInput = document.getElementById("flow-input");
  var flowProcess = document.getElementById("flow-process");
  var flowOutput = document.getElementById("flow-output");
  var flowBenefit = document.getElementById("flow-benefit");
  var flowSource = document.getElementById("flow-source");
  var flowLink = document.getElementById("flow-link");

  document.querySelectorAll(".flow-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-step");
      var data = flowData[key];
      if (!data) return;
      document.querySelectorAll(".flow-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      flowTitle.textContent = data.title;
      flowBody.textContent = data.body;
      flowInput.textContent = data.input;
      flowProcess.textContent = data.process;
      flowOutput.textContent = data.output;
      flowBenefit.textContent = data.benefit;
      flowSource.textContent = data.source;
      flowLink.href = data.link;
    });
  });

  document.querySelectorAll(".gallery-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-gallery");
      document.querySelectorAll(".gallery-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      document.querySelectorAll(".gallery-item").forEach(function (panel) {
        panel.classList.toggle("is-active", panel.getAttribute("data-gallery-panel") === key);
      });
    });
  });

  var scenarios = {
    sunny: {
      title: "Zrob miejsce w baterii i nie blokuj PV.",
      text: "Jesli prognoza pokazuje mocna produkcje w kolejnych godzinach, pelna bateria moze byc problemem. System moze sprzedac energie wczesniej albo inaczej ustawic profil falownika, zeby przyjac dzienna produkcje.",
      pv: "40,132 96,112 152,64 208,38 264,58 320,110 376,132",
      price: "40,116 96,116 152,116 208,116 264,102 320,70 376,52",
      battery: "40,70 96,78 152,94 208,116 264,98 320,80 376,74"
    },
    cloudy: {
      title: "Zachowaj energie, bo PV moze nie uzupelnic baterii.",
      text: "Przy slabym PV system nie powinien zbyt chetnie opróżniac baterii. Warto zachowac zapas na drozsze godziny albo krytyczne zuzycie domu.",
      pv: "40,132 96,126 152,118 208,108 264,118 320,128 376,134",
      price: "40,110 96,108 152,106 208,104 264,96 320,80 376,66",
      battery: "40,74 96,72 152,70 208,72 264,70 320,68 376,66"
    },
    price: {
      title: "Zachowaj lub sprzedaj energie w najlepszym slocie.",
      text: "Gdy wieczorem cena jest wysoka, energia w baterii ma wieksza wartosc. System moze opoznic rozladowanie albo przygotowac sprzedaz na najlepsza godzine.",
      pv: "40,130 96,112 152,84 208,76 264,94 320,122 376,134",
      price: "40,126 96,122 152,116 208,98 264,70 320,42 376,34",
      battery: "40,72 96,70 152,68 208,66 264,64 320,82 376,110"
    }
  };

  var scenarioTitle = document.getElementById("scenario-title");
  var scenarioText = document.getElementById("scenario-text");
  var scenarioPv = document.getElementById("scenario-pv");
  var scenarioPrice = document.getElementById("scenario-price");
  var scenarioBattery = document.getElementById("scenario-battery");

  document.querySelectorAll(".scenario-button").forEach(function (button) {
    button.addEventListener("click", function () {
      var key = button.getAttribute("data-scenario");
      var data = scenarios[key];
      if (!data) return;
      document.querySelectorAll(".scenario-button").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });
      scenarioTitle.textContent = data.title;
      scenarioText.textContent = data.text;
      scenarioPv.setAttribute("points", data.pv);
      scenarioPrice.setAttribute("points", data.price);
      scenarioBattery.setAttribute("points", data.battery);
    });
  });

  var backTop = document.querySelector(".back-top");
  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
