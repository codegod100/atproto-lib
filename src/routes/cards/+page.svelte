<script lang="ts">
    import { type PageData } from "./$types";

    let { data }: { data: PageData } = $props();
</script>

<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 space-y-4">
    {#each data.cards as card}
        <div
            class="break-inside-avoid bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
            {#each card.value.links as link}
                <a href={link.url} class="text-blue-500 hover:underline"
                    >{link.title}</a
                >
                {link.description}
                <img src={link.image} />
            {/each}
            <img src={card.image} alt="card" />
        </div>
    {/each}
</div>
