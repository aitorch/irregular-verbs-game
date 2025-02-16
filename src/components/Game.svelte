<script>
  import '../styles/game.css';
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
    gameStarted = false; // Ensure the start phase screen is shown
    score = gameState.score;
  }

  function startPhase() {
    gameStarted = true; // Hide the start phase screen
    nextQuestion(); // Generate the first question
  }

  function nextQuestion() {
    if (phaseVerbs.length === 0) return;

    currentQuestion = questionManager.generateQuestion(phaseVerbs);

    // Count only input fields
    const inputCount = currentQuestion.template.filter(
      (p) => p.type === "input",
    ).length;
    userAnswers = new Array(inputCount).fill("");

    attempts = 0;
    showHint = false;
  }

  function handleSubmit() {
    attempts++;
    if (!currentQuestion) {
      console.error("No current question!");
      return;
    }

    const normalizedAnswers = userAnswers.map((a) => a.trim().toLowerCase().replace(/ /g, '_'));
    console.log("Normalized user answers:", normalizedAnswers); // Debug log

    const isCorrect = questionManager.checkAnswer(
      normalizedAnswers,
      currentQuestion,
    );

    if (isCorrect) {
      score += calculateScore();
      gameState.score = score;

      // Check if we should progress to the next phase
      const shouldProgress = gameState.checkPhaseProgress(score);
      if (shouldProgress) {
        initializeGame(); // Reset for the next phase
      } else {
        nextQuestion(); // Continue with the current phase
      }
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
      <table class="verb-table">
        <thead>
          <tr>
            <th>Infinitive</th>
            <th>Past</th>
            <th>Participle</th>
          </tr>
        </thead>
        <tbody>
          {#each phaseVerbs as verb}
            <tr class="verb-item">
              <td>
                <span class="emoji">{verb.emoji}</span>
                <strong>{verb.infinitive}</strong>
              </td>
              <td>{verb.past}</td>
              <td>{verb.participle}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      <button on:click={startPhase} class="start-button">
        🚀 Start Phase {gameState.currentPhase}
      </button>
    </div>
  {:else if currentQuestion}
    <!-- Question Card -->
    <div class="question-card">
      <div class="verb-header">
        <div class="verb-emoji">{currentQuestion.verb.emoji}</div>
        <div class="score-badge">⭐ Score: {score}</div>
        <div class="phase-indicator">Phase {gameState.currentPhase}</div>
      </div>

      <div class="question-content">
        {#each currentQuestion.template as part, index}
          {#if part.type === "input"}
            <input
              class="input-field {showHint ? 'hint-field' : ''}"
              bind:value={userAnswers[part.answerIndex]}
              placeholder={part.placeholder}
            />
          {:else if part.type === "text"}
            <span class="verb-text">{part.value}</span>
          {:else if part.type === "separator"}
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
