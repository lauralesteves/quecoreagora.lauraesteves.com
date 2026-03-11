PT_BUCKET := quecoreagora.lauraesteves.com
EN_BUCKET := whatcolorisitnow.lauraesteves.com
ES_BUCKET := quecoloresahora.lauraesteves.com

PT_CF_ID := $(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$(PT_BUCKET)')]] | [0].Id" --output text)
EN_CF_ID := $(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$(EN_BUCKET)')]] | [0].Id" --output text)
ES_CF_ID := $(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$(ES_BUCKET)')]] | [0].Id" --output text)

export AWS_PAGER :=

SYNC_IMMUTABLE = aws s3 sync $(1) s3://$(2) \
	--delete \
	--cache-control "public, max-age=31536000, immutable" \
	--exclude "*.html" \
	--exclude "robots.txt" \
	--exclude "site.webmanifest" \
	--exclude "browserconfig.xml" \
	--exclude "ai.txt" \
	--exclude "humans.txt" \
	--exclude ".well-known/*"

SYNC_METADATA = aws s3 sync $(1) s3://$(2) \
	--delete \
	--cache-control "public, max-age=3600" \
	--exclude "*" \
	--include "*.html" \
	--include "robots.txt" \
	--include "site.webmanifest" \
	--include "browserconfig.xml" \
	--include "ai.txt" \
	--include "humans.txt" \
	--include ".well-known/*"

.PHONY: build build-pt build-en build-es deploy deploy-pt deploy-en deploy-es clean

## Build todos os locales
build:
	bun run build:all

## Build apenas PT
build-pt:
	bun run tsc -b && VITE_LOCALE=pt bun run vite build --outDir dist-pt

## Build apenas EN
build-en:
	bun run tsc -b && VITE_LOCALE=en bun run vite build --outDir dist-en

## Build apenas ES
build-es:
	bun run tsc -b && VITE_LOCALE=es bun run vite build --outDir dist-es

## Deploy completo (PT + EN + ES)
deploy: build
	@$(MAKE) deploy-pt
	@$(MAKE) deploy-en
	@$(MAKE) deploy-es

## Deploy PT para S3 + invalidacao do CloudFront
deploy-pt:
	@echo "Deploying PT to s3://$(PT_BUCKET)..."
	$(call SYNC_IMMUTABLE,dist-pt/,$(PT_BUCKET))
	$(call SYNC_METADATA,dist-pt/,$(PT_BUCKET))
	@echo "Invalidating PT CloudFront cache..."
	aws cloudfront create-invalidation \
		--distribution-id $(PT_CF_ID) \
		--paths "/*"
	@echo "PT deploy complete!"

## Deploy EN para S3 + invalidacao do CloudFront
deploy-en:
	@echo "Deploying EN to s3://$(EN_BUCKET)..."
	$(call SYNC_IMMUTABLE,dist-en/,$(EN_BUCKET))
	$(call SYNC_METADATA,dist-en/,$(EN_BUCKET))
	@echo "Invalidating EN CloudFront cache..."
	aws cloudfront create-invalidation \
		--distribution-id $(EN_CF_ID) \
		--paths "/*"
	@echo "EN deploy complete!"

## Deploy ES para S3 + invalidacao do CloudFront
deploy-es:
	@echo "Deploying ES to s3://$(ES_BUCKET)..."
	$(call SYNC_IMMUTABLE,dist-es/,$(ES_BUCKET))
	$(call SYNC_METADATA,dist-es/,$(ES_BUCKET))
	@echo "Invalidating ES CloudFront cache..."
	aws cloudfront create-invalidation \
		--distribution-id $(ES_CF_ID) \
		--paths "/*"
	@echo "ES deploy complete!"

## Limpar diretorios de build
clean:
	rm -rf dist-pt/ dist-en/ dist-es/
