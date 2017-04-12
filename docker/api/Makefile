container :
	cp ../../api/server.js .
	cp ../../api/plugins.js .
	
	sudo docker build -t api .
	sudo docker images | grep api

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name api -e HOST=eth0 -e BASES=base0:39000,base1:39000 api

rm-single :
	sudo docker service rm api

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean