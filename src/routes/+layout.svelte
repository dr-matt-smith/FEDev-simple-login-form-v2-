<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav>
	<a href="/">home</a>
	|
	<a href="/bank">bank</a>
	|
	<a href="/login">login</a>
	|
	<a href="/logout">logout</a>
</nav>


{@render children()}
