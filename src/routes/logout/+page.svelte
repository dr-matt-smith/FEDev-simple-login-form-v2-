<script>
    let { data } = $props();
    let success = $derived(data.success);

    let message = "sorry - there was a problem logging you out"
    if( success ){
        message = "you are now successfully logged out"
    }
</script>

<p>
    {message}
</p>