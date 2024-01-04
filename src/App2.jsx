import { useEffect, useState } from 'react';
import Board from './components/Board/Board';
import Swal from 'sweetalert2';
import confetti from 'canvas-confetti';

const emojiList = [...'💣🧤🎩🌮🎱🌶🍕🦖'];

const App2 = () => {
  const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
  const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  }, []);

  const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const allFlipped = shuffledMemoBlocks.every((block) => block.flipped);

    if (allFlipped) {
        confetti()
        Swal.fire({
            title: "Ganaste!",
            text: "felicidades.",
            imageUrl: "https://img.freepik.com/vector-premium/genial-dinosaurio-tocando-guitarra_145832-289.jpg",
            imageWidth: 400,
            imageHeight: 250,
       
          });
          
      // Puedes reiniciar el juego aquí si lo deseas
    }
  }, [shuffledMemoBlocks]);

  const handleMemoClick = (memoBlock) => {
    const flippedMemoBlock = { ...memoBlock, flipped: true };
    let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
    shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
    setShuffledMemoBlocks(shuffledMemoBlocksCopy);
    if (selectedMemoBlock === null) {
      setselectedMemoBlock(memoBlock);
    } else if (selectedMemoBlock.emoji === memoBlock.emoji) {
      setselectedMemoBlock(null);
    } else {
      setAnimating(true);
      setTimeout(() => {
        shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
        shuffledMemoBlocksCopy.splice(
          selectedMemoBlock.index,
          1,
          selectedMemoBlock
        );
        setShuffledMemoBlocks(shuffledMemoBlocksCopy);
        setselectedMemoBlock(null);
        setAnimating(false);
      }, 1000);
    }
  };

  const restartGame = () => {
    const shuffledEmojiList = shuffleArray([...emojiList, ...emojiList]);
    setShuffledMemoBlocks(
      shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
    );
  };

  return (
    <div>
      <h1 className='text'>Memo Juegos</h1>
      <h2>🦖 Abdiel 🦖 </h2>
      <Board
        memoBlocks={shuffledMemoBlocks}
        animating={animating}
        handleMemoClick={handleMemoClick}
      />
      <div>
        <button onClick={restartGame}>Reiniciar juego</button>
      </div>
    </div>
  );
};

export default App2;
