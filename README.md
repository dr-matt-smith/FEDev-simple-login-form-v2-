# FEDev-simple-login-form-v2-

Create simple authenticated website, demonstrating:
- form processing
- cookies - create / read / delete
- conditional links

## All pages - 4 link navbar

![nav bar links](/screenshots/0_navbar.png)

`/routes/+layout.svelte`

Add the following 4-link nav bar to the global site `+layout.svelte` template:

```html
<nav>
    <a href="/">home</a>
    |
    <a href="/bank">bank</a>
    |
    <a href="/login">login</a>
    |
    <a href="/logout">logout</a>
</nav>
```

So the complete  `+layout.svelte` file looks as follows:

`/routes/+layout.svelte`
```html
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
```

## Home page Svelte script

![home page](/screenshots/1_home_page.png)

Let's create our home page Svelte script: `/routes/+page.svelte`

First create the following home page heading and paragraph:

```html
<h1>banking web site</h1>
<p>
    give us your money - we'll look after it for you :-)
</p>
```

Also, let's add a conditional, right aligned message, stating either how to login, or if logged-in, then the logged-in username. This will be a Svelte IF-statement, based on the value of JavaScript variable `isLoggedIn`:

```html
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
```

The logic for this page will assume the page's JavaScript server page attempts to pass in a `username` property. So we can interrogate the `$props()` this page receives, and if `username` is undefined, we'll set `isLoggedIn` to false, otherwise we'll set `isLoggedIn` to true:

```html
<script>
    let { data } = $props();
    let username = data.username;

    let isLoggedIn = false;
    if(username) {
        isLoggedIn = true;
    }
</script>
```

So the full listing for `+page.svelte` is as follows:

`/routes/+page.svelte`
```html
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

<h1>banking web site</h1>
<p>
    give us your money - we'll look after it for you :-)
</p>

<style>

    .right {
        text-align: right;
    }
</style>
```


## Home page server JavaScript

We need to do some work in order to send the Svelte home page the username 'props'.

All we need is a `load()` function to attemtp to retreive a stored Cookie `username`:

`/routes/+page.server.js`

```javascript
export function load({ cookies }) {
    let username = cookies.get('username');
    return {
        username
    };
}
```

Note how we can add `{ cookies }` as a parameter for the `load()` function, and Svelte then gives us access to its `cookies` object.

##  Banking page Svelte script

Our bank details page shows different messages, depending on whether the user is logged-in or not.

If the user is not logged-in they see this error page:
![bank error not authorised page](/screenshots/4_bank_not_authorised.png)

If they are logged-in they see the balance of their bank account:
![screenshot bank balance details](/screenshots/5_bank_logged_in.png)

So let's create our bank page Svelte script: `/routes/bank/+page.svelte`

The script part of our bank page Svelte code is identical to that of the home page:
- we put props into variale `data`
- we set `username` to `data.username`
- we set the true/false value of `isLoggedIn` according to whether `username` has a value or is undefined:

```html
<script>
    let { data } = $props();
    let username = data.username;

    let isLoggedIn = false;
    if(username) {
        isLoggedIn = true;
    }
</script>
```

The HTML parts of our bank page uses a Svelte IF-statement, to display the balance if use is logged-in, and an error message otherwise:

```html
<h1>banking application</h1>

{#if isLoggedIn}
    <p>
    the balance of your swiss account is: $ 100,000,000 :-)
    </p>
{:else}
    <div class="error">
        ERROR
        <br>
        you are not authorised to view this page!
    </div>
{/if}
```

We also can use a little bit of CSS style to make the error message large test in a pink-background block:

```html
<style>
    .error {
        padding: 1rem;
        background-color: pink;
        text-align: center;
        font-size: 2rem;
    }
</style>
```

So the full listing of the Svelte script for our banking page is as follows.

`/routes/bank/+page.svelte`

```html
<script>
    let { data } = $props();
    let username = data.username;

    let isLoggedIn = false;
    if(data && data.username) {
        isLoggedIn = true;
    }
</script>

<h1>banking application</h1>

{#if isLoggedIn}
<p>
    the balance of your swiss account is: $ 100,000,000 :-)
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
```