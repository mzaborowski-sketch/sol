
(function(){
  document.querySelectorAll('.tile').forEach(tile=>{
    tile.addEventListener('click', ()=>{
      const link = tile.getAttribute('data-href');
      if(link){ location.href = link; }
    });
    tile.style.cursor='pointer';
  });
})();
