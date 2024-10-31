<script>
    import Filters from "../components/Filters.svelte";
    import Items from "../components/Items.svelte";
</script>

<section class="section">
    <div class="container">
        <Filters />
        <Items />
    </div>
</section>

<style>
    .section {
        padding: 20px 0px;
    }

    .container {
        display: flex;
        padding: 10px;
        width: 100%;
    }
</style>