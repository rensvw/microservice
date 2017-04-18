container :
	cp ../../hashing/hashing.js .
	cp ../../hashing/hashing-service.js .
	
	sudo docker build -t hashing .
	sudo docker images | grep hashing

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name hashing -e HOST=@eth0 -e BASES=base0:39000,base1:39001 hashing

rm-single :
	sudo docker service rm hashing

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean