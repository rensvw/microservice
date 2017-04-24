container :
	cp ../../auth/auth.js .
	cp ../../auth/auth-service.js .
	
	sudo docker build -t auth .
	sudo docker images | grep auth

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name auth -e HOST=@eth0 -e BASES=base0:39000,base1:39001 auth

rm-single :
	sudo docker service rm auth

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean