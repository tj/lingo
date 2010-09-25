
test:
	@./support/expresso/bin/expresso \
		$(TEST_FLAGS) \
		-I lib

.PHONY: test