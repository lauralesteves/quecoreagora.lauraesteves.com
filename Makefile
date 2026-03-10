PT_BUCKET := quecoreagora.lauraesteves.com
EN_BUCKET := whatcolorisitnow.lauraesteves.com

PT_CF_ID := $(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$(PT_BUCKET)')]] | [0].Id" --output text)
EN_CF_ID := $(shell aws cloudfront list-distributions --query "DistributionList.Items[?Aliases.Items[?contains(@, '$(EN_BUCKET)')]] | [0].Id" --output text)

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

.PHONY: build build-pt build-en deploy deploy-pt deploy-en clean

## Build ambos os locales
build:
	bun run build:all

## Build apenas PT
build-pt:
	bun run tsc -b && VITE_LOCALE=pt bun run vite build --outDir dist-pt

## Build apenas EN
build-en:
	bun run tsc -b && VITE_LOCALE=en bun run vite build --outDir dist-en

## Deploy completo (PT + EN)
deploy: build
	@$(MAKE) deploy-pt
	@$(MAKE) deploy-en

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

## Limpar diretorios de build
clean:
	rm -rf dist-pt/ dist-en/
