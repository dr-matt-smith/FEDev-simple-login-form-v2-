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

<form method="POST">
    <label>
        username
        <input name="username" required>
    </label>
    <button>Login</button>
</form>

<style>
    .right {
        text-align: right;
    }

    input {
        background: yellow;
    }
</style>

