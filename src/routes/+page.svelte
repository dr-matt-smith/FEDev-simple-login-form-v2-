<!--<script>-->
<!--    let { data } = $props();-->
<!--    let username = data.username;-->

<!--    let isLoggedIn = false;-->
<!--    if(username) {-->
<!--        isLoggedIn = true;-->
<!--    }-->
<!--</script>-->

<script>
    let { data } = $props();
    let username = data.username;
    let isLoggedIn = data.isLoggedIn;
</script>

<div class="right">
    {#if isLoggedIn}
        You are logged in as: <strong>{username}</strong>
    {:else}
        please <a href="/login">Log in</a>
    {/if}
</div>

<h1>banking web site</h1>
<p>
    give us your money - we'll look after it for you :-)
</p>

<style>

    .right {
        text-align: right;
    }
</style>