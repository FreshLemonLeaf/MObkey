// Initial Game Setup
let money = parseInt(localStorage.getItem("money")) || 0;
let moneyPerClick = parseInt(localStorage.getItem("moneyPerClick")) || 1;
let inventory = JSON.parse(localStorage.getItem("inventory")) || [];
let upgrades = JSON.parse(localStorage.getItem("upgrades")) || { clickUpgrade: 10, autoClicker: 100 };
let autoClickerInterval = null;

// UI Update Functions
function updateUI() {
  document.getElementById("money-display").innerText = `Money: $${money}`;
  document.getElementById("money-per-click").innerText = `Money per Click: $${moneyPerClick}`;
}

// Save Function
function saveGame() {
  localStorage.setItem("money", money);
  localStorage.setItem("moneyPerClick", moneyPerClick);
  localStorage.setItem("inventory", JSON.stringify(inventory));
  localStorage.setItem("upgrades", JSON.stringify(upgrades));
}

// Click to Earn Money
function clickMoney() {
  money += moneyPerClick;
  updateUI();
  saveGame();
}

// Shop: Upgrade Click Value
function buyClickUpgrade() {
  const cost = upgrades.clickUpgrade;
  if (money >= cost) {
    money -= cost;
    moneyPerClick += 1;
    upgrades.clickUpgrade *= 2; // Increase price for next upgrade
    updateUI();
    saveGame();
  } else {
    alert("Not enough money for upgrade!");
  }
}

// Shop: Buy Auto Clicker
function buyAutoClicker() {
  const cost = upgrades.autoClicker;
  if (money >= cost) {
    money -= cost;
    upgrades.autoClicker *= 2;
    if (!autoClickerInterval) startAutoClicker();
    updateUI();
    saveGame();
  } else {
    alert("Not enough money for auto-clicker!");
  }
}

// Auto Clicker Functionality
function startAutoClicker() {
  autoClickerInterval = setInterval(() => {
    money += moneyPerClick;
    updateUI();
    saveGame();
  }, 1000);
}

// Gambling Mini-game
function gamble() {
  if (money < 10) {
    alert("Not enough money to gamble!");
    return;
  }
  const gambleAmount = 10;
  const winChance = Math.random();
  if (winChance > 0.5) {
    money += gambleAmount * 2;
    alert("You won!");
  } else {
    money -= gambleAmount;
    alert("You lost!");
  }
  updateUI();
  saveGame();
}

// Load game on page load
window.onload = () => {
  updateUI();
  if (upgrades.autoClicker > 100) startAutoClicker();
};

// Reset Game
function resetGame() {
  if (confirm("Are you sure you want to reset?")) {
    money = 0;
    moneyPerClick = 1;
    inventory = [];
    upgrades = { clickUpgrade: 10, autoClicker: 100 };
    clearInterval(autoClickerInterval);
    autoClickerInterval = null;
    saveGame();
    updateUI();
  }
};
