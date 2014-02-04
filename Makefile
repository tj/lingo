
TESTS = test/node/*.js

test:
	@./node_modules/.bin/mocha --ui exports \
		$(TESTS)

test-server:
	@node test/server

docs: index.html

index.html: $(shell find lib -type f)
	dox \
		--title "Lingo" \
		--desc "Linguistics module for [Node](http://nodejs.org) providing inflection, transformations and more." \
		--ribbon "http://github.com/visionmedia/lingo" \
		$^ > $@

docclean:
	rm -f index.html

.PHONY: test docs docclean