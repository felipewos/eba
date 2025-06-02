const months = [
  { name: "Janeiro", days: 31 },
  { name: "Fevereiro", days: 29 },
  { name: "Março", days: 31 },
  { name: "Abril", days: 30 },
  { name: "Maio", days: 31 },
  { name: "Junho", days: 30 },
  { name: "Julho", days: 31 },
  { name: "Agosto", days: 31 },
  { name: "Setembro", days: 30 },
  { name: "Outubro", days: 31 },
  { name: "Novembro", days: 30 },
  { name: "Dezembro", days: 31 }
];

const monthButtonsContainer = document.getElementById("monthButtons");
const dayButtonsContainer = document.getElementById("dayButtonsContainer");
const audioPlayer = document.getElementById("audioPlayer");

let selectedMonth = null;

// Criar botões dos meses
months.forEach((month, index) => {
  const btn = document.createElement("button");
  btn.classList.add("month-button");
  btn.textContent = month.name;
  btn.dataset.index = (index + 1).toString().padStart(2, '0');
  btn.addEventListener("click", () => selectMonth(btn, index));
  monthButtonsContainer.appendChild(btn);
});

function selectMonth(button, index) {
  selectedMonth = (index + 1).toString().padStart(2, '0');

  // Ativar botão selecionado
  document.querySelectorAll(".month-button").forEach(btn => {
    btn.classList.remove("active");
  });
  button.classList.add("active");

  // Exibir container de dias
  dayButtonsContainer.classList.add("active");
  dayButtonsContainer.innerHTML = "";

  // Criar botões dos dias
  const numDays = months[index].days;
  for (let i = 1; i <= numDays; i++) {
    const dayBtn = document.createElement("button");
    dayBtn.classList.add("day-button");
    dayBtn.textContent = i;
    dayBtn.dataset.day = i.toString().padStart(2, '0');
    dayBtn.addEventListener("click", () => selectDay(dayBtn));
    dayButtonsContainer.appendChild(dayBtn);
  }
}

function selectDay(button) {
  document.querySelectorAll(".day-button").forEach(btn => {
    btn.classList.remove("active");
  });
  button.classList.add("active");

  const selectedDay = button.dataset.day;
  const filename = `${selectedMonth}-${selectedDay}.mp3`;
  audioPlayer.src = `audios/${filename}`;
  audioPlayer.play();
}

// Selecionar automaticamente o mês e o dia atual
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  const monthButton = document.querySelectorAll(".month-button")[month];
  if (monthButton) {
    monthButton.click();
    setTimeout(() => {
      const dayBtn = Array.from(document.querySelectorAll(".day-button")).find(btn => btn.textContent == day);
      if (dayBtn) {
        dayBtn.click();
      }
    }, 200);
  }
});
