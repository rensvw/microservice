container :
	cp ../../generators/generators-service.js .
	cp ../../generators/generators.js .	
	sudo docker build -t generators .
	sudo docker images | grep generators

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name generators -e HOST=@eth0 -e BASES=base0:39000,base1:39001 generators

rm-single :
	sudo docker service rm generators

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean