
document.addEventListener("DOMContentLoaded", () => {
  // ELEMENTS
  const tabs = document.querySelectorAll('.mytabs input[type="radio"]');
  const tabContents = document.querySelectorAll('.mytabs .tab');
  const greeting = document.querySelector('.Greetings p');
  const submitBtn = document.querySelector('#submitBtn');
  const rgbInput = document.querySelector('#rgbInput');
  const resultsDiv = document.querySelector('#results');

  // TYPING ANIMATION EFFECT FOR GREETING
  if (greeting) {
    const text = greeting.textContent.trim();
    greeting.textContent = "";
    let i = 0;
    (function typing() {
      if (i < text.length) {
        greeting.textContent += text.charAt(i++);
        setTimeout(typing, 20);
      }
    })();
  }

  // SWITCHING BETWEEN TABS
  tabs.forEach((tab, index) => {
    tab.addEventListener("change", () => {
      tabContents.forEach(c => c.classList.remove("active-tab"));
      if (tabContents[index]) tabContents[index].classList.add("active-tab");
    });
  });

  // INPUT GLOW EFFECT
  if (rgbInput) {
    rgbInput.addEventListener("focus", () => rgbInput.style.boxShadow = "0 0 16px #ff7ba0");
    rgbInput.addEventListener("blur", () => rgbInput.style.boxShadow = "none");
  }

  // RIPPLE EFFECT
  function createRipple(e, container) {
    const rect = container.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%,-50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = '12px';
    ripple.style.background = 'rgba(255,255,255,0.6)';
    ripple.style.opacity = '1';
    ripple.style.transition = 'width .6s ease, height .6s ease, opacity .6s ease';
    container.appendChild(ripple);
    requestAnimationFrame(() => {
      ripple.style.width = ripple.style.height = '160px';
      ripple.style.opacity = '0';
    });
    setTimeout(() => ripple.remove(), 650);
  }

  // CONFETTI EFFECT
  function confettiBurst() {
    for (let j = 0; j < 16; j++) {
      const confetti = document.createElement("div");
      confetti.style.position = 'fixed';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.background = `hsl(${Math.random() * 360}, 100%, 65%)`;
      confetti.style.opacity = '0.95';
      confetti.style.borderRadius = '2px';
      confetti.style.zIndex = 9999;
      confetti.style.transition = 'transform 1000ms linear, opacity 900ms linear';
      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.style.transform = `translateY(${200 + Math.random()*120}px) rotate(${Math.random()*360}deg)`;
        confetti.style.opacity = '0';
      }, 20);

      setTimeout(() => confetti.remove(), 1100);
    }
  }

  // RENDERING RESULTS FROM FLASK
  function renderResults(data) {
    if (!resultsDiv) return;
    resultsDiv.innerHTML = '';

    
    const order = ["original", "protanopia", "deuteranopia", "tritanopia"];

    for (const type of order) {
      if (!data[type]) continue; 

      const info = data[type];
      const div = document.createElement('div');
      div.className = 'color-box';
      const rgbText = Array.isArray(info.rgb) ? info.rgb.join(', ') : '';
      div.innerHTML = `
        <h4 style="margin:6px 0 10px; font-size:14px; text-transform:capitalize;">${type}</h4>
        <img src="data:image/png;base64,${info.image}" alt="${type} swatch" />
        <p style="margin:8px 0 0; font-size:13px;">rgb(${rgbText})</p>
      `;
      resultsDiv.appendChild(div);
    }
  }

  // SUBMIT/SIMULATE BUTTON HANDLING
  if (submitBtn) {
    submitBtn.addEventListener("click", async (e) => {
      createRipple(e, submitBtn);
      confettiBurst();

      const rgbText = rgbInput.value;
      const rgb = rgbText.split(',').map(x => x.trim()).map(Number);

      if (rgb.length !== 3 || rgb.some(isNaN) || rgb.some(n => n < 0 || n > 255)) {
        alert('Please enter a valid RGB value like 255,0,0 (0-255).');
        return;
      }

      try {
        const response = await fetch("/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rgb })
        });

        const data = await response.json();
        renderResults(data);

      } catch (err) {
        console.error(err);
        alert("Error contacting the server.");
      }
    });
  }
});
