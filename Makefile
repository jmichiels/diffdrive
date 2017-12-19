.PHONY: serve build

serve:
	gopherjs serve -v github.com/jmichiels/diffdrive/cmd/diffdrive-client

build:
	gopherjs build github.com/jmichiels/diffdrive/cmd/diffdrive-client -v -m -o cmd/diffdrive-client/diffdrive-client.js