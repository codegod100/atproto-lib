<script lang="ts">
    import { type PageData } from "./$types";
    import Input from "./input.svelte";
    let { data }: { data: PageData } = $props();
    let cards = $state(data.cards);
</script>

<Input bind:cards meta={data.meta} />
<div class="columns-1  sm:columns-2 md:columns-3 lg:columns-2xs gap-4 space-y-4">
    {#each cards as card}
        <div
            class="break-inside-avoid bg-gray-900 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
            <div>{card.value.text}</div>
            {#if card.value.links}
                {#each card.value.links as link}
                    <a href={link.url} class="text-blue-500 hover:underline"
                        >{link.title}</a
                    >
                    {link.description}
                    <img src={link.image} alt="caption" />
                {/each}
            {/if}
            <img src={card.image} alt="card" />
        </div>
    {/each}
</div>
