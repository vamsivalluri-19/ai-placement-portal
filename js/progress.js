document.querySelectorAll(".progress span").forEach(bar => {
  setTimeout(() => {
    bar.style.width = bar.dataset.width;
  }, 200);
});
