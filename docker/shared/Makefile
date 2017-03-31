container :
	cp ../../package.json .
	sudo docker build -t shared .
	sudo docker images | grep shared

clean :
	rm -f *~
	rm -f *.json

.PHONY : container clean