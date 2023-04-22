// const scenario = `Max: Quod equidem non reprehendo;
// Geralt: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quibus natura iure responderit non esse verum aliunde finem beate vivendi, a se principia rei gerendae peti; Quae enim adhuc protulisti, popularia sunt, ego autem a te elegantiora desidero. Duo Reges: constructio interrete. Tum Lucius: Mihi vero ista valde probata sunt, quod item fratri puto. Bestiarum vero nullum iudicium puto. Nihil enim iam habes, quod ad corpus referas; Deinde prima illa, quae in congressu solemus: Quid tu, inquit, huc? Et homini, qui ceteris animantibus plurimum praestat, praecipue a natura nihil datum esse dicemus?

// Yennefer: Iam id ipsum absurdum, maximum malum neglegi. Quod ea non occurrentia fingunt, vincunt Aristonem; Atqui perspicuum est hominem e corpore animoque constare, cum primae sint animi partes, secundae corporis. Fieri, inquam, Triari, nullo pacto potest, ut non dicas, quid non probes eius, a quo dissentias. Equidem e Cn. An dubium est, quin virtus ita maximam partem optineat in rebus humanis, ut reliquas obruat?

// Geralt: Quis istum dolorem timet?
// Summus dolor plures dies manere non potest? Dicet pro me ipsa virtus nec dubitabit isti vestro beato M. Tubulum fuisse, qua illum, cuius is condemnatus est rogatione, P. Quod si ita sit, cur opera philosophiae sit danda nescio.`;


// const results = scenario.match(/^[a-z]+:/gmi);
// console.log(results);

// const charachters = [];
// results.forEach(characterName => {
//  const name = characterName.slice(0, -1);
//  // [].find(e => ...) => null || elem
//  // [].includes(<value>) => boolean
//  if (!charachters.includes(name)) {
//   charachters.push(name);
//  }
// });

// console.log(charachters);



const fs = require('fs');

// Читає "scenario.txt"
fs.readFile('scenario.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Створює об'єкт для зберігання діалогів кожного персонажа
  const res = {};

    // Шукає всі рядки, які починаються з імен персонажів та визначає індекс початку кожного рядка
  const b = [...data.matchAll(/^(Triss|Geralt|Max|Yennefer):/gmi)];
  for (let i = 0; i < b.length; i += 1) {
    const match = b[i];
    const [_1, characterName] = match;
    const { index } = match;
        // Якщо персонаж вже присутній у res, тоді додає новий рядок діалогу до відповідного масиву
    if (res[characterName]) {
      res[characterName].push({
        start: index,
        end: b[i + 1] ? b[i + 1].index : -1,
      });
    } 
        // Інакше створює новий масив з першим рядком діалогу
    else {
      res[characterName] = [
        {
          start: index,
          end: b[i + 1] ? b[i + 1].index : -1,
        },
      ];
    }
  }

  // Записує кожен рядок діалогу до окремого файлу
  Object.entries(res).forEach(([name, indices]) => {
    indices.forEach(({ start, end }, index) => {
              // Вирізає текст діалогу з вмісту файла "scenario.txt"
      const text = data.slice(start, end).trim();
            // Створює назву файлу на основі імені персонажа та порядкового номеру рядка діалогу
      const fileName = `${name}-${index + 1}.txt`;
            // Записує текст діалогу до створенного файлу
      fs.writeFile(fileName, text, err => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(`${fileName} saved successfully!`);
      });
    });
  });
});








