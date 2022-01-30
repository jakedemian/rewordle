export function getLetterColorForWord(letterIndex, guessedWord, correctWord) {
  const correctWordUpper = correctWord.toUpperCase();
  const guessedLetter = guessedWord[letterIndex].toUpperCase();
  const correctLetter = correctWordUpper[letterIndex];
  let slicedGuessWord = guessedWord.slice(0, letterIndex);

  if (guessedLetter === correctLetter) {
    return "tile--green";
  }

  if (correctWordUpper.includes(guessedLetter)) {
    // we found at least one match

    let occuranceCount = (
      correctWordUpper.match(new RegExp(guessedLetter, "g")) || []
    ).length;

    //get number of green occurances, subtract from total
    for (let i = 0; i < guessedWord.length; i++) {
      const _guessedLetter = guessedWord[i];
      const correctLetter = correctWordUpper[i];

      // removed correct letters from the sliced guess word, we dont care,
      // about them anymore for calculating yellow tiles
      if (
        _guessedLetter === correctLetter &&
        _guessedLetter === guessedLetter
      ) {
        occuranceCount -= 1;

        if (i + 1 >= slicedGuessWord.length) {
          slicedGuessWord = slicedGuessWord.slice(0, i) + " ";
        } else {
          slicedGuessWord =
            slicedGuessWord.slice(0, i) + " " + slicedGuessWord.slice(i + 1);
        }
      }
    }

    //get yellow occurances BEFORE this one in the guessed word
    let yellowCount = (
      slicedGuessWord.match(new RegExp(guessedLetter, "g")) || []
    ).length;
    occuranceCount -= yellowCount;

    if (occuranceCount > 0) {
      return "tile--yellow";
    }
  }

  return null;
}

export function getLetterColorForGuessedWords(
  letter,
  guessedWords,
  correctWord
) {
  let color = null;
  for (let gw = 0; gw < guessedWords.length; gw++) {
    const guessedWord = guessedWords[gw];

    for (let i = 0; i < guessedWord.length; i++) {
      const guessedLetter = guessedWord[i];
      if (guessedLetter.toUpperCase() !== letter.toUpperCase()) {
        continue;
      }

      const guessedLetterColor = getLetterColorForWord(
        i,
        guessedWord,
        correctWord
      );
      if (guessedLetterColor === "tile--green") {
        return "tile--green";
      } else if (guessedLetterColor === "tile--yellow") {
        color = "tile--yellow";
      }
    }
  }

  return color;
}
