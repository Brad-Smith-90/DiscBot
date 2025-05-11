module.exports = function spinSlots(msg) {
  const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐", "7️⃣"];

  const slot1 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot2 = symbols[Math.floor(Math.random() * symbols.length)];
  const slot3 = symbols[Math.floor(Math.random() * symbols.length)];

  const isWin = slot1 === slot2 && slot2 === slot3;

  const finalLine = `🎰 ${slot1} | ${slot2} | ${slot3}`;
  const result = isWin ? "🎉 You win!" : "Try again!";

  msg.reply(`${finalLine}\n${result}`);
};
