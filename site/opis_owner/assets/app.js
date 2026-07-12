(function () {
  var checkboxes = document.querySelectorAll(".checklist input[type='checkbox']");
  var scoreEl = document.getElementById("score");
  var titleEl = document.getElementById("score-title");
  var textEl = document.getElementById("score-text");

  if (checkboxes.length && scoreEl && titleEl && textEl) {
    function updateScore() {
      var score = 0;
      checkboxes.forEach(function (box) {
        if (box.checked) score += Number(box.getAttribute("data-score") || 0);
      });
      scoreEl.textContent = String(score);

      if (score <= 4) {
        titleEl.textContent = "Start od inwentaryzacji";
        textEl.textContent = "Najpierw trzeba sprawdzic, skad beda dane, jak wyglada taryfa i czy urzadzenia da sie czytac bezpiecznie.";
      } else if (score <= 8) {
        titleEl.textContent = "Dobry kandydat na tryb read-only";
        textEl.textContent = "Mozna zaczac od raportow, prognozy PV i walidacji danych. Sterowanie fizyczne jeszcze poczeka.";
      } else if (score <= 12) {
        titleEl.textContent = "Dobry kandydat na rekomendacje";
        textEl.textContent = "System moze proponowac decyzje i pracowac w trybie suchym, zanim przejmie sterowanie.";
      } else {
        titleEl.textContent = "Gotowy na kontrolowana automatyke";
        textEl.textContent = "Warunki wygladaja dobrze, ale nadal warto uruchamiac sterowanie etapami i z procedura awaryjna.";
      }
    }

    checkboxes.forEach(function (box) {
      box.addEventListener("change", updateScore);
    });
  }

  var backTop = document.querySelector(".back-top");
  if (backTop) {
    backTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
