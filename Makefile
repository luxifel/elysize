# Start the Docker containers
start:
	docker-compose up -d

# An alias for start target
up: start

## Stop the Docker containers
stop:
	docker-compose stop