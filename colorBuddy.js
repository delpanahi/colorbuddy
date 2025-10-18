// Color Buddy Interactivity and Effects
document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll('.mytabs input[type="radio"]');
    const tabContents = document.querySelectorAll('.mytabs .tab');
    const greeting = document.querySelector('.Greetings p');
    const submitBtn = document.querySelector('.Submit-Button button');
    const rgbInput = document.querySelector('#rgb');
  
    // --- Ensure main Color Buddy tab is visible on load ---
    const firstTabContent = document.querySelector('#tab1 + label + .tab');
    if (firstTabContent) {
      firstTabContent.classList.add("active-tab");
    }
  
    // --- Typing animation for greeting text ---
    const text = greeting.textContent;
    greeting.textContent = "";
    let i = 0;
    const typing = () => {
      if (i < text.length) {
        greeting.textContent += text.charAt(i);
        i++;
        setTimeout(typing, 40);
      }
    };
    typing();
  
    // --- Smooth tab transitions ---
    tabs.forEach((tab, index) => {
      tab.addEventListener("change", () => {
        tabContents.forEach(content => content.classList.remove("active-tab"));
        tabContents[index].classList.add("active-tab");
      });
    });
  
    // --- Input glow effect ---
    rgbInput.addEventListener("focus", () => {
      rgbInput.style.boxShadow = "0 0 20px #ff7ba0";
    });
    rgbInput.addEventListener("blur", () => {
      rgbInput.style.boxShadow = "none";
    });
  
    // --- Button ripple + confetti ---
    submitBtn.addEventListener("click", (e) => {
      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = e.offsetX + "px";
      ripple.style.top = e.offsetY + "px";
      submitBtn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
      confettiBurst();
    });
  
    // --- Confetti animation ---
    function confettiBurst() {
      for (let j = 0; j < 20; j++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
      }
    }
  });
  