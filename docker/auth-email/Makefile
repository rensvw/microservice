container :
	cp ../../auth-email/auth-email.js .
	cp ../../auth-email/auth-email-service.js .
	
	sudo docker build -t auth-email .
	sudo docker images | grep auth-email

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name auth-email -e HOST=@eth0 -e BASES=base0:39000,base1:39001 auth-email

rm-single :
	sudo docker service rm auth-email

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean