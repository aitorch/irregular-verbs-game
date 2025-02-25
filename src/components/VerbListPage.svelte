<script>
  import { verbs } from "../core/verbs";
  import { push } from "svelte-spa-router"; // Use `push` instead of `navigate`

  // Function to go back to the main screen
  function goBack() {
    push("/"); // Use `push` to navigate back
  }
</script>

<div class="verb-list-page">
  <h1>Full List of Verb Forms</h1>
  <button on:click={goBack} class="back-button">⬅️ Back to Main Screen</button>
  <div class="verb-list-scrollable">
    <table class="verb-table">
      <thead>
        <tr>
          <th>Infinitive</th>
          <th>Past</th>
          <th>Participle</th>
          <th>Emoji</th>
        </tr>
      </thead>
      <tbody>
        {#each verbs as verb}
          <tr class="verb-item">
            <td>
              <span class="emoji">{verb.emoji}</span>
              <strong>{verb.infinitive}</strong>
            </td>
            <td>{verb.past}</td>
            <td>{verb.participle}</td>
            <td>{verb.emoji}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<style>
  .verb-list-page {
    text-align: center;
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .back-button {
    background: #ff6f61;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 1rem;
    font-size: 1rem;
  }

  .back-button:hover {
    background: #ff4a3d;
  }

  .verb-list-scrollable {
    max-height: 70vh;
    overflow-y: auto;
    border: 1px solid #eee;
    border-radius: 8px;
    margin-top: 1rem;
  }

  .verb-table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    table-layout: fixed;
  }

  .verb-table th,
  .verb-table td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid #eee;
    vertical-align: middle;
  }

  .verb-table th {
    background: #ff6f61;
    color: white;
    font-size: 1.1rem;
    position: sticky;
    top: 0;
    z-index: 1;
  }

  .emoji {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
</style>
