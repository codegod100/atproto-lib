<script lang="ts">
    import { authorizationUrl } from "$lib";
    import { onMount } from "svelte";
    import { type PageData } from "./$types";
    let url = $state();
    let { data }: { data: PageData } = $props();
    onMount(async () => {
        const metadata = await fetch("/meta").then((res) => res.json());
        url = await authorizationUrl(data.handle, metadata);
        localStorage["referrer"] = document.referrer;
        location.assign(url);
    });
</script>
