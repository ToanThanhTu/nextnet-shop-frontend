.PHONY: publish
publish:
	@version=$${version:-$(shell grep '"version":' package.json | awk -F'"' '{print $$4}')}; \
	if [ -z "$$version" ]; then \
		exit 1; \
	fi; \
	echo "Publishing version $$version"; \
	./scripts/publish.sh $$version