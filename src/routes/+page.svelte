<script>
    let { data } = $props();
    let username = data.username;

    let isLoggedIn = false;
    if(username) {
        isLoggedIn = true;
    }
</script>


<div class="right">
    {#if isLoggedIn}
        You are logged in as: <strong>{username}</strong>
    {:else}
        please <a href="/login">Log in</a>
    {/if}
</div>


<h1>banking application</h1>
<p>
    the balance of your swiss account is: $ 100,000,000 :-)
</p>


<style>

    .right {
        text-align: right;
    }
</style>