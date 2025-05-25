document.addEventListener("DOMContentLoaded", () => {
  const paymentOptions = document.querySelectorAll(".payment-option");

  paymentOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // Remove 'selected' class from all options
      paymentOptions.forEach((opt) => {
        opt.classList.remove("selected");
        const radio = opt.querySelector('input[type="radio"]');
        if (radio) {
          radio.checked = false;
        }
      });

      // Add 'selected' class to the clicked option
      option.classList.add("selected");
      const radio = option.querySelector('input[type="radio"]');
      if (radio) {
        radio.checked = true;
      }
    });
  });
});
