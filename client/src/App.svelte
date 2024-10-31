<script>
  import router from 'page';

  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  import Register from "./pages/Register.svelte";
  import CreateItem from "./pages/CreateItem.svelte";
  import EditItem from "./pages/EditItem.svelte";
  import ItemDetails from "./pages/ItemDetails.svelte";
  import Wins from "./pages/Wins.svelte";

  import Header from "./components/Header.svelte";
  import TailwindCss from "./lib/TailwindCSS.svelte";

  let page;
  let params;
  let currentRoute;

  router('/', (ctx) => {
    page = Home;
    currentRoute = ctx.pathname;
  });

  router('/login', (ctx) => {
    page = Login;
    currentRoute = ctx.pathname;
  });

  router('/register', (ctx) => {
    page = Register;
    currentRoute = ctx.pathname;
  });

  router('/create', (ctx) => {
    page = CreateItem;
    currentRoute = ctx.pathname;
  });

  router('/edit/:id', (ctx) => {
    page = EditItem;
    currentRoute = ctx.pathname;
    params = ctx.params;
  });

  router('/computers/:id', (ctx) => {
    page = ItemDetails;
    currentRoute = ctx.pathname;
    params = ctx.params;
  });

  router('/wins', (ctx) => {
    page = Wins;
    currentRoute = ctx.pathname;
  });

  router.start();
</script>

<TailwindCss/>

<main class="max-w-7xl mx-auto">
  {#if currentRoute !== "/login" && currentRoute !== "/register"}
    <Header active={currentRoute} />
  {/if}
  <svelte:component this={page} {params} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
</style>
