<script>
    let { data } = $props();
    let username = data.username;
    let isLoggedIn = data.isLoggedIn;
</script>

<h1>banking application</h1>

{#if isLoggedIn}
    <p>
    the balance of your Swiss account is: $ 100,000,000 :-)
    </p>
{:else}
    <div class="error">
        ERROR
        <br>
        you are not authorised to view this page!
    </div>
{/if}

<style>
    .error {
        padding: 1rem;
        background-color: pink;
        text-align: center;
        font-size: 2rem;
    }
</style>