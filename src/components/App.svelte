<script>
  import Game from './Game.svelte';
  import VerbList from './VerbList.svelte'; // Import the new component
  import { GameState } from "../core/GameState";
  let gameStarted = false;
  let showVerbList = false; // State to control visibility of verb list
  let gameState = new GameState();
  let score = gameState.score;
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

    <!-- New button to show verb list -->
    <button class="start-button" on:click={() => showVerbList = !showVerbList}>
      {showVerbList ? 'Hide Verb List' : 'Show Verb List'} 📚
    </button>

    <!-- Conditionally render the verb list -->
    {#if showVerbList}
      <VerbList />
    {/if}
  </div>
{:else}
  <Game />
{/if}
