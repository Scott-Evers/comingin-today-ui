<script lang="ts">
  export let day: string
</script>

<div class={day === '' ? 'card inactive' : 'card'}>{day}</div>

<style>
  .card {
    font-size: 1.5rem;
    padding: .5rem; 
    height: 100%;
    border-width: .25px;
    border-style: solid;
    border-color: #ccc;
    border-bottom-width: .5px;
    border-top-width: .5px;
  }
  .inactive {
    background-color: rgba(8,8,8,.2);
  }
</style>