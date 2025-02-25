<script>
  import Router from "svelte-spa-router";
  import MainScreen from "./MainScreen.svelte";
  import VerbListPage from "./VerbListPage.svelte";

  // Define routes
  const routes = {
    "/": MainScreen,
    "/verb-list": VerbListPage,
  };
</script>

<Router {routes} />
