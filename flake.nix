{
  description = "An interactive experience around Hobbes' Leviathan";

  inputs = {
    nixpkgs.url = "https://flakehub.com/f/NixOS/nixpkgs/0.1";
  };

  outputs = inputs:
    let
      systems = [ "aarch64-darwin" "x86_64-darwin" "aarch64-linux" "x86_64-linux" ];
      forAllSystems = f: inputs.nixpkgs.lib.genAttrs systems (system: f {
        pkgs = import inputs.nixpkgs { inherit system; };
      });
    in
    {
      devShells = forAllSystems ({ pkgs }: {
        default = pkgs.mkShellNoCC {
          packages = with pkgs; [ bun process-compose netlify-cli ];
        };
      });
    };
}
