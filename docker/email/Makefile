container :
	cp ../../email/email-service.js .
	cp ../../email/email.js .	
	sudo docker build -t email .
	sudo docker images | grep email

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name email -e HOST=eth0 -e BASES=base0:39000,base1:39000 email

rm-single :
	sudo docker service rm email

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean