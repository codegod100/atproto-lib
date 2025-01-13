<script>
    import { finalize } from "$lib";
    import { onMount } from "svelte";

    onMount(async () => {
        const metadata = await fetch("/meta").then((res) => res.json());
        const params = new URLSearchParams(location.hash.slice(1));
        const session = await finalize(params, metadata);
        console.log({ session });
        location.assign("/");
    });
</script>
