<script>
    let handle = $state();
</script>

<form
    onsubmit={(e) => {
        e.preventDefault();
        location.assign(`/auth/${handle}`);
    }}
>
    <input
        type="text"
        class="dark:text-black p-2"
        placeholder="handle"
        bind:value={handle}
    />
    <button>login</button>
</form>
