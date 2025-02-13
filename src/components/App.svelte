<script>
  import { verbs } from "../core/verbs";
  import { GameState } from "../core/GameState";
  import { QuestionManager } from "../core/QuestionManager";

  let gameState = new GameState();
  let questionManager = new QuestionManager(verbs);
  let currentQuestion = null;
  let userAnswers = [];
  let gameStarted = false;
  let phaseVerbs = [];
  let score = 0;
  let attempts = 0;
  let showHint = false;

  // Initialize the game properly
  function initializeGame() {
    phaseVerbs = gameState.getPhaseVerbs(verbs);
    gameStarted = false;
    score = gameState.score;
  }

  function startPhase() {
    initializeGame(); // Initialize first
    gameStarted = true;
    nextQuestion(); // Then generate the first question
  }

  function nextQuestion() {
  if (phaseVerbs.length === 0) return;

  currentQuestion = questionManager.generateQuestion(phaseVerbs);
  
  // Count only input fields
  const inputCount = currentQuestion.template.filter(p => p.type === 'input').length;
  userAnswers = new Array(inputCount).fill('');
  
  attempts = 0;
  showHint = false;
}

  function handleSubmit() {
    attempts++;
    if (!currentQuestion) {
      console.error("No current question!");
      return;
    }

    const normalizedAnswers = userAnswers.map((a) => a.trim().toLowerCase());
    console.log("Normalized user answers:", normalizedAnswers); // Debug log

    const isCorrect = questionManager.checkAnswer(
      normalizedAnswers,
      currentQuestion,
    );

    if (isCorrect) {
      score += calculateScore();
      gameState.score = score;
      gameState.save();
      nextQuestion();
    } else {
      showHint = attempts >= 3;
    }
  }

  function calculateScore() {
    if (attempts === 1) return 10;
    if (attempts <= 3) return 5;
    return 3;
  }

  // Initialize when component mounts
  initializeGame();
</script>

<div class="game-container">
  {#if !gameStarted}
    <!-- Phase Start Screen -->
    <div class="phase-start-screen">
      <h2>Phase {gameState.currentPhase} Verbs 🌟</h2>
      <ul>
        {#each phaseVerbs as verb}
          <li class="verb-item">
            <span class="emoji">{verb.emoji}</span>
            <div class="verb-forms">
              <strong>{verb.infinitive}</strong>
              <span>{verb.past}</span>
              <span>{verb.participle}</span>
            </div>
          </li>
        {/each}
      </ul>
      <button on:click={startPhase} class="start-button">
        🚀 Start Phase {gameState.currentPhase}
      </button>
    </div>
  {:else if currentQuestion}
    <!-- Question Display -->
    <div
      class="question-card"
      style="background: {currentQuestion.verb.themeColor}"
    >
      <div class="verb-header">
        <div class="verb-emoji">{currentQuestion.verb.emoji}</div>
        <div class="score-badge">⭐ Score: {score}</div>
      </div>

      <div class="question-content">
{#each currentQuestion.template as part, index}
  {#if part.type === 'input'}
    <input
      class="input-field {showHint ? 'hint-field' : ''}"
      bind:value={userAnswers[part.answerIndex]} 
      placeholder={part.placeholder}
      style="border-color: {currentQuestion.verb.themeColor}"
    />
  {:else if part.type === 'text'}
    <span class="verb-text">{part.value}</span>
  {:else if part.type === 'separator'}
    <span class="separator">{part.value}</span>
  {/if}
{/each}
      </div>

      {#if showHint}
        <div class="hint-box">
          {#each questionManager.getHint(attempts, currentQuestion) as hint, i}
            <span class="hint-text">{hint}</span>
            {#if i < questionManager.getHint(attempts, currentQuestion).length - 1},
            {/if}
          {/each}
        </div>
      {/if}

      <button on:click={handleSubmit} class="submit-button">
        {attempts === 0 ? "Check Answer" : "Try Again"} ✅
      </button>
    </div>
  {/if}
</div>

<style>
  /* Enhanced styles */
  .game-container {
    font-family: "Comic Sans MS", cursive;
    max-width: 600px;
    margin: 2rem auto;
    padding: 2rem;
    border-radius: 20px;
    background: linear-gradient(145deg, #ffffff, #f0f8ff);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .phase-start-screen {
    text-align: center;
    padding: 2rem;
  }

  .verb-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .verb-forms {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    text-align: left;
  }

  .start-button {
    font-size: 1.2rem;
    padding: 1rem 2rem;
    background: #4caf50;
    border-radius: 25px;
    transition: transform 0.2s;
  }

  .question-card {
    padding: 2rem;
    border-radius: 20px;
    color: white;
  }

  .verb-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
  }

  .input-field {
    font-size: 1.1rem;
    padding: 0.8rem;
    border-radius: 10px;
    transition: all 0.3s;
  }

  .hint-field {
    background: rgba(255, 255, 255, 0.9);
    border: 2px dashed yellow;
  }

  .submit-button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 25px;
    background: #2196f3;
  }

  .hint-box {
    margin-top: 1rem;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
</style>
