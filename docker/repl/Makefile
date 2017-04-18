container :
	cp ../../repl/repl-service.js .
	sudo docker build -t repl .
	sudo docker images | grep repl

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name repl -e HOST=@eth0 -e BASES=base0:39000,base1:39001 repl

rm-single :
	sudo docker service rm repl

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean