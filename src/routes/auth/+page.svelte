<script lang="ts">
    import {authorizationUrl} from "$lib"
    import {onMount} from "svelte"
    let url = $state()
    onMount(async () => {
        const metadata = await fetch("/meta").then(res => res.json())
        url = await authorizationUrl("nandi.dads.lol", metadata)
        
    })
</script>


Url: <a href={url}>Login</a>