<script lang="ts">
  import { getCards, post } from "$lib";
  let { cards = $bindable(), meta } = $props();

  let text = $state("");
  let loading = $state(false);
  let image: Readonly<File> |  Blob|undefined = $state(undefined);
  let imageTag: string |undefined= $state(undefined);
  import { encodeBase64 } from "@std/encoding";
</script>

<div class="w-full lg:w-1/2">
  <div>
    <form
      enctype="multipart/form-data"
      method="post"
      onchange={async (e) => {
        console.log({ image });
        const bytes = await image!.arrayBuffer();
        imageTag = `data:${image!.type};base64,${encodeBase64(bytes)}`;
      }}
    >
      <div>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          class=""
          onchange={(e) => (image = (e.target as HTMLInputElement).files![0])}
        />
      </div>
    </form>
  </div>
  <div>
    <div>
      <form
        class="mb-8"
        onsubmit={async (e) => {
          e.preventDefault();
          console.log(e.target);
          loading = true;
          const handle = localStorage["handle"]
          await post({text, metadata: meta, image,handle});
          cards = await getCards(handle);
          text = "";
          loading = false;
          imageTag = undefined;
        }}
      >
        <textarea
          name="pasted_text"
          bind:value={text}
          placeholder="paste image here and insert text"
          class="border w-64 h-36 mt-10 bg-white text-black dark:bg-gray-800 dark:text-white"
          onpaste={async (e) => {
            // https://web.dev/patterns/clipboard/paste-images
            const clipboardItems = await navigator.clipboard.read();
            console.log({ clipboardItems });
            for (const clipboardItem of clipboardItems) {
              console.log({ clipboardItem });
              const itemTypes = clipboardItem.types;
              for (const itemType of itemTypes!) {
                console.log({ itemType });
                const blob = await clipboardItem.getType(itemType);
                if (itemType.includes("image/")) {
                  image = blob;
                }
                if (itemType == "text/html") {
                  const text = await blob.text();
                  console.log({ text });
                  imageTag = text;
                }
                // Do something with the image blob.
              }
            }
          }}
        ></textarea>
        <div
          class="mt-2 w-fit px-3 py-1 bg-gray-200 text-black border border-black rounded-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <input
            type="submit"
            value={loading ? "Loading..." : "Submit"}
            disabled={loading}
          />
        </div>

        <div>
          <div>
            {#if imageTag}
                <div class="w-60 mt-10">
                {#if imageTag.includes("<img")}
                    {@html imageTag}
                {:else}
                    <img src={imageTag} alt="caption"/>
                {/if}
                </div>
            {/if}
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
