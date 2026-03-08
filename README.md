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

The logic for this page will assume the page's JavaScript server page returns `data` in `$props()` that contain `username` and `isLoggedIn` properties. So from the `data` in `$props()` page receives, we can extract the `username` and `isLoggedIn` properties:

```html
<script>
    let { data } = $props();
    let username = data.username;
    let isLoggedIn = data.isLoggedIn;
</script>
```

So the full listing for `+page.svelte` is as follows:

`/routes/+page.svelte`
```html
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
```


## Home page server JavaScript

We need to do some work in order to send the Svelte home page the username 'props'.

All we need is a `load()` function to attempts to retreive a stored Cookie `username`, and sets Boolean variable `isLoggedIn` if such a cookie value is found:

`/routes/+page.server.js`

```javascript
export function load({ cookies }) {
    let username = cookies.get('username');
    let isLoggedIn = false;
    if(username){
        isLoggedIn = true;
    }
    
    return {
        username,
        isLoggedIn
    };
}
```

NOTE: How we can add `{ cookies }` as a parameter for the `load()` function, and Svelte then gives us access to its `cookies` object.

##  Banking page Svelte script

Our bank details page shows different messages, depending on whether the user is logged-in or not.

If the user is not logged-in they see this error page:
![bank error not authorised page](/screenshots/4_bank_not_authorised.png)

If they are logged-in they see the balance of their bank account:
![screenshot bank balance details](/screenshots/5_bank_logged_in.png)

So let's create our bank page Svelte script: `/routes/bank/+page.svelte`

The script part of our bank page Svelte code is identical to that of the home page:
-  from the `data` in `$props()` page receives, we extract the `username` and `isLoggedIn` properties:

```html
<script>
    let { data } = $props();
    let username = data.username;
    let isLoggedIn = data.isLoggedIn;
</script>
```

The HTML parts of our bank page uses a Svelte IF-statement, to display the balance if use is logged-in, and an error message otherwise:

```html
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
```

## Bank page server JavaScript

The JavaScript server for definding the `load()` function for our bank page is identical to that for our home page:

`/routes/bank/+page.server.js`

```javascript
export function load({ cookies }) {
    let username = cookies.get('username');
    let isLoggedIn = false;
    if(username){
        isLoggedIn = true;
    }
    
    return {
        username,
        isLoggedIn
    };
}
```


##  Login page Svelte script

Our login route `/login` offers a login form asking for a username:

![screenshot login page](/screenshots/2_login_page.png)

The JavaScript element and indciation of whenter user is logged in are identical for both our login page and home page:

```html
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
```

We then have the HTML code to present a simple login form to the user:
- Note the `POST` method
- Note there is no `action`, so this form will submit and be processed by the page's JavaScript server script (`/routes/login/+page.server.js`) for the `default` form action
- Note we add the `required` attributed to the text input, so we don't have to worry about empty usernames being submitted

```html
<form method="POST">
    <label>
        username
        <input name="username" required>
    </label>
    <button>Login</button>
</form>
```

And 2 CSS styles, one for right aligning text, and the other to color the text input box with a yellow background:

```html
<style>
    .right {
        text-align: right;
    }

    input {
        background: yellow;
    }
</style>
```

So the full listing for our login Svelte page is as follows:

`/routes/login/+page.svelte`

```html
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
```


##  Login page JavaScript server script

We need 2 functions for our login page's JavaScript server script (`/routes/login/+page.server.js`):
- `load()` to provide `username` and `isLoggedIn` props like the other pages
- `actions()` to process the `default` form submission action

So the `load()` function is just the same as for the home and bank page server scripts:

```javascript
export function load({ cookies }) {
    let username = cookies.get('username');
    let isLoggedIn = false;
    if(username){
        isLoggedIn = true;
    }
    return {
        username,
        isLoggedIn
    };
}
```

So the `actions()` function defines one action, `default` to be an asynchronous function that:
1. in its declaration gets access to the `request` and `cookies` Svelte objects

    `default: async ({ request, cookies })`

2. gets the submitted POST form data

    `const data = await request.formData()`

1. extracts the `username` from the submitted POST form data
     
   `const username = data.get('username')`

1. store the `username` tex into a cookie named `username`

   `const username = data.get('username')`



```javascript
export const actions =  {
    default: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');

        cookies.set('username', username, { path: '/' });
    }
};
```

##  Logout page JavaScript server script

Our logout page server script (`/routes/logout/+page.server.js`) deletes the cookie named `username`:

`/routes/logout/+page.server.js`

```javascript
export function load({ cookies }) {
    cookies.delete('username', {path: '/'});
}
```


##  Logout page Svelte script

![screenshot logout page](/screenshots/3_logout.png)

The Svelte page for out logout route is a simple HTML paragraph:

`/routes/logout/+page.svelte`
```html
<p>
    you are now successfully logged out
</p>
```

##  Viewing the cookie values from your web browser developer tools

![screenshot bank page show cookies when no cookie](/screenshots/10_bank_no_username_cookie.png)

Since Svelte is a single-page application framework, to see an updated view of cookies you'll need to force a web browser page refresh:
- first display your browser's **Developer Tools**
  - I use DuckDuckGo and find them on menu: **View | Developer | Open Developer Tools**
- then select the **Network** tab
- then hold the `SHIFT` key down and clicking on the `bank` link for force a page refresh
- click on the first item in the list of resources loaded (`bank` in the **Name** column on the left)
- then display **Cookies**

If you then login with a username, and follow the same sames, you should see the bank balance message, and the existance of a `username` cookie stored in the web browser:

![screenshot bank page show cookies](/screenshots/11_bank_username_cookie.png)


##  Viewing the POST data being submitted by the login form

![screenshot login page submission POST data](/screenshots/12_login_post_data.png)

Following the same steps above, after you have typed in a name in the login form, ensure you are displaying the Developer Tools, and hold down SHIFT when you click the **login** button.

This screenshot shows the POST form submitted data after `matt` was submitted in the login form.

