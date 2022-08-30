<template>
  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item" href="/"> Home </a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" href="/register">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" href="/login"> Log in </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'NavBar',
};
</script>