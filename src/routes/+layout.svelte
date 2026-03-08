<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
// 	let { children, data } = $props();
//
// 	let username = $state(data.username);
//
// 	let isLoggedIn = $state(false);
// 	if(username) {
// 		isLoggedIn = true;
// 	}

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
