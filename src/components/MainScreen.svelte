<script>
  import Game from './Game.svelte';
  import { push } from "svelte-spa-router"; // Use `push` instead of `navigate`
  import { GameState } from "../core/GameState";
  let gameStarted = false;
  let gameState = new GameState();
  let score = gameState.score;

  // Function to navigate to the verb list
  function showVerbList() {
    push("/verb-list"); // Use `push` to navigate
  }
</script>

{#if !gameStarted}
  <div class="main-screen">
    <h1 class="title">Verb Master 🌟</h1>
    
    <div class="rules">
      <h2>How to Play:</h2>
      <ol>
        <li>Complete each phase by answering verb questions</li>
        <li>Get points for correct answers</li>
        <li>Unlock new phases as you progress</li>
        <li>Use hints after 3 attempts</li>
      </ol>
    </div>
    <div class="score-badge">⭐ Current Score: {score}</div>

    <div class="emoji-list">
      <span>🏆</span>
      <span>📚</span>
      <span>🎯</span>
      <span>💡</span>
    </div>

    <button class="start-button" on:click={() => gameStarted = true}>
      Start Game 🚀
    </button>

    <!-- Button to navigate to the verb list -->
    <button class="start-button" on:click={showVerbList}>
      Show Verb List 📚
    </button>
  </div>
{:else}
  <Game />
{/if}

<style>
  .main-screen {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .start-button {
    margin: 0.5rem;
  }
</style>
