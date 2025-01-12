{pkgs}: {
  channel = "unstable";
  packages = [
    pkgs.nodejs_20
    pkgs.pnpm
    pkgs.deno
    pkgs.gh
  ];
  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];
  # idx.previews = {
  #   previews = {
  #     web = {
  #       command = [
  #         "npm"
  #         "run"
  #         "dev"
  #         "--"
  #         "--port"
  #         "$PORT"
  #         "--host"
  #         "0.0.0.0"
  #       ];
  #       manager = "web";
  #     };
  #   };
  # };
}