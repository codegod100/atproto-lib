<script lang="ts">
    import { finalize } from "$lib";
    import { onMount } from "svelte";
    import { type PageData } from "./$types";
    let { data }: { data: PageData } = $props();
    onMount(async () => {
        const metadata = await fetch("/meta").then((res) => res.json());
        const params = new URLSearchParams(location.hash.slice(1));
        console.log({ params, metadata });
        const session = await finalize(params, metadata);
        console.log({ session });
        location.assign(data.referrer);
    });
</script>
