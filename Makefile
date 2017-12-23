.PHONY: serve build

CLIENT_DIR="github.com/jmichiels/diffdrive/cmd/diffdrive-client"

serve:
	gopherjs serve -v ${CLIENT_DIR}

build:
	gopherjs build ${CLIENT_DIR} -v -m -o cmd/diffdrive-client/diffdrive-client.js