container :
	cp ../../auth-sms/auth-sms.js .
	cp ../../auth-sms/auth-sms-service.js .
	
	sudo docker build -t auth-sms .
	sudo docker images | grep auth-sms

run-single :
	sudo docker service create --replicas 1 --network securitypoc  --name auth-sms -e HOST=@eth0 -e BASES=base0:39000,base1:39001 auth-sms

rm-single :
	sudo docker service rm auth-sms

clean :
	rm -f *~
	rm -f *.js
	rm -f *.json

.PHONY : container clean