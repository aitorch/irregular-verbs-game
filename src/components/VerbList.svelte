<script>
  import { verbs } from "../core/verbs";
</script>

<div class="verb-list-container">
  <h2>Full List of Verb Forms</h2>
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
  .verb-list-container {
    margin-top: 2rem;
    background: white;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .verb-list-scrollable {
    max-height: 400px; /* Adjust this value as needed */
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
    top: 0; /* Makes the header sticky */
    z-index: 1;
  }

  .emoji {
    font-size: 1.5rem;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
</style>
