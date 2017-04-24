container :
	cp ../../auth-app/auth-app.js .
	cp ../../auth-app/auth-app-service.js .
	
	sudo docker build -t auth-app .
	sudo docker images | grep auth-app

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name auth-app -e HOST=@eth0 -e BASES=base0:39000,base1:39001 auth-app

rm-single :
	sudo docker service rm auth-app

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean