<script lang="ts">
  import { Link, useNavigate } from 'svelte-navigator'
  import { createEventDispatcher } from 'svelte'

  const navigate = useNavigate()
  const dispatch = createEventDispatcher()

</script>


<div class="user_container">
  <div on:click={() => navigate('/profile', { replace: false })}>Profile</div>
  <div on:click={() => {
    dispatch('logout')
    navigate('/', { replace: false });
  }}>Sign Out</div>
</div>


<style>
  .user_container {
    position: fixed; 
    top: 100px;
    right: 0;
    bottom: 0;
    
    padding: 10px;

    width: 100%;
    max-width: 300px;
    opacity: 1;

    transition: visibility 0s   cubic-bezier(0.0, 0.0, 0.2, 1),
                max-width  0.2s cubic-bezier(0.0, 0.0, 0.2, 1),
                opacity    0.3s cubic-bezier(0.0, 0.0, 0.2, 1);
    transition-delay: 0s;

    color: white;
    background: rgba(0,0,0,.96);

    will-change: visibility, opacity, max-width, width;
  }
  .user_container > div {
    cursor: pointer;
    padding: 10px;
  }
  .user_container > div:hover {
    background-color: rgba(255,255,255,0.1);
  }
</style>