module.exports = async function spinSlots(msg) {
  const symbols = ["🍒", "🍋", "🔔", "🍉", "⭐", "7️⃣"];

  // Final symbols picked
  const finalSlots = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  const isWin = finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2];

  // Start with placeholders
  let currentSlots = ["⬜", "⬜", "⬜"];
  const sentMsg = await msg.reply(`🎰 ${currentSlots.join(" | ")}`);

  // Function to spin a single reel
  const spinReel = (index, duration, stopSymbol) => {
    return new Promise(resolve => {
      const spinInterval = 100; // consistent interval for smoother spin
      const startTime = Date.now();

      const interval = setInterval(() => {
        currentSlots[index] = symbols[Math.floor(Math.random() * symbols.length)];
        sentMsg.edit(`🎰 ${currentSlots.join(" | ")}`);

        // Stop after duration
        if (Date.now() - startTime >= duration) {
          clearInterval(interval);
          currentSlots[index] = stopSymbol;
          sentMsg.edit(`🎰 ${currentSlots.join(" | ")}`);
          resolve();
        }
      }, spinInterval);
    });
  };

  // Spin each reel with staggered stop
  await spinReel(0, 1000, finalSlots[0]);
  await spinReel(1, 1500, finalSlots[1]);
  await spinReel(2, 2000, finalSlots[2]);

  // Final result message
  const finalLine = `🎰 ${currentSlots.join(" | ")}`;
  sentMsg.edit(`${finalLine}\n${isWin ? "🎉 You win!" : "Try again!"}`);
};
